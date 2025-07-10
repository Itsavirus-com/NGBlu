import { yupResolver } from '@hookform/resolvers/yup'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

// Mock data for testing UI without API
const MOCK_KVK_DATA = {
  '12345678': {
    companyName: 'KeenThemes BV',
    streetName: 'Damrak',
    postalCode: '1012LG',
    houseNumber: '45',
    city: 'Amsterdam',
    country: 'Netherlands',
  },
  '87654321': {
    companyName: 'InfraOrders Nederland B.V.',
    streetName: 'Herengracht',
    postalCode: '1015BE',
    houseNumber: '123',
    city: 'Amsterdam',
    country: 'Netherlands',
  },
}

// Mock postal code + house number data
const MOCK_PC_HS_DATA = {
  '1012LG 45': {
    streetName: 'Damrak',
    houseNumber: '45',
    city: 'Amsterdam',
    country: 'Netherlands',
  },
}

import {
  CreateBusinessPartnerFormData,
  createBusinessPartnerSchema,
} from '../_schemas/business-partner.schema'

export const useBusinessPartnerForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [visitedSteps, setVisitedSteps] = useState<number[]>([1])
  const [isSuccess, setIsSuccess] = useState(false)
  const [validationError, setValidationError] = useState('')

  // KVK and address lookup states
  const [isValidatingKvk, setIsValidatingKvk] = useState(false)
  const [isLookingUpAddress, setIsLookingUpAddress] = useState(false)
  const [kvkValidationData, setKvkValidationData] = useState<any>(null)
  const [addressLookupData, setAddressLookupData] = useState<any>(null)
  const [mapCoordinates, setMapCoordinates] = useState<{ lat: number; lng: number } | null>(null)

  // Use refs to prevent infinite loops
  const lastProcessedAddressRef = useRef<string>('')
  const shouldRenderMapRef = useRef<boolean>(false)
  const [shouldRenderMap, setShouldRenderMap] = useState(false)

  const methods = useForm<CreateBusinessPartnerFormData>({
    resolver: yupResolver(createBusinessPartnerSchema),
    defaultValues: {
      // Business Partner Info
      kvkNumber: '',
      companyName: '',

      // Address Info
      postalCodeHouse: '',
      streetName: '',
      postalCode: '',
      houseNumber: '',
      city: '',
      country: '',

      // Contact Info - removed unnecessary fields
      firstName: '',
      lastName: '',
      phoneNumber: '',
      emailAddress: '',

      // Business Settings
      partnerManagerId: undefined,
      signedContractFile: undefined,

      // Keep default values for product configuration
      layer3: true,
      whiteLabel: true,
      whiteLabelInternet: false,
      whiteLabelIPVPN: false,
      whiteLabelMobileData: false,
      whiteLabelSDWAN: false,
      direct: false,
      directInternet: false,
      directIPVPN: false,
      directMobileData: false,
      directSDWAN: false,
      layer2: false,
      deltaAccessLayer2: false,
      voice: true,
      traditionalTelephony: true,
      ipTelephony: true,
      xelion: true,
      hostedTelephony: true,
      sipTrunking: true,
      oneSpace: true,
      fixedMobileIntegration: true,
    },
  })

  const validateKvkNumber = async (kvkNumber: string) => {
    if (!kvkNumber || kvkNumber.trim() === '') return

    setIsValidatingKvk(true)
    // Reset address lookup data and map state when trying KVK lookup
    setAddressLookupData(null)
    setShouldRenderMap(false)
    shouldRenderMapRef.current = false
    lastProcessedAddressRef.current = ''

    // Mock KVK validation with delay to simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API delay

      const mockData = MOCK_KVK_DATA[kvkNumber as keyof typeof MOCK_KVK_DATA]

      if (mockData) {
        // Auto-populate form fields with mock data
        methods.setValue('companyName', mockData.companyName)
        methods.setValue('streetName', mockData.streetName)
        methods.setValue('postalCode', mockData.postalCode)
        methods.setValue('houseNumber', mockData.houseNumber)
        methods.setValue('city', mockData.city)
        methods.setValue('country', mockData.country)

        setKvkValidationData({
          data: [{ ...mockData }], // Store for UI feedback
          success: true,
        })

        console.log('✅ Mock KVK validation successful for:', kvkNumber)
      } else {
        // Clear all fields on KVK validation failure
        // Address fields
        methods.setValue('companyName', '')
        methods.setValue('streetName', '')
        methods.setValue('postalCode', '')
        methods.setValue('houseNumber', '')
        methods.setValue('city', '')
        methods.setValue('country', '')
        methods.setValue('postalCodeHouse', '')

        // Contact fields
        methods.setValue('firstName', '')
        methods.setValue('lastName', '')
        methods.setValue('phoneNumber', '')
        methods.setValue('emailAddress', '')

        setKvkValidationData({
          data: [],
          success: false,
          message: 'KVK number not found. Try using Postal Code + House Number lookup instead.',
        })
        console.log('❌ Mock KVK not found for:', kvkNumber, '(Try: 12345678 or 87654321)')
      }
    } catch (error) {
      console.error('Mock KVK validation error:', error)

      // Clear all fields on error too
      // Address fields
      methods.setValue('companyName', '')
      methods.setValue('streetName', '')
      methods.setValue('postalCode', '')
      methods.setValue('houseNumber', '')
      methods.setValue('city', '')
      methods.setValue('country', '')
      methods.setValue('postalCodeHouse', '')

      // Contact fields
      methods.setValue('firstName', '')
      methods.setValue('lastName', '')
      methods.setValue('phoneNumber', '')
      methods.setValue('emailAddress', '')

      setKvkValidationData({
        data: [],
        success: false,
        message: 'Error checking KVK. Please try Postal Code + House Number lookup instead.',
      })
    } finally {
      setIsValidatingKvk(false)
    }
  }

  // Handle Postal Code + House Number lookup
  const lookupAddress = async (postalCodeHouse: string) => {
    console.log('Lookup Address clicked', { postalCodeHouse })
    if (!postalCodeHouse || postalCodeHouse.trim() === '') {
      console.log('No postal code + house number entered')
      return
    }

    setIsLookingUpAddress(true)
    // Reset map state when looking up new address
    setShouldRenderMap(false)
    shouldRenderMapRef.current = false
    lastProcessedAddressRef.current = ''

    try {
      // Mock API call with delay to simulate Google Places API
      await new Promise(resolve => setTimeout(resolve, 1000))

      console.log('Looking up address for:', postalCodeHouse)
      console.log('Available mock data:', MOCK_PC_HS_DATA)

      const mockData = MOCK_PC_HS_DATA[postalCodeHouse as keyof typeof MOCK_PC_HS_DATA]
      console.log('Found mock data:', mockData)

      if (mockData) {
        // Auto-populate form fields with mock data
        methods.setValue('streetName', mockData.streetName)
        methods.setValue('houseNumber', mockData.houseNumber)
        methods.setValue('postalCode', postalCodeHouse.split(' ')[0]) // First part is postal code
        methods.setValue('city', mockData.city)
        methods.setValue('country', mockData.country)

        setAddressLookupData({
          data: [{ ...mockData }],
          success: true,
        })

        console.log('✅ Mock address lookup successful for:', postalCodeHouse)
      } else {
        // Clear any previously set address data if lookup fails
        methods.setValue('streetName', '')
        methods.setValue('houseNumber', '')
        methods.setValue('postalCode', '')
        methods.setValue('city', '')
        methods.setValue('country', '')

        setAddressLookupData({ data: [], success: false })
        console.log(
          '❌ Mock address not found for:',
          postalCodeHouse,
          '(Try: 1012LG 45 or 1015BE 123)'
        )
      }
    } catch (error) {
      console.error('Mock address lookup error:', error)

      // Clear address fields on error
      methods.setValue('streetName', '')
      methods.setValue('houseNumber', '')
      methods.setValue('postalCode', '')
      methods.setValue('city', '')
      methods.setValue('country', '')

      setAddressLookupData({ data: [], success: false })
    } finally {
      setIsLookingUpAddress(false)
    }
  }

  // Format full address for the map
  const getFullAddress = (): string | undefined => {
    const streetName = methods.getValues('streetName')
    const houseNumber = methods.getValues('houseNumber')
    const postalCode = methods.getValues('postalCode')
    const city = methods.getValues('city')
    const country = methods.getValues('country')

    if (streetName && houseNumber && city) {
      const fullAddress = `${streetName} ${houseNumber}, ${postalCode || ''} ${city}, ${country || ''}`
      return fullAddress
    }
    return undefined
  }

  // Handle map location selection
  const handleLocationSelect = (location: {
    address: string
    lat: number
    lng: number
    placeId: string
  }) => {
    setMapCoordinates({ lat: location.lat, lng: location.lng })
  }

  const createBusinessPartner = async (data: CreateBusinessPartnerFormData) => {
    setIsSubmitting(true)
    try {
      // Prepare the payload for mock API
      const payload = {
        name: data.companyName || '',
        kvkNumber: data.kvkNumber || '',
        address: {
          streetName: data.streetName || '',
          postalCode: data.postalCode || '',
          city: data.city || '',
          country: data.country || '',
          postalCodeHouse: data.postalCodeHouse || '',
          houseNumber: data.houseNumber || '',
        },
        primaryContact: {
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          emailAddress: data.emailAddress,
        },
        businessSettings: {
          partnerManagerId: data.partnerManagerId,
          hasSignedContract: data.signedContractFile ? true : false,
        },
      }

      // Mock API call with delay to simulate server processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Mock successful response
      const mockResponse = {
        id: Math.floor(Math.random() * 10000), // Random ID
        ...payload,
        createdAt: new Date().toISOString(),
        status: 'active',
      }

      console.log('✅ Mock Business Partner created successfully:', mockResponse)
      setIsSuccess(true)
      return { success: true, data: mockResponse }
    } catch (error) {
      console.error('Mock Business Partner creation error:', error)
      return { success: false, error: error }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Extract common validation logic to a reusable function
  const validateStep = async (stepToValidate: number): Promise<boolean> => {
    let isStepValid = false

    // Validate based on the step
    switch (stepToValidate) {
      case 1:
        // Business Profile step - validate required fields
        isStepValid = await methods.trigger([
          'companyName',
          'streetName',
          'postalCode',
          'houseNumber',
          'city',
          'country',
          'firstName',
          'lastName',
          'phoneNumber',
          'emailAddress',
        ])
        break
      case 2:
        // Product Configuration step - no required fields
        isStepValid = true
        break
      case 3:
        // Business Settings step
        isStepValid = await methods.trigger(['partnerManagerId', 'signedContractFile'])
        break
      default:
        isStepValid = true
    }

    return isStepValid
  }

  const handleNext = async () => {
    if (currentStep < 4) {
      // Validate current step fields before proceeding
      const isValid = await validateStep(currentStep)

      if (isValid) {
        const nextStep = currentStep + 1
        // Add next step to visited steps if not already included
        if (!visitedSteps.includes(nextStep)) {
          setVisitedSteps([...visitedSteps, nextStep])
        }
        setCurrentStep(nextStep)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = async (step: number) => {
    // Don't allow clicking on steps that are ahead of the current step without validation
    if (step > currentStep) {
      // Need to validate all steps between current and target step
      let canProceed = true

      // Validate each step in between
      for (let stepToValidate = currentStep; stepToValidate < step; stepToValidate++) {
        const isStepValid = await validateStep(stepToValidate)

        if (!isStepValid) {
          canProceed = false
          setValidationError(
            `Please complete all required fields in step ${stepToValidate} before proceeding.`
          )
          // Clear error message after 3 seconds
          setTimeout(() => setValidationError(''), 3000)
          break
        }
      }

      if (!canProceed) {
        return
      }
    } else {
      // Clear any validation errors when moving backward
      setValidationError('')
    }

    // Mark all steps up to this one as visited
    const updatedVisitedSteps = [...visitedSteps]
    for (let i = 1; i <= step; i++) {
      if (!updatedVisitedSteps.includes(i)) {
        updatedVisitedSteps.push(i)
      }
    }
    setVisitedSteps(updatedVisitedSteps)
    setCurrentStep(step)
  }

  return {
    methods,
    currentStep,
    isSubmitting,
    isSuccess,
    visitedSteps,
    validationError,
    isValidatingKvk,
    isLookingUpAddress,
    kvkValidationData,
    addressLookupData,
    mapCoordinates,
    shouldRenderMap,
    lastProcessedAddressRef,
    shouldRenderMapRef,
    validateKvkNumber,
    lookupAddress,
    getFullAddress,
    handleLocationSelect,
    createBusinessPartner,
    handleNext,
    handleBack,
    handleStepClick,
    setMapCoordinates,
    setShouldRenderMap,
  }
}
