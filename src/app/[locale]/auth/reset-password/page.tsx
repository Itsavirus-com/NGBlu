'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'

import emailSentIllustration from '@/assets/images/general/email-sent-illustration.svg'

import useResetPassword from './_hooks/reset-password.hook'

export default function ForgotPasswordPage() {
  const t = useTranslations('auth.resetPassword')
  const { email, isSubmitting, isSubmitted, error, handleSubmit, setEmail } = useResetPassword()

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <div className="w-100 px-3" style={{ maxWidth: '400px' }}>
        <Card className="h-400">
          <Card.Body className="p-4 d-flex flex-column align-items-center justify-content-center">
            <div className="text-center mb-4">
              <h2 className="fw-bold mb-3">{t('title')}</h2>
              {!isSubmitted && <p className="text-muted">{t('subtitle')}</p>}
            </div>

            {error && (
              <Alert variant="danger" className="mb-4 w-100">
                {error}
              </Alert>
            )}

            {isSubmitted ? (
              <div className="text-center w-100">
                <Image alt="email-sent" src={emailSentIllustration} width={120} height={120} />
                <Alert variant="success" className="mb-4 mt-6">
                  {t('success')}
                </Alert>
              </div>
            ) : (
              <Form onSubmit={handleSubmit} className="w-100">
                <Form.Group className="mb-4" controlId="email">
                  <Form.Label>{t('email')}</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={isSubmitting}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 mb-3 mt-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('sending') : t('sendResetInstructions')}
                </Button>
              </Form>
            )}

            <Button variant="outline" className="w-100 mb-3">
              <Link href="/login" className="text-decoration-none">
                {t('backToLogin')}
              </Link>
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Container>
  )
}
