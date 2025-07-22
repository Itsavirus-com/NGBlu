'use client'

import { useTranslations } from 'next-intl'
import { Card, Col, Row } from 'react-bootstrap'

import { FormProvider } from '@/components/forms/form-provider/FormProvider'
import { Page } from '@/components/page/page'
import { Stepper, StepperStep } from '@/components/stepper'

import { ContactDetailsStep } from './_components/steps/ContactDetailsStep'
import { GeneralInfoStep } from './_components/steps/GeneralInfoStep'
import { LogoUploadStep } from './_components/steps/LogoUploadStep'
import { useProfileCompletion } from './_hooks/profile-completion.hook'

export default function ProfileCompletionPage() {
  const t = useTranslations('profileCompletion.page')
  const { form, currentStep, isStepCompleted, nextStep, previousStep, goToStep, onSubmit } =
    useProfileCompletion()

  const renderStep = () => {
    const stepProps = {
      onNext: nextStep,
      onPrevious: previousStep,
      isFirst: currentStep === 0,
      isLast: currentStep === 2, // Updated: now step 2 is the last step
      isValid: true, // Validation is handled in the hook
    }

    switch (currentStep) {
      case 0:
        return <GeneralInfoStep {...stepProps} />
      case 1:
        return <ContactDetailsStep {...stepProps} />
      case 2:
        return <LogoUploadStep {...stepProps} />
      default:
        return <GeneralInfoStep {...stepProps} />
    }
  }

  // Create steps data for the stepper
  const steps: StepperStep[] = [
    {
      number: 1,
      title: t('steps.generalInfo.title'),
      description: t('steps.generalInfo.description'),
      status: isStepCompleted(0) ? 'completed' : currentStep === 0 ? 'current' : 'pending',
    },
    {
      number: 2,
      title: t('steps.contactDetails.title'),
      description: t('steps.contactDetails.description'),
      status: isStepCompleted(1) ? 'completed' : currentStep === 1 ? 'current' : 'pending',
    },
    {
      number: 3,
      title: t('steps.logoUpload.title'),
      description: t('steps.logoUpload.description'),
      status: isStepCompleted(2) ? 'completed' : currentStep === 2 ? 'current' : 'pending',
    },
  ]

  const handleStepClick = (stepNumber: number) => {
    // Convert 1-based step number to 0-based index
    const stepIndex = stepNumber - 1

    // Navigate to the clicked step
    goToStep(stepIndex)
  }

  const isStepClickable = (stepNumber: number): boolean => {
    const stepIndex = stepNumber - 1
    // Allow clicking on completed steps, current step, and next step
    // goToStep will handle validation for forward navigation
    return stepIndex <= currentStep + 1 && stepIndex >= 0
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Page title={t('title')} description={t('description')}>
        <FormProvider methods={form} onSubmit={onSubmit}>
          <Row className="g-5">
            {/* Stepper Sidebar */}
            <Col md={3}>
              <Stepper
                steps={steps}
                currentStep={currentStep + 1} // Convert 0-based to 1-based
                onStepClick={handleStepClick}
                isStepClickable={isStepClickable}
                sticky={true}
                stickyTop="20px"
              />
            </Col>

            {/* Main Content */}
            <Col md={9}>
              <Card>
                <Card.Body className="p-9">{renderStep()}</Card.Body>
              </Card>
            </Col>
          </Row>
        </FormProvider>
      </Page>
    </div>
  )
}
