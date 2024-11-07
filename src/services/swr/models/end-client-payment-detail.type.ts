import { Payment } from './payment.type'

export type EndClientPaymentDetail = {
  id: number
  endclientId: number
  paymentInfoId: number
  paymentInfo: Payment
  createdAt: string
  updatedAt: string
}
