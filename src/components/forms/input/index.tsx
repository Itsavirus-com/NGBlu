import clsx from 'clsx'
import { Form, FormControlProps } from 'react-bootstrap'
import { useController, useFormContext } from 'react-hook-form'

type InputProps = FormControlProps & {
  label?: string
  name: string
  containerClass?: string
  step?: number
  min?: number
  max?: number
  isRequired?: boolean
}

export const ControlledInput = (props: InputProps) => {
  const { label, name, containerClass, children, step, isRequired, ...otherProps } = props

  const { register, control } = useFormContext()
  const {
    fieldState: { invalid, error },
  } = useController({ control, name })

  return (
    <Form.Group className={containerClass}>
      {label && (
        <Form.Label className={clsx('fw-bold', { required: isRequired })}>{label}</Form.Label>
      )}
      <Form.Control
        id={name}
        as="input"
        isInvalid={invalid}
        step={step}
        {...register(name)}
        {...otherProps}
        autoComplete={name}
        data-test-id={name}
        className={clsx('form-select', { 'is-invalid': invalid })}
      >
        {children}
      </Form.Control>

      {error && <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>}
    </Form.Group>
  )
}
