import { Status, Wrapper } from '@googlemaps/react-wrapper'
import { ReactNode, useEffect, useState } from 'react'

type GoogleMapsProviderProps = {
  children: ReactNode
}

const render = (status: Status) => {
  if (status === Status.FAILURE) return <div>Error loading map</div>
  return <div>Loading map...</div>
}

export const GoogleMapsProvider = ({ children }: GoogleMapsProviderProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (window.google?.maps) {
      setIsLoaded(true)
    }
  }, [])

  if (!isLoaded) {
    return (
      <Wrapper
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
        render={render}
        libraries={['maps', 'places', 'geocoding', 'marker']}
      >
        <div>Loading Google Maps...</div>
      </Wrapper>
    )
  }

  return <>{children}</>
}
