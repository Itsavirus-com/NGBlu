import { useTranslations } from 'next-intl'

type Step = {
  number: number
  title: string
  description: string
  icon: string
}

export const useBusinessPartnerSteps = (currentStep: number) => {
  const t = useTranslations('dataManagement.createBusinessPartner.steps')

  const steps: Step[] = [
    {
      number: 1,
      title: t('businessProfile'),
      description: t('businessProfileDesc'),
      icon: 'profile-user',
    },
    {
      number: 2,
      title: t('productConfiguration'),
      description: t('productConfigurationDesc'),
      icon: 'setting',
    },
    {
      number: 3,
      title: t('businessSettings'),
      description: t('businessSettingsDesc'),
      icon: 'financial-schedule',
    },
    {
      number: 4,
      title: t('review'),
      description: t('reviewDesc'),
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

  return {
    steps,
    getStepStatusClass,
    isStepClickable,
  }
}
