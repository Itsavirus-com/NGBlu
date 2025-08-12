import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useController, useFormContext } from 'react-hook-form'

import './GoogleAddressAutocomplete.scss'

interface AddressComponent {
  long_name: string
  short_name: string
  types: string[]
}

interface AddressSuggestion {
  placeId: string
  description: string
  mainText: string
  secondaryText: string
  latitude: number | null
  longitude: number | null
  street?: string
  streetNumber?: string
  subpremise?: string // Extension/addition
  postalCode?: string
  city?: string
  country?: string
  addressComponents?: AddressComponent[]
  fieldName?: string
}

type GoogleAddressAutocompleteProps = {
  label?: string | ReactNode
  customLabel?: ReactNode
  name: string
  containerClass?: string
  placeholder?: string
  disabled?: boolean
  isRequired?: boolean
  onAddressSelect?: (address: AddressSuggestion) => void
  className?: string
}

export const GoogleAddressAutocomplete = ({
  label,
  customLabel,
  name,
  containerClass,
  placeholder = 'Enter an address',
  disabled = false,
  isRequired = false,
  onAddressSelect,
  className,
}: GoogleAddressAutocompleteProps) => {
  const { control, setValue } = useFormContext()
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
  } = useController({ name, control })

  const [inputValue, setInputValue] = useState(value || '')
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('common')
  // Session token to group autocomplete requests with place details
  const [sessionToken, setSessionToken] = useState<string>('')

  // Add effect to update input value when form value changes
  useEffect(() => {
    // Update input value when form value changes (e.g. when navigating to a new page)
    setInputValue(value || '')
  }, [value])

  useEffect(() => {
    // Generate a new session token
    setSessionToken(Math.random().toString(36).substring(2, 15))
  }, [])

  useEffect(() => {
    // Handle clicks outside of the suggestions dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const fetchAddressSuggestions = async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([])
      return
    }

    setIsLoading(true)
    try {
      // Use Next.js API route to proxy the request instead of directly calling Google's API
      const response = await fetch(
        `/api/places/autocomplete?input=${encodeURIComponent(query)}&sessiontoken=${sessionToken}`
      )
      const data = await response.json()

      if (data.predictions && Array.isArray(data.predictions)) {
        // Process predictions without fetching details for each one to improve performance
        const formattedSuggestions = data.predictions.map((prediction: any) => ({
          placeId: prediction.place_id,
          description: prediction.description,
          mainText: prediction.structured_formatting?.main_text || prediction.description,
          secondaryText: prediction.structured_formatting?.secondary_text || '',
          latitude: null,
          longitude: null,
        }))

        setSuggestions(formattedSuggestions)
        setShowSuggestions(true)
      } else {
        setSuggestions([])
      }
    } catch (error) {
      console.error('Error fetching address suggestions:', error)
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setInputValue(inputValue)
    onChange(inputValue)

    // Debounce to avoid too many API calls
    const debounceTimeout = setTimeout(() => {
      fetchAddressSuggestions(inputValue)
    }, 300)

    return () => clearTimeout(debounceTimeout)
  }

  const handleSelectSuggestion = async (suggestion: AddressSuggestion) => {
    // Show loading state while fetching details
    setIsLoading(true)
    // Hide suggestions immediately
    setShowSuggestions(false)

    // Fetch details first, then update the input with the correct street name
    try {
      await fetchPlaceDetails(suggestion.placeId)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchPlaceDetails = async (placeId: string) => {
    try {
      // Use Next.js API route to proxy the request
      const response = await fetch(
        `/api/places/details?place_id=${placeId}&sessiontoken=${sessionToken}`
      )
      const data = await response.json()

      if (data.result) {
        // Extract address components
        const addressComponents = data.result.address_components || []

        // Parse address components
        let street = ''
        let streetNumber = ''
        let subpremise = ''
        let postalCode = ''
        let city = ''
        let country = ''

        addressComponents.forEach((component: AddressComponent) => {
          const { types, long_name, short_name } = component

          if (types.includes('route')) {
            street = long_name
          } else if (types.includes('street_number')) {
            streetNumber = long_name
          } else if (types.includes('subpremise')) {
            subpremise = long_name
          } else if (types.includes('postal_code')) {
            postalCode = long_name
          } else if (types.includes('locality')) {
            city = long_name
          } else if (types.includes('country')) {
            country = long_name
          }
        })

        // Update the input field with the value appropriate for this field
        const displayValue = street || data.result.formatted_address || data.result.name || ''
        setInputValue(displayValue)
        setValue(name, displayValue)
        onChange(displayValue)

        // Update the suggestion with location data and address components
        const updatedSuggestion: AddressSuggestion = {
          placeId: placeId,
          description: data.result.formatted_address || data.result.name || '',
          mainText: data.result.name || data.result.formatted_address || '',
          secondaryText: data.result.formatted_address || '',
          latitude: data.result.geometry?.location?.lat || null,
          longitude: data.result.geometry?.location?.lng || null,
          street,
          streetNumber,
          subpremise,
          postalCode,
          city,
          country,
          addressComponents: addressComponents,
          fieldName: name,
        }

        // Call the callback with updated location data
        if (onAddressSelect) {
          onAddressSelect(updatedSuggestion)
        }
      }
    } catch (error) {
      console.error('Error fetching place details:', error)
    }
  }

  // Check if label is a ReactNode (for custom layout) or a string
  const renderLabel = () => {
    if (!label) return null

    if (typeof label === 'string') {
      return (
        <Form.Label className={clsx('fw-bold mb-2', { required: isRequired })}>{label}</Form.Label>
      )
    }

    // For ReactNode, render directly but add mb-2 class for consistent spacing
    return <div className="mb-2">{label}</div>
  }

  return (
    <Form.Group className={containerClass}>
      {renderLabel()}

      <div className="position-relative">
        <Form.Control
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => inputValue && inputValue.length >= 3 && setShowSuggestions(true)}
          placeholder={placeholder}
          disabled={disabled}
          isInvalid={invalid}
          className={clsx('form-control mb-2', { 'is-invalid': invalid }, className)}
          data-test-id={name}
          autoComplete="off" // Disable browser's native autocomplete
        />

        {error && <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>}

        {customLabel && customLabel}

        {isLoading && (
          <div className="position-absolute end-0 top-50 translate-middle-y me-3">
            <div className="spinner-border spinner-border-sm text-primary" role="status">
              <span className="visually-hidden">{t('loading')}</span>
            </div>
          </div>
        )}

        {showSuggestions && suggestions.length > 0 && (
          <div ref={suggestionsRef} className="address-suggestions-dropdown">
            {suggestions.map(suggestion => (
              <div
                key={suggestion.placeId}
                className="address-suggestion-item"
                onClick={() => handleSelectSuggestion(suggestion)}
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleSelectSuggestion(suggestion)
                  }
                }}
              >
                <div className="fw-bold">{suggestion.mainText}</div>
                {suggestion.secondaryText && (
                  <div className="text-muted small">{suggestion.secondaryText}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Form.Group>
  )
}
