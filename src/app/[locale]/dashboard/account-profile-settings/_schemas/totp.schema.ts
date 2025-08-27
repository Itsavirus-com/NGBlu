import * as yup from 'yup'

import { TOTP_REGEX } from '@/constants/regex'

export const totpSetupSchema = yup.object().shape({
  verificationCode: yup
    .string()
    .required('Verification code is required')
    .matches(TOTP_REGEX, 'Verification code must be 6 digits')
    .min(6, 'Verification code must be 6 digits')
    .max(6, 'Verification code must be 6 digits'),
})

export type TotpSetupFormData = yup.InferType<typeof totpSetupSchema>
