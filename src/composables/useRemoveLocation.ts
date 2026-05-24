import { useI18n } from 'vue-i18n'
import type { WeatherListKey } from '@/types/weather'
import { useConfirm } from '@/composables/useConfirm'
import { useWeatherStore } from '@/store/weatherStore'

export function useRemoveLocation(listKey: WeatherListKey) {
  const weatherStore = useWeatherStore()
  const { confirm } = useConfirm()
  const { t } = useI18n()

  const removeWithConfirm = async (id: number, cityLabel?: string) => {
    const isConfirmed = await confirm({
      title: t('modal.removeTitle'),
      message: cityLabel
        ? t('modal.removeText', { city: cityLabel })
        : t('modal.removeTextGeneric')
    })

    if (!isConfirmed) {
      return
    }

    weatherStore.removeLocation(id, listKey)
  }

  return { removeWithConfirm }
}
