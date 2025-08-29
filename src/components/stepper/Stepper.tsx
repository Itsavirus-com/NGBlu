import { KTIcon } from '@/components/kt-icon/KtIcon'

export type StepperStep = {
  number: number
  title: string
  description: string
  status?: 'completed' | 'current' | 'pending'
}

type StepperProps = {
  steps: StepperStep[]
  currentStep: number
  onStepClick?: (step: number) => void
  isStepClickable?: (step: number) => boolean
  className?: string
  sticky?: boolean
  stickyTop?: string
}

export const Stepper = ({
  steps,
  currentStep,
  onStepClick,
  isStepClickable,
  className = '',
  sticky = false,
  stickyTop = '20px',
}: StepperProps) => {
  const getStepStatusClass = (stepNumber: number): string => {
    if (stepNumber < currentStep) return 'completed'
    if (stepNumber === currentStep) return 'current'
    return 'pending'
  }

  const getStepStatus = (stepNumber: number): 'completed' | 'current' | 'pending' => {
    if (stepNumber < currentStep) return 'completed'
    if (stepNumber === currentStep) return 'current'
    return 'pending'
  }

  const defaultIsStepClickable = (stepNumber: number): boolean => {
    return stepNumber <= currentStep
  }

  const handleStepClick = (stepNumber: number) => {
    const clickable = isStepClickable
      ? isStepClickable(stepNumber)
      : defaultIsStepClickable(stepNumber)
    if (clickable && onStepClick) {
      onStepClick(stepNumber)
    }
  }

  const stickyStyles = sticky
    ? {
        position: 'sticky' as const,
        top: stickyTop,
        zIndex: 1000,
      }
    : {}

  const getStepItemStyles = (status: string, clickable: boolean) => {
    const baseStyles = {
      cursor: clickable ? 'pointer' : 'not-allowed',
      opacity: clickable ? 1 : 0.7,
      transition: 'all 0.3s ease',
      borderRadius: '8px',
      padding: '12px',
      margin: '8px 0',
      position: 'relative' as const,
    }

    if (status === 'current') {
      return {
        ...baseStyles,
        backgroundColor: '#f0f9ff',
        border: '2px solid #3b82f6',
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
        transform: 'scale(1.02)',
      }
    } else if (status === 'completed') {
      return {
        ...baseStyles,
        backgroundColor: '#f0fdf4',
        border: '1px solid #22c55e',
      }
    } else {
      return {
        ...baseStyles,
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
      }
    }
  }

  const getStepIconStyles = (status: string) => {
    if (status === 'current') {
      return {
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        border: '3px solid #3b82f6',
        boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2)',
        transform: 'scale(1.1)',
      }
    } else if (status === 'completed') {
      return {
        backgroundColor: '#22c55e',
        color: '#ffffff',
        border: '3px solid #22c55e',
      }
    } else {
      return {
        backgroundColor: '#e2e8f0',
        color: '#64748b',
        border: '3px solid #e2e8f0',
      }
    }
  }

  const getStepTextStyles = (status: string) => {
    if (status === 'current') {
      return {
        titleColor: '#1e40af',
        descColor: '#3b82f6',
        fontWeight: '600',
      }
    } else if (status === 'completed') {
      return {
        titleColor: '#166534',
        descColor: '#22c55e',
        fontWeight: '500',
      }
    } else {
      return {
        titleColor: '#64748b',
        descColor: '#94a3b8',
        fontWeight: '400',
      }
    }
  }

  return (
    <div className={`card ${className}`} style={stickyStyles}>
      <div className="card-body p-6">
        <div className="stepper stepper-pills stepper-column d-flex flex-column">
          {steps.map((step, index) => {
            const status = step.status || getStepStatus(step.number)
            const clickable = isStepClickable
              ? isStepClickable(step.number)
              : defaultIsStepClickable(step.number)

            const itemStyles = getStepItemStyles(status, clickable)
            const iconStyles = getStepIconStyles(status)
            const textStyles = getStepTextStyles(status)

            return (
              <div
                key={step.number}
                className={`stepper-item ${getStepStatusClass(step.number)} position-relative`}
                onClick={() => handleStepClick(step.number)}
                style={itemStyles}
              >
                {index < steps.length - 1 && (
                  <div
                    className="position-absolute"
                    style={{
                      left: '29px',
                      bottom: '-16px',
                      width: '2px',
                      height: '32px',
                      backgroundColor: status === 'completed' ? '#22c55e' : '#e2e8f0',
                      zIndex: 1,
                    }}
                  />
                )}

                <div className="d-flex align-items-center">
                  <div
                    className="stepper-icon d-flex align-items-center justify-content-center"
                    style={{
                      ...iconStyles,
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      transition: 'all 0.3s ease',
                      marginRight: '16px',
                      fontSize: '14px',
                      fontWeight: '600',
                      zIndex: 2,
                      position: 'relative',
                    }}
                  >
                    {status === 'completed' ? (
                      <KTIcon iconName="check" className="fs-1" />
                    ) : (
                      <span>{step.number}</span>
                    )}
                  </div>

                  <div className="stepper-label flex-grow-1">
                    <div
                      className="stepper-title fs-6 mb-1"
                      style={{
                        color: textStyles.titleColor,
                        fontWeight: textStyles.fontWeight,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {step.title}
                    </div>
                    <div
                      className="stepper-desc fs-7"
                      style={{
                        color: textStyles.descColor,
                        fontWeight: '400',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {step.description}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
