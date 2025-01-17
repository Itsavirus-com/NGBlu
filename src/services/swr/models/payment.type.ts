import { Address } from './address.type'
import { CreditCardBrand } from './credit-card-brand.type'
import { CreditCardType } from './credit-card-type.type'
import { PaymentType } from './payment-type.type'
import { Person } from './person.type'

export type Payment = {
  id: number
  paymentTypeId: number
  paymentType: PaymentType
  bankname: string
  bankIban: string
  bankBic: string
  bankAddressId: number
  bankAddress: Address
  creditcardNumber: string
  validTo: string
  cvv: string
  creditcardTypeId: number
  creditCardType: CreditCardType
  creditcardBrandId: number
  creditCardBrand: CreditCardBrand
  personId: number
  person: Person
  endclientId: number
  businesspartnerId: number
  enterpriseRootId: number
  createdAt: string
  updatedAt: string
}
