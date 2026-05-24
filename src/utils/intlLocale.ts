import type { AppLocale } from '@/types/locale'

export function toIntlLocale(locale: AppLocale) {
  return locale === 'uk' ? 'uk-UA' : 'en-US'
}
