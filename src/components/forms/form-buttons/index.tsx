import { useTranslations } from 'next-intl'

import { Button } from '@/components/button/button'
import { useRouter } from '@/navigation'

interface FormButtonsProps {
  isSubmitting: boolean
  submitText?: string
  onSubmitClick?: () => void
}

export const FormButtons = ({ isSubmitting, submitText, onSubmitClick }: FormButtonsProps) => {
  const { back } = useRouter()
  const t = useTranslations('common')

  return (
    <div className="mt-8 d-flex gap-2">
      <Button
        type="submit"
        colorClass="success"
        className="me-2"
        loading={isSubmitting}
        label={t('submit')}
        icon="check"
        disabled={isSubmitting}
        onClick={onSubmitClick}
      />
      <Button type="button" colorClass="danger" onClick={back} label={t('cancel')} icon="cross" />
    </div>
  )
}
