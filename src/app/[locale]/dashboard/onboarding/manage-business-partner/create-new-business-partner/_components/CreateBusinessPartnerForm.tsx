'use client'

import { Col, Row } from 'react-bootstrap'

import { Breadcrumbs } from '@/components/breadcrumbs/breadcrumbs'
import { FormProvider } from '@/components/forms/form-provider/FormProvider'
import { KTIcon } from '@/components/kt-icon/KtIcon'
import { Page } from '@/components/page/page'

import { BusinessPartnerSteps } from './BusinessPartnerSteps'
import { BusinessProfileForm } from './BusinessProfileForm'
import { BusinessSettingsForm } from './BusinessSettingsForm'
import { ProductConfigurationForm } from './ProductConfigurationForm'
import { ReviewForm } from './ReviewForm'
import { useBusinessPartnerForm } from '../_hooks/business-partner.hook'
import { CreateBusinessPartnerFormData } from '../_schemas/business-partner.schema'

export const CreateBusinessPartnerForm = () => {
  const {
    methods,
    currentStep,
    isSubmitting,
    isSuccess,
    visitedSteps,
    validationError,
    createBusinessPartner,
    handleNext,
    handleBack,
    handleStepClick,
  } = useBusinessPartnerForm()

  const breadcrumbItems = [
    {
      name: 'Manage Business Partner',
      path: '/dashboard/onboarding/manage-business-partner',
      type: 'manage',
    },
    {
      name: 'Create a New Business Partner',
      path: '/dashboard/onboarding/manage-business-partner/create-new-business-partner',
      type: 'create',
    },
  ]

  const onSubmit = async (data: CreateBusinessPartnerFormData) => {
    await createBusinessPartner(data)
  }

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
    <Page
      title="Create a New Business Partner"
      description="Setup Business Partner Profile"
      className="pb-5"
    >
      <Breadcrumbs items={breadcrumbItems} />

      <FormProvider methods={methods} onSubmit={onSubmit} name="create-business-partner">
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

                {/* Validation Error Message */}
                {validationError && (
                  <div className="alert alert-danger d-flex align-items-center p-5 mb-8">
                    <KTIcon
                      iconType="duotone"
                      iconName="shield-cross"
                      className="fs-2hx text-danger me-4"
                    />
                    <div className="d-flex flex-column">
                      <h4 className="mb-1 text-danger">Validation Error</h4>
                      <span>{validationError}</span>
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {isSuccess && (
                  <div className="alert alert-success d-flex align-items-center p-5 mb-8">
                    <KTIcon
                      iconType="duotone"
                      iconName="shield-tick"
                      className="fs-2hx text-success me-4"
                    />
                    <div className="d-flex flex-column">
                      <h4 className="mb-1 text-success">Business Partner Created Successfully!</h4>
                      <span>
                        The business partner has been created successfully. You can now view it in
                        the business partners list.
                      </span>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="d-flex justify-content-between mt-8">
                  <div>
                    {currentStep > 1 && (
                      <button type="button" className="btn btn-secondary" onClick={handleBack}>
                        Back
                      </button>
                    )}
                  </div>

                  <div className="d-flex gap-3">
                    {currentStep < 4 ? (
                      <button type="button" className="btn btn-primary" onClick={handleNext}>
                        Continue
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting || isSuccess}
                      >
                        {isSubmitting
                          ? 'Creating...'
                          : isSuccess
                            ? 'Created Successfully'
                            : 'Create Business Partner'}
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
