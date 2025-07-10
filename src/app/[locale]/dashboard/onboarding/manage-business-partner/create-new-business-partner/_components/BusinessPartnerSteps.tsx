'use client'

import { KTIcon } from '@/components/kt-icon/KtIcon'

import { useBusinessPartnerSteps } from '../_hooks/business-partner-steps.hook'

type BusinessPartnerStepsProps = {
  currentStep: number
  onStepClick: (step: number) => void
}

export const BusinessPartnerSteps = ({ currentStep, onStepClick }: BusinessPartnerStepsProps) => {
  const { steps, getStepStatusClass, isStepClickable } = useBusinessPartnerSteps(currentStep)

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
