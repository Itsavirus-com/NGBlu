import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { Row } from 'react-bootstrap'

import { Page } from '@/components/page/page'
import { dateTimeFormats } from '@/components/view/date-time-view/date-time-view.type'
import { TextView } from '@/components/view/text-view/text-view'
import { safeRender } from '@/utils/safeRender'

interface UserInfoProps {
  data: any
  isLoading: boolean
}

export const UserInfo = ({ data, isLoading }: UserInfoProps) => {
  const t = useTranslations('dataManagement.businessPartners.users')

  const fields = [
    { label: t('displayName'), value: safeRender(data, 'user.displayName') },
    { label: t('email'), value: safeRender(data, 'user.email') },
    {
      label: t('lastLogin'),
      value: data?.user.lastLogin
        ? dayjs(data.user.lastLogin).format(dateTimeFormats.default)
        : '-',
    },
    { label: t('blocked'), value: safeRender(data, 'user.blockedAt') ? t('yes') : t('no') },
  ]

  return (
    <Page className="pt-5">
      <Row>
        {fields.map(({ label, value }, index) => (
          <TextView
            key={index}
            className="my-3"
            isLoading={isLoading}
            label={label}
            value={value}
          />
        ))}
      </Row>
    </Page>
  )
}
