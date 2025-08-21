export interface PartnerManager {
  id: number
  firstname: string
  lastname: string
  email: string
  role: string
}

export interface PartnerManagerResponse {
  success: boolean
  message: null | string
  data: PartnerManager[]
  pagination: {
    current_page: number
    from: number
    last_page: number
    path: string
    per_page: number
    to: number
    total: number
  }
}
