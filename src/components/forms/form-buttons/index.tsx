import { useTranslations } from 'next-intl'

import { Button } from '@/components/button/button'
import { useRouter } from '@/navigation'
export const FormButtons = ({ isSubmitting }: { isSubmitting: boolean }) => {
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
      />
      <Button type="button" colorClass="danger" onClick={back} label={t('cancel')} icon="cross" />
    </div>
  )
}
