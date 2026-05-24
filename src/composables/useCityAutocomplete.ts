import { ref, watch } from 'vue'
import { searchCities } from '@/services/geocodingService'
import type { GeocodingCity } from '@/types/weather'
import { useLocaleStore } from '@/store/localeStore'

export function useCityAutocomplete(getQuery: () => string) {
  const localeStore = useLocaleStore()
  const suggestions = ref<GeocodingCity[]>([])
  const isLoading = ref(false)
  let timer: ReturnType<typeof setTimeout> | undefined
  let requestId = 0

  const clearSuggestions = () => {
    suggestions.value = []
  }

  const fetchSuggestions = async (value: string) => {
    const currentRequest = ++requestId

    if (value.length < 2) {
      suggestions.value = []

      return
    }

    isLoading.value = true

    try {
      const results = await searchCities(value, localeStore.locale)

      if (currentRequest === requestId) {
        suggestions.value = results
      }
    } finally {
      if (currentRequest === requestId) {
        isLoading.value = false
      }
    }
  }

  watch(
    () => [getQuery(), localeStore.locale] as const,
    () => {
      if (timer) {
        clearTimeout(timer)
      }

      timer = setTimeout(() => {
        fetchSuggestions(getQuery().trim())
      }, 400)
    }
  )

  return {
    suggestions,
    isLoading,
    clearSuggestions
  }
}
