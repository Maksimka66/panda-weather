export const MAX_LOCATIONS = 5
export const MAX_FAVORITES = 5

export const STORAGE_KEYS = {
  favorites: 'panda-weather-favorites',
  locale: 'panda-weather-locale'
} as const

export const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

export const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY
