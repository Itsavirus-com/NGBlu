import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast.hook'
import { useRouter } from '@/navigation'
import { businessPartnerProjectApi } from '@/services/api/business-partner-project-api'
import { useBusinessPartnerProject } from '@/services/swr/use-business-partner-project'
import { omitNullAndUndefined } from '@/utils/object'
import { InferType } from '@/utils/typescript'

import { schema } from '../_schemas/business-partner-project-form.schema'

export default function useBusinessPartnerProjectForm(
  businessPartnerId: number,
  projectId?: number
) {
  const { back } = useRouter()
  const { showToast, showUnexpectedToast } = useToast()

  const {
    data: project,
    isLoading,
    mutate: invalidateCache,
  } = useBusinessPartnerProject(businessPartnerId, projectId)

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),

    values: project && {
      projectId: project?.id ?? 0,
      ouUnitId: project?.ouUnitId ?? 0,
      businesspartnersAddressesId: project?.businesspartnerAddressId ?? 0,
    },
  })

  const addNewBusinessPartnerProject = async (data: InferType<typeof schema>) => {
    try {
      const res = await businessPartnerProjectApi.new(businessPartnerId, {
        ...data,
        businesspartnerId: businessPartnerId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Business partner project created successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const updateBusinessPartnerProject = async (data: InferType<typeof schema>) => {
    if (!projectId) return

    try {
      const res = await businessPartnerProjectApi.update(businessPartnerId, projectId, {
        ...data,
        businesspartnerId: businessPartnerId,
      })

      if (res.ok) {
        showToast({ variant: 'success', body: 'Business partner project updated successfully' })
        invalidateCache()
        back()
      }
    } catch (error) {
      showUnexpectedToast()
    }
  }

  const onSubmit = async (data: InferType<typeof schema>) => {
    const submitData = omitNullAndUndefined(data)

    if (projectId) {
      return updateBusinessPartnerProject(submitData)
    }
    return addNewBusinessPartnerProject(submitData)
  }

  return { methods, onSubmit, isLoading }
}
