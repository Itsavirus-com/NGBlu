import useSWR from 'swr'
import { derive } from 'valtio/utils'

import { modelAdaptor } from './middleware/model-adaptor'
import { BusinessPartner } from './models/business-partner.type'
import { Namespace } from './models/namespace.type'

export const useBusinessPartner = (id?: number) => {
  const { data, mutate, isLoading } = useSWR<BusinessPartner>(
    () =>
      id && {
        path: `business-partners/${id}`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}

export const useBusinessPartnerNamespace = (id?: number) => {
  const { data, mutate, isLoading } = useSWR<Namespace>(
    () =>
      id && {
        path: `business-partners/${id}/namespace`,
      },
    {
      use: [modelAdaptor(() => derive({}), 'data')],
    }
  )

  return { data, mutate, isLoading }
}

export const useBusinessPartnerProjectNamespace = (
  businessPartnerId?: number,
  projectId?: number
) => {
  const {
    data: response,
    mutate,
    isLoading,
  } = useSWR<{ data: Namespace[] }>(
    () =>
      businessPartnerId &&
      projectId && {
        path: `business-partners/${businessPartnerId}/projects/${projectId}/namespace`,
      }
  )

  const data = response?.data

  return { data, mutate, isLoading }
}

export const useBusinessPartnerCustomerNamespace = (
  businessPartnerId?: number,
  customerId?: number
) => {
  const {
    data: response,
    mutate,
    isLoading,
  } = useSWR<{ data: Namespace[] }>(
    () =>
      businessPartnerId &&
      customerId && {
        path: `business-partners/${businessPartnerId}/customers/${customerId}/namespace`,
      }
  )

  const data = response?.data

  return { data, mutate, isLoading }
}
