'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Alert, Button, Card, Container, Spinner } from 'react-bootstrap'

import emailSentIllustration from '@/assets/images/general/email-sent-illustration.svg'
import { Link } from '@/navigation'

import useVerifyEmail from './_hooks/verify-email.hook'

const VerifyEmail = () => {
  const t = useTranslations('auth.verifyEmail')
  const { status } = useVerifyEmail()

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <div className="w-100 px-3" style={{ maxWidth: '400px' }}>
        <Card className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-4 text-2xl font-bold text-center">{t('emailVerification')}</h1>

          {status === 'loading' && (
            <div className="text-center mt-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">{t('verifyingEmail')}</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center text-green-600 mt-4">
              <Image alt="email-sent" src={emailSentIllustration} width={120} height={120} />
              <Alert variant="success" className="mb-4 mt-6">
                {t('verificationEmailVerified')}
              </Alert>
              <p className="mt-4 text-sm text-gray-600">{t('redirecting')}</p>
              <Spinner animation="border" variant="primary" />
            </div>
          )}

          {status === 'error' && (
            <div className="text-center text-red-600 mt-4">
              <Alert variant="danger" className="mb-4 mt-6">
                {t('verificationEmailError')}
              </Alert>
              <Link href="/login" className="text-decoration-none">
                <Button variant="outline" className="w-100 mb-4 mt-4">
                  {t('backToLogin')}
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </div>
    </Container>
  )
}

export default VerifyEmail
