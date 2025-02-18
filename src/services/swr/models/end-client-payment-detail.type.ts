import { BusinessPartner } from './business-partner.type'
import { EnterpriseRoot } from './enterprise-root.type'
import { Payment } from './payment.type'

export type EndClientPaymentDetail = {
  id: number
  endclientId: number
  paymentInfoId: number
  paymentInfo: Payment
  createdAt: string
  updatedAt: string
  enterpriseRootId: number
  enterpriseRoot: EnterpriseRoot
  businesspartnerId: number
  businesspartner: BusinessPartner
}
