'use client'

import { useTranslations } from 'next-intl'
import { Col, Row } from 'react-bootstrap'

import { FormProvider } from '@/components/forms/form-provider/FormProvider'
import { KTIcon } from '@/components/kt-icon/KtIcon'
import { Page } from '@/components/page/page'

import { BusinessPartnerSteps } from './BusinessPartnerSteps'
import { BusinessProfileForm } from './BusinessProfileForm'
import { BusinessSettingsForm } from './BusinessSettingsForm'
import { ProductConfigurationForm } from './ProductConfigurationForm'
import { ReviewForm } from './ReviewForm'
import { useCreateBusinessPartnerForm } from '../_hooks/create-business-partner.hook'

export const CreateBusinessPartnerForm = () => {
  const t = useTranslations('dataManagement.createBusinessPartner')
  const tCommon = useTranslations('common')
  const {
    methods,
    currentStep,
    validationError,
    handleNext,
    handleBack,
    handleStepClick,
    onSubmit,
    getSubmitButtonText,
    isSubmitButtonDisabled,
  } = useCreateBusinessPartnerForm()

  const renderCurrentStepForm = () => {
    switch (currentStep) {
      case 1:
        return <BusinessProfileForm />
      case 2:
        return <ProductConfigurationForm />
      case 3:
        return <BusinessSettingsForm />
      case 4:
        return <ReviewForm />
      default:
        return <BusinessProfileForm />
    }
  }

  return (
    <Page title={t('title')} description={t('description')} className="pb-5">
      <FormProvider methods={methods} onSubmit={() => {}} name="create-business-partner">
        <Row>
          {/* Left Sidebar - Steps */}
          <Col md={3}>
            <BusinessPartnerSteps currentStep={currentStep} onStepClick={handleStepClick} />
          </Col>

          {/* Main Content */}
          <Col md={9}>
            <div className="card">
              <div className="card-body p-8">
                {renderCurrentStepForm()}

                {/* Validation Error Message - Only shown for form validation issues */}
                {validationError && (
                  <div className="alert alert-danger d-flex align-items-center p-5 mb-8">
                    <KTIcon
                      iconType="duotone"
                      iconName="shield-cross"
                      className="fs-2hx text-danger me-4"
                    />
                    <div className="d-flex flex-column">
                      <h4 className="mb-1 text-danger">{tCommon('validationError')}</h4>
                      <span>{validationError}</span>
                    </div>
                  </div>
                )}

                {/* Success Message - Now handled by toast */}

                {/* Navigation Buttons */}
                <div className="d-flex justify-content-between mt-8">
                  <div>
                    {currentStep > 1 && (
                      <button type="button" className="btn btn-secondary" onClick={handleBack}>
                        {tCommon('back')}
                      </button>
                    )}
                  </div>

                  <div className="d-flex gap-3">
                    {currentStep < 4 ? (
                      <button type="button" className="btn btn-primary" onClick={handleNext}>
                        {tCommon('continue')}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary"
                        disabled={isSubmitButtonDisabled()}
                        onClick={() => onSubmit(methods.getValues())}
                      >
                        {getSubmitButtonText()}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </FormProvider>
    </Page>
  )
}
