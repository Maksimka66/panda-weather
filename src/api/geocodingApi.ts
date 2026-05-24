import type { AppLocale } from '@/types/locale'
import type { GeocodingApiItem } from '@/types/api'
import { httpGet } from './httpClient'
import { OPENWEATHER_API_KEY } from '@/config/constants'

const rootUrl = 'https://api.openweathermap.org'

export async function fetchCitySuggestionsRaw(query: string, lang: AppLocale) {
  const search = new URLSearchParams({
    q: query,
    limit: '5',
    appid: OPENWEATHER_API_KEY,
    lang
  })

  return httpGet<GeocodingApiItem[]>(`${rootUrl}/geo/1.0/direct?${search.toString()}`)
}
