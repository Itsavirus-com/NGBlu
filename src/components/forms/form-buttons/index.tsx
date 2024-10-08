import { useTranslations } from 'next-intl'
import { Button } from 'react-bootstrap'

import { KTIcon } from '@/components/kt-icon/kt-icon'
import { useRouter } from '@/navigation'

export const FormButtons = () => {
  const { back } = useRouter()
  const t = useTranslations('common')

  return (
    <div className="mt-8">
      <Button type="submit" variant="success" className="me-2">
        <KTIcon iconName="check" iconType="solid" />
        {t('submit')}
      </Button>
      <Button type="button" variant="danger" onClick={back}>
        <KTIcon iconName="cross" iconType="solid" />
        {t('cancel')}
      </Button>
    </div>
  )
}
