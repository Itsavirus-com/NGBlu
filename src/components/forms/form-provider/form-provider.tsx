import React from 'react'
import { Form } from 'react-bootstrap'
import { FormProvider as Provider, SubmitHandler, UseFormReturn } from 'react-hook-form'

type FormProviderProps<FormState extends Record<string, any>> = {
  methods: UseFormReturn<FormState, any>
  onSubmit: SubmitHandler<FormState>
  children: React.ReactNode
  name?: string
}

export const FormProvider = <FormState extends Record<string, any>>(
  props: FormProviderProps<FormState>
) => {
  const {
    methods,
    methods: { handleSubmit },
    onSubmit,
    children,
    name,
  } = props

  return (
    <Provider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} data-test-id={`${name}-form`}>
        {children}
      </Form>
    </Provider>
  )
}
