import type { AppLocale } from '@/types/locale'
import type { OpenWeatherCurrentResponse, OpenWeatherForecastResponse } from '@/types/api'
import { httpGet } from './httpClient'
import { OPENWEATHER_API_KEY } from '@/config/constants'

const rootUrl = 'https://api.openweathermap.org'

function buildUrl(path: string, params: Record<string, string>) {
  const search = new URLSearchParams({
    ...params,
    appid: OPENWEATHER_API_KEY,
    units: 'metric'
  })

  return `${rootUrl}${path}?${search.toString()}`
}

export async function fetchCurrentWeatherRaw(city: string, lang: AppLocale) {
  return httpGet<OpenWeatherCurrentResponse>(buildUrl('/data/2.5/weather', { q: city, lang }))
}

export async function fetchForecastRaw(city: string, lang: AppLocale) {
  return httpGet<OpenWeatherForecastResponse>(buildUrl('/data/2.5/forecast', { q: city, lang }))
}
