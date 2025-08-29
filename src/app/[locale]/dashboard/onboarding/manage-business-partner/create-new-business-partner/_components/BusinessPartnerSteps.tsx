'use client'

import { Stepper, StepperStep } from '@/components/stepper'

import { useBusinessPartnerSteps } from '../_hooks/business-partner-steps.hook'

type BusinessPartnerStepsProps = {
  currentStep: number
  onStepClick: (step: number) => void
}

export const BusinessPartnerSteps = ({ currentStep, onStepClick }: BusinessPartnerStepsProps) => {
  const { steps, getStepStatusClass, isStepClickable } = useBusinessPartnerSteps(currentStep)

  // Convert steps to StepperStep format
  const stepperSteps: StepperStep[] = steps.map(step => ({
    number: step.number,
    title: step.title,
    description: step.description,
    status: getStepStatusClass(step.number) as 'completed' | 'current' | 'pending',
  }))

  return (
    <Stepper
      steps={stepperSteps}
      currentStep={currentStep}
      onStepClick={onStepClick}
      isStepClickable={isStepClickable}
      sticky={true}
      stickyTop="20px"
    />
  )
}
