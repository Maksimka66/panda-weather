import { useI18n } from 'vue-i18n'
import { useConfirm } from '@/composables/useConfirm'
import { useWeatherStore } from '@/store/weatherStore'

export function useFavorite() {
  const weatherStore = useWeatherStore()
  const { confirm } = useConfirm()
  const { t } = useI18n()

  const toggleFavorite = async (id: number) => {
    const result = weatherStore.toggleFavorite(id)

    if (result === 'max_reached') {
      await confirm({
        title: t('modal.maxFavoritesTitle'),
        message: t('modal.maxFavoritesText'),
        alert: true,
        confirmText: t('common.ok')
      })
    }
  }

  return {
    isFavorite: weatherStore.isFavorite,
    toggleFavorite
  }
}
