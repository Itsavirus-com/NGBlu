import { ApiCore } from './api-core'
import type { Check2faAvailabilityRequest, Verify2faRequest } from '../swr/models/totp.type'

export class TotpApi extends ApiCore {
  /**
   * Check if user has 2FA enabled
   */
  async check2faAvailability(payload: Check2faAvailabilityRequest) {
    return await this.post({ path: 'login/check-2fa-availability', payload })
  }

  /**
   * Generate QR code for TOTP setup
   */
  async generateQrCode() {
    return await this.post({ path: 'users/profile/2fa/generate-qr-code' })
  }

  /**
   * Enable 2FA for the user (returns backup codes)
   */
  async enable2fa(payload: { code: string }) {
    return await this.post({ path: 'users/profile/2fa/enable', payload })
  }

  /**
   * Disable 2FA for the user
   */
  async disable2fa() {
    return await this.post({ path: 'users/profile/2fa/disable' })
  }

  /**
   * Verify 2FA code during login
   */
  async verify2fa(payload: Verify2faRequest) {
    return await this.post({ path: 'login/verify-2fa', payload })
  }
}

export const totpApi = new TotpApi()
