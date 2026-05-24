import { fetchCurrentWeatherRaw, fetchForecastRaw } from '@/api/weatherApi'
import type { AppLocale } from '@/types/locale'
import type { CurrentWeatherDto, ForecastChartData } from '@/types/weather'
import { mapCurrentWeather } from '@/utils/mappers/currentWeatherMapper'
import { mapForecastToCharts } from '@/utils/mappers/forecastMapper'

export async function loadCurrentWeather(
  city: string,
  locale: AppLocale
): Promise<CurrentWeatherDto | null> {
  const data = await fetchCurrentWeatherRaw(city, locale)

  if (!data || data.cod !== 200) {
    return null
  }

  return mapCurrentWeather(data, locale)
}

export async function loadForecastCharts(
  city: string,
  locale: AppLocale
): Promise<ForecastChartData | null> {
  const data = await fetchForecastRaw(city, locale)

  if (!data || data.cod !== '200') {
    return null
  }

  return mapForecastToCharts(data, locale)
}
