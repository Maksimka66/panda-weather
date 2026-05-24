export interface OpenWeatherCurrentResponse {
  cod: number
  id: number
  name: string
  sys: {
    country: string
  }
  main: {
    temp: number
    feels_like: number
    humidity: number
  }
  weather: Array<{
    main: string
    icon: string
  }>
  wind: {
    speed: number
  }
}

export interface ForecastListItem {
  dt: number
  main: {
    temp: number
    humidity: number
  }
  weather: Array<{
    main: string
    icon: string
  }>
  wind: {
    speed: number
  }
}

export interface OpenWeatherForecastResponse {
  cod: string
  list: ForecastListItem[]
  city: {
    name: string
    timezone: number
  }
}

export interface IpifyResponse {
  ip: string
}

export interface GeoIpifyResponse {
  location: {
    city: string
  }
}

export interface GeocodingApiItem {
  name: string
  local_names?: Record<string, string>
  state?: string
  country: string
  lat: number
  lon: number
}
