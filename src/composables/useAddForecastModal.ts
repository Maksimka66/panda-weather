import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useConfirm } from '@/composables/useConfirm'
import { useWeatherStore } from '@/store/weatherStore'

export function useAddForecastModal() {
  const weatherStore = useWeatherStore()
  const { confirm } = useConfirm()
  const { t } = useI18n()
  const isModalOpen = ref(false)

  const openModal = async () => {
    if (!weatherStore.canAddLocation) {
      await confirm({
        title: t('modal.maxLocationsTitle'),
        message: t('modal.maxLocationsText'),
        alert: true,
        confirmText: t('common.ok')
      })

      return
    }

    isModalOpen.value = true
  }

  const closeModal = () => {
    isModalOpen.value = false
  }

  return {
    isModalOpen,
    openModal,
    closeModal
  }
}
