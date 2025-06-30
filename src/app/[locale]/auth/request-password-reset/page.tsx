'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Alert, Button, Card, Container } from 'react-bootstrap'

import emailSentIllustration from '@/assets/images/general/email-sent-illustration.svg'
import { ControlledInput } from '@/components/forms/controlled-input/ControlledInput'
import { FormProvider } from '@/components/forms/form-provider'

import useResetPassword from './_hooks/request-password-reset.hook'

export default function ForgotPasswordPage() {
  const t = useTranslations('auth.requestResetPassword')
  const { methods, isSubmitting, isSubmitted, handleSubmit } = useResetPassword()

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <div className="w-100 px-3" style={{ maxWidth: '400px' }}>
        <Card className="h-400">
          <Card.Body className=" d-flex flex-column justify-content-center">
            <div className="text-center mb-4">
              <h2 className="fw-bold mb-3">{t('title')}</h2>
              {!isSubmitted && <p className="text-muted">{t('subtitle')}</p>}
            </div>

            {isSubmitted ? (
              <div className="text-center w-100">
                <Image alt="email-sent" src={emailSentIllustration} width={120} height={120} />
                <Alert variant="success" className="mb-4 mt-6">
                  {t('success')}
                </Alert>
              </div>
            ) : (
              <FormProvider methods={methods} onSubmit={handleSubmit}>
                <ControlledInput
                  label={t('email')}
                  name="email"
                  type="email"
                  placeholder="mail@example.com"
                  containerClass="mb-6"
                  isRequired
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 mb-3 mt-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('sending') : t('sendResetInstructions')}
                </Button>
              </FormProvider>
            )}

            <Link href="/login" className="text-decoration-none">
              <Button variant="outline" className="w-100 mb-3">
                {t('backToLogin')}
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </Container>
  )
}
