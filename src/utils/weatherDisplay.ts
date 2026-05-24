import type { LocationWeather, WeatherSnapshot } from '@/types/weather'

export function getActiveWeatherSnapshot(location: LocationWeather): WeatherSnapshot {
  if (location.periodMode === 'night' && location.nightSnapshot) {
    return location.nightSnapshot
  }

  return {
    temperature: location.temperature,
    tempValue: location.tempValue,
    feelsLike: location.feelsLike,
    info: location.info,
    humidity: location.humidity,
    wind: location.wind,
    icon: location.icon
  }
}
