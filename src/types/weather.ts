export type ViewMode = 'day' | 'week'
export type PeriodMode = 'day' | 'night'

export type WeatherListKey = 'locations' | 'favorites'

export interface ChartPoint {
  label: string
  temp: number
}

export interface WeatherSnapshot {
  temperature: string
  tempValue: number
  feelsLike: string
  info: string
  humidity: number
  wind: string
  icon: string
}

export interface DailyForecast {
  date: string
  tempAvg: number
  tempDisplay: string
  info: string
  icon: string
  humidity: number
  wind: string
}

export interface ForecastChartData {
  hourlyChart: ChartPoint[]
  hourlyNightChart: ChartPoint[]
  dailyChart: ChartPoint[]
  dailyForecasts: DailyForecast[]
  nightSnapshot: WeatherSnapshot | null
}

export interface CurrentWeatherDto {
  id: number
  cityName: string
  location: string
  date: string
  temperature: string
  tempValue: number
  feelsLike: string
  info: string
  humidity: number
  wind: string
  icon: string
}

export interface LocationWeather extends CurrentWeatherDto {
  isFavourite: boolean
  viewMode: ViewMode
  periodMode: PeriodMode
  nightSnapshot: WeatherSnapshot | null
  hourlyChart: ChartPoint[]
  hourlyNightChart: ChartPoint[]
  dailyChart: ChartPoint[]
  dailyForecasts: DailyForecast[]
  forecastLoaded: boolean
  isForecastLoading: boolean
}

export interface GeocodingCity {
  name: string
  state?: string
  country: string
  label: string
  queryValue: string
}
