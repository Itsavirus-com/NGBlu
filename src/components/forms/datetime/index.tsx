import clsx from 'clsx'
import React, { useState } from 'react'
import { Form, FormControlProps } from 'react-bootstrap'
import Flatpickr from 'react-flatpickr'
import { useController, useFormContext } from 'react-hook-form'

type DatetimeProps = FormControlProps & {
  label?: string
  name: string
  containerClass?: string
  step?: number
  min?: number
  max?: number
  disabled?: boolean
  options?: Object
  isRequired?: boolean
  onChange?: ([value]: any) => void
}

export const ControlledDatetime = (props: DatetimeProps) => {
  const { label, name, containerClass, className, children, step, isRequired } = props

  const { register, control, setValue } = useFormContext()
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ control, name })
  const [datetime, setDatetime] = useState(field.value)

  return (
    <Form.Group className={containerClass}>
      {label && (
        <Form.Label className={clsx('fw-bold', { required: isRequired })}>{label}</Form.Label>
      )}
      <Form.Control isInvalid={invalid} type="hidden" />
      <Flatpickr
        id={name}
        step={step}
        className={clsx('form-control', className)}
        {...register(name)}
        disabled={props.disabled}
        value={datetime}
        onChange={([date]: any) => {
          setDatetime(date)
          setValue(name, new Date(date - new Date().getTimezoneOffset() * 60000).toISOString())
          if (props.onChange) props.onChange([date])
        }}
        autoComplete={name}
        data-test-id={name}
        options={{
          enableTime: true,
          dateFormat: 'Y-m-d H:i',
          ...props.options,
        }}
      >
        {children}
      </Flatpickr>
      {error && <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>}
    </Form.Group>
  )
}
