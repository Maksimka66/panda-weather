import type { PeriodMode, ViewMode, WeatherListKey } from '@/types/weather'
import { useWeatherStore } from '@/store/weatherStore'

export function useForecastView(listKey: WeatherListKey) {
  const weatherStore = useWeatherStore()

  const setViewMode = async (id: number, mode: ViewMode) => {
    await weatherStore.setViewMode(id, mode, listKey)
  }

  const setPeriodMode = (id: number, mode: PeriodMode) => {
    weatherStore.setPeriodMode(id, mode)
  }

  return {
    setViewMode,
    setPeriodMode,
    getChartData: weatherStore.getChartDataFor
  }
}
