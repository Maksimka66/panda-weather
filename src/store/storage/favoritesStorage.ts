import { STORAGE_KEYS } from '@/config/constants'
import type { LocationWeather } from '@/types/weather'

export function loadFavorites(): LocationWeather[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.favorites)

    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw) as LocationWeather[]

    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveFavorites(favorites: LocationWeather[]) {
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites))
}
