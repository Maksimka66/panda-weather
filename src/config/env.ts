export const env = {
  openWeatherApiKey: import.meta.env.VITE_OPENWEATHER_API_KEY ?? '',
  geoApiKey: import.meta.env.VITE_GEO_API_KEY ?? ''
} as const
