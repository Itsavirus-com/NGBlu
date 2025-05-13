import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const placeId = searchParams.get('place_id')
    const sessiontoken = searchParams.get('sessiontoken')

    if (!placeId) {
      return NextResponse.json({ error: 'place_id parameter is required' }, { status: 400 })
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Google Maps API key is not configured' }, { status: 500 })
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry,formatted_address,name,address_component&key=${apiKey}${sessiontoken ? `&sessiontoken=${sessiontoken}` : ''}`

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in places details API:', error)
    return NextResponse.json({ error: 'Failed to fetch place details' }, { status: 500 })
  }
}
