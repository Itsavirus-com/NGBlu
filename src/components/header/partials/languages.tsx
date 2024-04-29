'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

import dutchFlag from '@/assets/images/flags/netherlands.svg'
import usFlag from '@/assets/images/flags/united-states.svg'
import { Link, usePathname } from '@/navigation'

type Language = {
  lang: 'en' | 'nl'
  name: string
  flag: string
}

const languages: Language[] = [
  {
    lang: 'nl',
    name: 'Dutch',
    flag: dutchFlag,
  },
  {
    lang: 'en',
    name: 'English',
    flag: usFlag,
  },
]

const Languages: FC = () => {
  const lang = location.pathname.split('/')[1]
  const currentLanguage = languages.find(x => x.lang === lang) || languages[0]

  const pathname = usePathname()
  const t = useTranslations('common.navbar')

  return (
    <div
      className="menu-item px-5"
      data-kt-menu-trigger="hover"
      data-kt-menu-placement="left-start"
      data-kt-menu-flip="bottom"
    >
      <a href="#" className="menu-link px-5">
        <span className="menu-title position-relative">
          {t('language')}
          <span className="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0">
            {currentLanguage?.name}{' '}
            <Image
              width={15}
              height={15}
              className="w-15px h-15px rounded-1 ms-2"
              src={currentLanguage?.flag}
              alt={currentLanguage?.name}
            />
          </span>
        </span>
      </a>

      <div className="menu-sub menu-sub-dropdown w-175px py-4">
        {languages.map(l => (
          <div className="menu-item px-3" key={l.lang}>
            <Link
              href={pathname}
              locale={l.lang}
              className={clsx('menu-link d-flex px-5', {
                active: l.lang === currentLanguage?.lang,
              })}
            >
              <span className="symbol symbol-20px me-4">
                <Image className="rounded-1" src={l.flag} alt={l.name} />
              </span>
              {l.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export { Languages }
