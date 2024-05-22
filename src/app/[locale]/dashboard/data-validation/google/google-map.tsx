import { Status, Wrapper } from '@googlemaps/react-wrapper'
import { ReactElement, useEffect, useRef } from 'react'

type MapProps = {
  center: google.maps.LatLngLiteral
  zoom: number
}

function Map({ center, zoom }: MapProps) {
  const ref = useRef<any>()

  useEffect(() => {
    if (!ref.current) return

    new window.google.maps.Map(ref.current, {
      center,
      zoom,
      mapTypeControl: false,
      streetViewControl: false,
    })
  }, [])

  return <div ref={ref} id="map" style={{ width: '100%', height: '60%' }} />
}

const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) return <div />

  return <div />
}

export const GoogleMap = ({ lat, lng }: MapProps['center']) => {
  return (
    <Wrapper
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      render={render}
      language="en"
      libraries={['maps', 'places']}
    >
      <Map center={{ lat, lng }} zoom={12} />
    </Wrapper>
  )
}
