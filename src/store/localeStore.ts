import { defineStore } from 'pinia'
import { i18n } from '@/i18n'
import { STORAGE_KEYS } from '@/config/constants'
import type { AppLocale } from '@/types/locale'
import { useWeatherStore } from './weatherStore'

function readLocale(): AppLocale {
  const saved = localStorage.getItem(STORAGE_KEYS.locale)

  return saved === 'uk' ? 'uk' : 'en'
}

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: readLocale() as AppLocale
  }),

  getters: {
    apiLang: (state) => state.locale
  },

  actions: {
    init() {
      i18n.global.locale.value = this.locale
    },

    async setLocale(locale: AppLocale) {
      if (this.locale === locale) {
        return
      }

      this.locale = locale
      i18n.global.locale.value = locale
      localStorage.setItem(STORAGE_KEYS.locale, locale)

      await useWeatherStore().reloadAllWeather()
    }
  }
})
