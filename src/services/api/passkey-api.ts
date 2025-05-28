import type {
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
} from '@simplewebauthn/types'

import { ApiCore } from './api-core'
import { serialize } from './helpers/serialize-formdata'

export interface PasskeyRegistrationOptions {
  challenge: string
  rp: {
    name: string
    id: string
  }
  user: {
    id: string
    name: string
    displayName: string
  }
  pubKeyCredParams: Array<{
    type: 'public-key'
    alg: number
  }>
  authenticatorSelection: {
    authenticatorAttachment?: 'platform' | 'cross-platform'
    userVerification: 'required' | 'preferred' | 'discouraged'
    residentKey: 'required' | 'preferred' | 'discouraged'
  }
  timeout: number
  attestation: 'none' | 'indirect' | 'direct'
}

export interface PasskeyAuthenticationOptions {
  challenge: string
  timeout: number
  rpId: string
  allowCredentials: Array<{
    type: 'public-key'
    id: string
    transports?: Array<'usb' | 'nfc' | 'ble' | 'internal'>
  }>
  userVerification: 'required' | 'preferred' | 'discouraged'
}

export interface PasskeyRegistrationResponse {
  id: string
  rawId: string
  response: {
    attestationObject: string
    clientDataJSON: string
  }
  type: 'public-key'
  clientExtensionResults: Record<string, any>
}

export interface PasskeyAuthenticationResponse {
  id: string
  rawId: string
  response: {
    authenticatorData: string
    clientDataJSON: string
    signature: string
    userHandle?: string
  }
  type: 'public-key'
  clientExtensionResults: Record<string, any>
}

export class PasskeyApi extends ApiCore {
  constructor() {
    super()
  }

  // Override payload transformer to disable snake_case for passkey API only
  protected addPayloadTransformer() {
    this.api.addRequestTransform(request => {
      const data = this.payloadWrapper ? { [this.payloadWrapper]: request.data } : request.data

      if (this.multipart) {
        request.data = serialize(data, {
          nullsAsUndefined: true,
          useSnakedKey: false, // Always false for passkey API
        })
      } else {
        request.data = data // Keep original casing for passkey API
      }
    })
  }

  // Get registration options from the backend
  async getRegistrationOptions() {
    return await this.post({ path: 'passkeys/register/options' })
  }

  // Send registration response to the backend
  async verifyRegistration(
    response: PasskeyRegistrationResponse,
    options: PublicKeyCredentialCreationOptionsJSON,
    name: string
  ) {
    const payload = {
      passkey: response,
      options: options,
      name: name,
    }

    return await this.post({ path: 'passkeys/register/verify', payload })
  }

  // Get authentication login options from the backend
  async loginOptions() {
    return await this.post({ path: 'login/passkey/options' })
  }

  // login with passkey
  async verifyLogin(
    response: PasskeyAuthenticationResponse,
    options: PublicKeyCredentialRequestOptionsJSON
  ) {
    const payload = {
      assertion: response,
      options: options,
    }
    return await this.post({ path: 'login/passkey/verify', payload })
  }

  // not ready yet
  // Get user's registered passkeys
  async getUserPasskeys() {
    return await this.get({ path: 'passkeys' })
  }

  // Delete a passkey
  async deletePasskey(passkeyId: string) {
    return await this.delete({ path: `passkeys/${passkeyId}` })
  }

  // Update passkey name
  async updatePasskeyName(passkeyId: string, name: string) {
    return await this.patch({ path: `passkeys/${passkeyId}`, payload: { name } })
  }
}

export const passkeyApi = new PasskeyApi()
