import { onMounted } from 'vue'
import { useWeatherStore } from '@/store/weatherStore'

export function useInitialLocation() {
  const weatherStore = useWeatherStore()

  onMounted(async () => {
    try {
      weatherStore.setLoadingState(true)
      await weatherStore.initDefaultLocation()
    } catch (error) {
      console.error(error)
    } finally {
      weatherStore.setLoadingState(false)
    }
  })
}
