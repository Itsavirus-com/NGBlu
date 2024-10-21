import React from 'react'
import { Form } from 'react-bootstrap'
import { FormCheckInputProps } from 'react-bootstrap/esm/FormCheckInput'
import { useController, useFormContext } from 'react-hook-form'

type SwitchProps = FormCheckInputProps & {
  label?: string
  name: string
  containerClass?: string
  step?: number
}

export const ControlledSwitch = (props: SwitchProps) => {
  const { label, name, containerClass, children, step, ...otherProps } = props

  const { register, control } = useFormContext()
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ control, name })

  return (
    <Form.Group className={containerClass}>
      <div className="d-flex my-4">
        <Form.Check
          type="radio"
          id={name}
          isInvalid={invalid}
          step={step}
          {...register(name)}
          {...otherProps}
          name={field.name}
          autoComplete={name}
          data-test-id={name}
        />
        {label && <Form.Check.Label className="fw-bold">{label}</Form.Check.Label>}
      </div>

      {error && <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>}
    </Form.Group>
  )
}
