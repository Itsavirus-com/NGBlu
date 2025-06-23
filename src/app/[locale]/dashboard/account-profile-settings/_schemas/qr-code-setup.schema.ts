import * as yup from 'yup'

export const qrCodeSetupSchema = yup.object({
  verificationCode: yup
    .string()
    .required('Verification code is required')
    .matches(/^\d{6}$/, 'Verification code must be 6 digits'),
})

export type QrCodeSetupFormData = yup.InferType<typeof qrCodeSetupSchema>
