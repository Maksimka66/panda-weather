import { fetchCitySuggestionsRaw } from '@/api/geocodingApi'
import type { GeocodingApiItem } from '@/types/api'
import type { AppLocale } from '@/types/locale'
import type { GeocodingCity } from '@/types/weather'

function buildCityLabel(item: GeocodingApiItem, locale: AppLocale) {
  const localizedName = item.local_names?.[locale] ?? item.name
  const region = item.state ? `, ${item.state}` : ''

  return `${localizedName}${region}, ${item.country}`
}

function toQueryValue(item: GeocodingApiItem) {
  return item.state ? `${item.name},${item.state},${item.country}` : `${item.name},${item.country}`
}

export async function searchCities(query: string, locale: AppLocale): Promise<GeocodingCity[]> {
  const trimmed = query.trim()

  if (trimmed.length < 2) {
    return []
  }

  const data = await fetchCitySuggestionsRaw(trimmed, locale)

  if (!data?.length) {
    return []
  }

  return data.map((item) => ({
    name: item.name,
    state: item.state,
    country: item.country,
    label: buildCityLabel(item, locale),
    queryValue: toQueryValue(item)
  }))
}
