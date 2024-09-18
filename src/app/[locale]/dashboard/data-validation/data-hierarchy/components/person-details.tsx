import { useTranslations } from 'next-intl'

import { PersonDetailsProps } from './person-details.type'
import { TextWithLabel } from './text-with-label'

export const PersonDetails = ({ person }: PersonDetailsProps) => {
  const t = useTranslations('dataValidation.dataHierarchy.contact')

  return (
    <>
      <TextWithLabel label={t('firstName')} value={person.firstname} className="mt-5" />
      <TextWithLabel label={t('lastName')} value={person.lastname} />
      <TextWithLabel label={t('nameSuffix')} value={person.nameSuffix} />
      <TextWithLabel label={t('namePrefix')} value={person.namePrefix} />
      <TextWithLabel label={t('titles')} value={person.titles} />
      <TextWithLabel label={t('gender')} value={person.gender.gender} />
      <TextWithLabel label={t('department')} value={person.department} />
      <TextWithLabel label={t('personType')} value={person.personType?.type} />
    </>
  )
}
