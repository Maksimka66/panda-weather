import type { OpenWeatherCurrentResponse } from '@/types/api'
import type { AppLocale } from '@/types/locale'
import type { CurrentWeatherDto } from '@/types/weather'
import { toIntlLocale } from '@/utils/intlLocale'

export function mapCurrentWeather(
  data: OpenWeatherCurrentResponse,
  locale: AppLocale
): CurrentWeatherDto {
  const tempValue = Math.round(data.main.temp)
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  return {
    id: data.id,
    cityName: data.name,
    date: new Date().toLocaleDateString(toIntlLocale(locale), dateOptions),
    temperature: `${tempValue} °C`,
    tempValue,
    feelsLike: `${Math.round(data.main.feels_like)} °C`,
    info: data.weather[0]?.main ?? '',
    humidity: data.main.humidity,
    wind: `${(data.wind.speed * 3.6).toFixed(2)} Km/h`,
    location: `${data.name}, ${data.sys.country}`,
    icon: `https://openweathermap.org/img/wn/${data.weather[0]?.icon}@2x.png`
  }
}
