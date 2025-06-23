export interface TotpSettings {
  is2faEnabled: boolean
  backupCodes?: string[]
  qrCodeUrl?: string
}

export interface TotpVerificationState {
  tempToken: string
  email: string
  requiresVerification: boolean
}

export interface BackupCode {
  code: string
  used: boolean
}

// API Types
export interface GenerateQrCodeResponse {
  success: boolean
  message: string
  data: {
    qrCodeUrl: string
  }
}

export interface Enable2faResponse {
  success: boolean
  message: string
  data: {
    backupCodes: string[]
  }
}

export interface Disable2faResponse {
  success: boolean
  message: string
}

export interface Verify2faRequest {
  temp_token: string
  code: string
  type: 'backup' | '2fa'
}

export interface Verify2faResponse {
  success: boolean
  message: string
  data: {
    id: number
    auth_type: string
    roles: string[]
    firstname: string | null
    lastname: string | null
    email: string
    phone_number: string | null
    // ... other user fields
  }
}
