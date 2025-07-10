'use client'

import { KTIcon } from '@/components/kt-icon/KtIcon'

type Step = {
  number: number
  title: string
  description: string
  icon: string
}

type BusinessPartnerStepsProps = {
  currentStep: number
  onStepClick: (step: number) => void
}

export const BusinessPartnerSteps = ({ currentStep, onStepClick }: BusinessPartnerStepsProps) => {
  const steps: Step[] = [
    {
      number: 1,
      title: 'Business Profile',
      description: 'Setup Business Partner Profile',
      icon: 'profile-user',
    },
    {
      number: 2,
      title: 'Product Configuration',
      description: 'Selecting Product',
      icon: 'setting',
    },
    {
      number: 3,
      title: 'Set the Business Settings',
      description: 'Partner Manager & Contract',
      icon: 'financial-schedule',
    },
    {
      number: 4,
      title: 'Review',
      description: 'Final Review and Submission',
      icon: 'check-circle',
    },
  ]

  const getStepStatusClass = (stepNumber: number) => {
    // Current step gets 'current' class
    if (stepNumber === currentStep) {
      return 'current'
    }
    // Only mark steps as completed if they are less than the current step
    // Don't mark steps as completed when going back
    else if (stepNumber < currentStep) {
      return 'completed'
    }
    // All other steps are pending
    else {
      return 'pending'
    }
  }

  // Determine if a step is clickable
  const isStepClickable = (stepNumber: number) => {
    // Steps that are current or previous are always clickable
    // Future steps are only clickable if they are adjacent to the current step
    return stepNumber <= currentStep + 1
  }

  return (
    <div className="card">
      <div className="card-body p-6">
        <div className="stepper stepper-pills stepper-column d-flex flex-column">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`stepper-item ${getStepStatusClass(step.number)}`}
              onClick={() => isStepClickable(step.number) && onStepClick(step.number)}
              style={{
                cursor: isStepClickable(step.number) ? 'pointer' : 'not-allowed',
                opacity: isStepClickable(step.number) ? 1 : 0.7,
              }}
            >
              <div className="stepper-line h-40px"></div>

              <div className="stepper-icon">
                <KTIcon iconName="check" className="stepper-check text-success fs-1" />
                <span className="stepper-number">{step.number}</span>
              </div>

              <div className="stepper-label">
                <div className="stepper-title fs-5 fw-bold text-dark">{step.title}</div>
                <div className="stepper-desc fw-semibold text-muted">{step.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
