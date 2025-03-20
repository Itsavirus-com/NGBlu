import clsx from 'clsx'
import Image from 'next/image'
import { ElementType, useState } from 'react'
import { Form, FormControlProps, InputGroup } from 'react-bootstrap'
import { useController, useFormContext } from 'react-hook-form'

import eyePassClosed from '@/assets/images/general/eye-password-closed.png'
import eyePassOpen from '@/assets/images/general/eye-password-open.png'

type InputProps = FormControlProps & {
  label?: string
  name: string
  containerClass?: string
  step?: number
  min?: number
  max?: number
  isRequired?: boolean
  inputType?: ElementType
  hidePasswordToggle?: boolean
}

export const ControlledInput = (props: InputProps) => {
  const {
    label,
    name,
    containerClass,
    children,
    step,
    isRequired,
    inputType = 'input',
    type,
    hidePasswordToggle,
    ...otherProps
  } = props

  const [showPassword, setShowPassword] = useState(false)

  const { register, control } = useFormContext()
  const {
    fieldState: { invalid, error },
  } = useController({ control, name })

  const isPasswordField = type === 'password' && !hidePasswordToggle
  const effectiveType = isPasswordField ? (showPassword ? 'text' : 'password') : type

  const formControl = (
    <Form.Control
      id={name}
      as={inputType}
      isInvalid={invalid}
      step={step}
      type={effectiveType}
      {...register(name)}
      {...otherProps}
      autoComplete={name}
      data-test-id={name}
      className={clsx('form-control', { 'is-invalid': invalid })}
    >
      {children}
    </Form.Control>
  )

  return (
    <Form.Group className={containerClass}>
      {label && (
        <Form.Label className={clsx('fw-bold', { required: isRequired })}>{label}</Form.Label>
      )}

      {isPasswordField ? (
        <div className="position-relative">
          <InputGroup hasValidation>
            {formControl}
            <InputGroup.Text
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer' }}
            >
              <Image
                src={showPassword ? eyePassOpen : eyePassClosed}
                alt={showPassword ? 'Hide password' : 'Show password'}
                width={20}
                height={20}
              />
            </InputGroup.Text>
            {error && <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>}
          </InputGroup>
        </div>
      ) : (
        <>
          {formControl}
          {error && <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>}
        </>
      )}
    </Form.Group>
  )
}
