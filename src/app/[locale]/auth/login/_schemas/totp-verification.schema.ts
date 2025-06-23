import * as yup from 'yup'

import { TOTP_REGEX } from '@/constants/regex'

export const totpVerificationSchema = yup.object().shape({
  code: yup
    .string()
    .required('2FA code is required')
    .matches(TOTP_REGEX, '2FA code must be 6 digits')
    .min(6, '2FA code must be 6 digits')
    .max(6, '2FA code must be 6 digits'),
  useBackupCode: yup.boolean().default(false),
})

export type TotpVerificationFormData = yup.InferType<typeof totpVerificationSchema>
