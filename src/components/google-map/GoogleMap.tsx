import { Status, Wrapper } from '@googlemaps/react-wrapper'
import { ReactElement, useEffect, useRef } from 'react'

type MapProps = {
  center: google.maps.LatLngLiteral
  zoom: number
  address?: string
  onLocationSelect?: (location: {
    address: string
    lat: number
    lng: number
    placeId: string
  }) => void
}

function Map({ center, zoom, address, onLocationSelect }: MapProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mapRef = useRef<google.maps.Map>()
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement>()
  const geocoderRef = useRef<google.maps.Geocoder>()

  useEffect(() => {
    if (!ref.current) return

    geocoderRef.current = new window.google.maps.Geocoder()

    mapRef.current = new window.google.maps.Map(ref.current, {
      center,
      zoom,
      mapTypeControl: false,
      streetViewControl: false,
      mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    })

    markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
      map: mapRef.current,
      position: center,
    })
  }, [])

  // Update marker position when center changes
  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.position = center
    }
    if (mapRef.current) {
      mapRef.current.panTo(center)
    }
  }, [center])

  // Handle address changes
  useEffect(() => {
    if (!address || !geocoderRef.current) return

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
  }, [address])

  return <div ref={ref} id="map" style={{ width: '100%', height: '400px' }} />
}

const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) return <div>Error loading map</div>
  return <div>Loading map...</div>
}

type GoogleMapProps = {
  lat: number
  lng: number
  address?: string
  onLocationSelect?: MapProps['onLocationSelect']
}

export const GoogleMap = ({ lat, lng, address, onLocationSelect }: GoogleMapProps) => {
  return (
    <Wrapper
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      render={render}
      libraries={['maps', 'places', 'geocoding', 'marker']}
    >
      <Map center={{ lat, lng }} zoom={12} address={address} onLocationSelect={onLocationSelect} />
    </Wrapper>
  )
}
