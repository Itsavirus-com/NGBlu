import { locales } from '@/navigation'

// Import all translation files
const messages = {
  en: require('../../locales/en.json'),
  nl: require('../../locales/nl.json'),
}

/**
 * Get translation for a key in the current locale
 * @param key - Translation key (e.g., 'common.error.title')
 * @param locale - Locale to use (defaults to 'en')
 * @returns Translated string or the key if not found
 */
export function getTranslation(key: string, locale: string = 'en'): string {
  const validLocale = locales.includes(locale as any) ? locale : 'en'
  const localeMessages = messages[validLocale as keyof typeof messages]

  // Split the key by dots to navigate the object
  const keys = key.split('.')
  let value: any = localeMessages

  // Navigate through the object
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      // If key not found, return the original key
      return key
    }
  }

  // Return the value if it's a string, otherwise return the key
  return typeof value === 'string' ? value : key
}

/**
 * Get current locale from URL or default to 'en'
 * This is a simple implementation - in a real app you might want to get this from context
 */
export function getCurrentLocale(): string {
  if (typeof window === 'undefined') return 'en'

  const pathname = window.location.pathname
  const localeMatch = pathname.match(/^\/([a-z]{2})\//)

  if (localeMatch && locales.includes(localeMatch[1] as any)) {
    return localeMatch[1]
  }

  return 'en'
}
