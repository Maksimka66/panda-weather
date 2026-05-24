import { reactive, ref } from 'vue'
import { useWeatherStore } from '@/store/weatherStore'

export function useCitySearch(onSuccess?: () => void) {
  const weatherStore = useWeatherStore()

  const searchTerm = reactive({
    query: ''
  })

  const isSearching = ref(false)

  const searchCity = async (cityQuery?: string) => {
    const city = (cityQuery ?? searchTerm.query).trim()

    if (!city) {
      return null
    }

    try {
      isSearching.value = true

      const location = await weatherStore.addLocationFromCity(city)

      if (location) {
        searchTerm.query = ''
        onSuccess?.()
      }

      return location
    } catch (error) {
      console.error(error)

      return null
    } finally {
      isSearching.value = false
    }
  }

  return {
    searchTerm,
    isSearching,
    searchCity
  }
}
