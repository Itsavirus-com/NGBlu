import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { InferType } from '@/utils/typescript'

export default function useKvkForm() {
  const schema = yup.object().shape({
    companyName: yup.string().ensure().required(),
  })

  const methods = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    defaultValues: {},
  })

  const onSubmit = async (data: InferType<typeof schema>) => {}

  return { methods, onSubmit }
}
