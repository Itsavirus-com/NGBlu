import clsx from 'clsx'
import Image from 'next/image'
import { ElementType, ReactNode, useState } from 'react'
import { Form, FormControlProps, InputGroup } from 'react-bootstrap'
import { useController, useFormContext } from 'react-hook-form'

import eyePassClosed from '@/assets/images/general/eye-password-closed.png'
import eyePassOpen from '@/assets/images/general/eye-password-open.png'
import './input.style.scss'

type InputProps = FormControlProps & {
  label?: string | ReactNode
  customLabel?: ReactNode
  name: string
  containerClass?: string
  step?: number
  min?: number
  max?: number
  isRequired?: boolean
  inputType?: ElementType
  hidePasswordToggle?: boolean
  className?: string
  disabled?: boolean
}

export const ControlledInput = (props: InputProps) => {
  const {
    label,
    customLabel,
    name,
    containerClass,
    children,
    step,
    isRequired,
    inputType = 'input',
    type,
    hidePasswordToggle,
    className,
    disabled,
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
      className={clsx('form-control', { 'is-invalid': invalid }, className)}
      disabled={disabled}
    >
      {children}
    </Form.Control>
  )

  // Check if label is a ReactNode (for custom layout) or a string
  const renderLabel = () => {
    if (!label) return null

    if (typeof label === 'string') {
      return (
        <Form.Label className={clsx('fw-bold mb-2', { required: isRequired })}>{label}</Form.Label>
      )
    }

    // For ReactNode, render directly but add mb-2 class for consistent spacing
    return <div className="mb-2">{label}</div>
  }

  return (
    <Form.Group className={containerClass}>
      {renderLabel()}

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
          {customLabel && customLabel}
        </>
      )}
    </Form.Group>
  )
}
