import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { FormCheckInputProps } from 'react-bootstrap/esm/FormCheckInput'
import { useController, useFormContext } from 'react-hook-form'

type SwitchProps = FormCheckInputProps & {
  label?: string
  name: string
  containerClass?: string
  step?: number
  type?: 'checkbox' | 'radio' | 'switch'
  value?: any
}

export const ControlledSwitch = (props: SwitchProps) => {
  const {
    label,
    name,
    containerClass,
    children,
    step,
    type = 'switch',
    value,
    onChange,
    ...otherProps
  } = props

  const { register, control } = useFormContext()
  const {
    field: { value: selectedValue, onChange: onChangeField },
    fieldState: { invalid, error },
  } = useController({ control, name })

  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    setIsChecked(value ? selectedValue === value : selectedValue)
  }, [selectedValue, value])

  return (
    <Form.Group className={containerClass}>
      <div className="d-flex mt-4">
        <Form.Check
          type={type}
          id={name}
          isInvalid={invalid}
          step={step}
          {...register(name)}
          checked={isChecked}
          onChange={e => {
            const newValue = value ? value : e.target.checked
            setIsChecked(newValue)
            onChangeField(newValue)
            onChange?.(newValue)
          }}
          {...otherProps}
          autoComplete={name}
          data-test-id={name}
          value={value}
        />
        {label && (
          <Form.Check.Label
            className={clsx('fw-bold ms-3', {
              'text-dark': isChecked,
            })}
          >
            {label}
          </Form.Check.Label>
        )}
      </div>

      {error && <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>}
    </Form.Group>
  )
}
