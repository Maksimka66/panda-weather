import type { CurrentWeatherDto, LocationWeather } from '@/types/weather'

export function createLocationWeather(
  data: CurrentWeatherDto,
  options?: { isFavourite?: boolean }
): LocationWeather {
  return {
    ...data,
    isFavourite: options?.isFavourite ?? false,
    viewMode: 'day',
    periodMode: 'day',
    nightSnapshot: null,
    hourlyChart: [],
    hourlyNightChart: [],
    dailyChart: [],
    dailyForecasts: [],
    forecastLoaded: false,
    isForecastLoading: false
  }
}

export function cloneLocationWeather(location: LocationWeather): LocationWeather {
  return {
    ...location,
    nightSnapshot: location.nightSnapshot ? { ...location.nightSnapshot } : null,
    hourlyChart: [...location.hourlyChart],
    hourlyNightChart: [...location.hourlyNightChart],
    dailyChart: [...location.dailyChart],
    dailyForecasts: [...location.dailyForecasts]
  }
}
