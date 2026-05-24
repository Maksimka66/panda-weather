import { createI18n } from 'vue-i18n'
import type { AppLocale } from '@/types/locale'
import en from './locales/en'
import uk from './locales/uk'

export const i18n = createI18n({
  legacy: false,
  locale: 'en' satisfies AppLocale,
  fallbackLocale: 'en',
  messages: { en, uk }
})
