export interface AddressSuggestion {
  placeId: string
  description: string
  mainText: string
  secondaryText: string
  latitude: number | null
  longitude: number | null
  street?: string
  streetNumber?: string
  subpremise?: string
  postalCode?: string
  city?: string
  country?: string
  fieldName?: string
}
