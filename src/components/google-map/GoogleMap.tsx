import { useEffect, useRef, useState } from 'react'

type MapProps = {
  lat: number | null
  lng: number | null
  address?: string
  onLocationSelect?: (location: {
    address: string
    lat: number
    lng: number
    placeId: string
  }) => void
}

export const GoogleMap = ({ lat, lng, address, onLocationSelect }: MapProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const mapRef = useRef<google.maps.Map>()
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement>()
  const geocoderRef = useRef<google.maps.Geocoder>()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const checkGoogleMapsLoaded = () => {
      if (window.google?.maps?.Geocoder && window.google?.maps?.Map) {
        setIsLoaded(true)
      } else {
        setTimeout(checkGoogleMapsLoaded, 100)
      }
    }
    checkGoogleMapsLoaded()
  }, [])

  useEffect(() => {
    if (!ref.current || !isLoaded || lat === null || lng === null) return

    try {
      // Initialize geocoder first
      geocoderRef.current = new window.google.maps.Geocoder()

      // Initialize map
      mapRef.current = new window.google.maps.Map(ref.current, {
        center: { lat, lng },
        zoom: 20,
        mapTypeControl: false,
        streetViewControl: false,
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      })

      markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
        map: mapRef.current,
        position: { lat, lng },
      })
    } catch (error) {
      console.error('Error initializing Google Maps:', error)
    }
  }, [isLoaded, lat, lng])

  // Update marker position when center changes
  useEffect(() => {
    if (!isLoaded || lat === null || lng === null) return
    if (markerRef.current) {
      markerRef.current.position = { lat, lng }
    }
    if (mapRef.current) {
      mapRef.current.panTo({ lat, lng })
    }
  }, [lat, lng, isLoaded])

  // Handle address changes
  useEffect(() => {
    if (!address || !isLoaded) return

    // Small delay to ensure geocoder is fully initialized
    const timeoutId = setTimeout(() => {
      // Ensure geocoder is available
      if (!geocoderRef.current) {
        console.warn('Geocoder not initialized, skipping address geocoding')
        return
      }

      geocoderRef.current
        .geocode({ address })
        .then(response => {
          if (response.results[0]) {
            const location = response.results[0].geometry.location
            const newPosition = {
              lat: location.lat(),
              lng: location.lng(),
            }

            if (mapRef.current) {
              mapRef.current.panTo(newPosition)
            }
            if (markerRef.current) {
              markerRef.current.position = newPosition
            }

            if (onLocationSelect) {
              onLocationSelect({
                address: response.results[0].formatted_address,
                ...newPosition,
                placeId: response.results[0].place_id || '',
              })
            }
          }
        })
        .catch(error => console.error('Geocoding error:', error))
    }, 100) // 100ms delay

    // Cleanup timeout on unmount or dependency change
    return () => clearTimeout(timeoutId)
  }, [address, onLocationSelect, isLoaded])

  if (!isLoaded) {
    return <div>Loading map...</div>
  }

  return <div ref={ref} id="map" style={{ width: '100%', height: '400px' }} />
}
