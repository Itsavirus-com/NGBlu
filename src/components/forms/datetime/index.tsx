import clsx from 'clsx'
import { format, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'
import { Form, FormControlProps } from 'react-bootstrap'
import Flatpickr from 'react-flatpickr'
import { useController, useFormContext } from 'react-hook-form'

import { MONTH_YEAR_REGEX } from '@/constants/regex'

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
  enableTime?: boolean
  dateFormat?: string
  customSubmitDateFormat?: string
  onChange?: ([value]: any) => void
}

export const ControlledDatetime = (props: DatetimeProps) => {
  const {
    label,
    name,
    containerClass,
    className,
    children,
    step,
    isRequired,
    enableTime,
    dateFormat = enableTime ? 'Y-m-d H:i' : 'Y-m-d',
    customSubmitDateFormat,
  } = props

  const { control, setValue } = useFormContext()
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ control, name })
  const [datetime, setDatetime] = useState<Date | null>(null)

  const parseSetDateValue = () => {
    try {
      let date: Date

      switch (true) {
        case typeof field.value === 'string': {
          switch (true) {
            case MONTH_YEAR_REGEX.test(field.value): {
              const [month, year] = field.value.split('/')
              date = new Date(parseInt(year), parseInt(month) - 1, 1)
              break
            }
            case field.value.includes('T'): {
              date = parseISO(field.value)
              break
            }
            default: {
              date = new Date(field.value)
            }
          }
          break
        }
        case field.value instanceof Date: {
          date = field.value
          break
        }
        default: {
          return
        }
      }

      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return
      }

      setDatetime(date)
    } catch (error) {
      console.error('Error parsing date:', error)
    }
  }

  useEffect(() => {
    if (field.value) {
      parseSetDateValue()
    } else {
      setDatetime(null)
    }
  }, [field.value])

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
        disabled={props.disabled}
        value={datetime || undefined}
        onChange={([date]: any) => {
          setDatetime(date)
          setValue(
            name,
            customSubmitDateFormat
              ? format(date, customSubmitDateFormat)
              : format(date, 'yyyy-MM-dd HH:mm:ss')
          )

          if (props.onChange) props.onChange([date])
        }}
        autoComplete={name}
        data-test-id={name}
        options={{
          enableTime: enableTime,
          dateFormat: dateFormat,
          ...props.options,
        }}
      >
        {children}
      </Flatpickr>
      {error && <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>}
    </Form.Group>
  )
}
