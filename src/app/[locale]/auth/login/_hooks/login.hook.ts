import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { schema } from '../_schemas/login.schema'

export const useLogin = () => {
  const methods = useForm({ resolver: yupResolver(schema) })

  const onSubmit = (data: any) => {
    // TODO: Implement Integration with API later
    console.log(data)
  }

  return { methods, onSubmit }
}
