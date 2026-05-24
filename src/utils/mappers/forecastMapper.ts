import type { OpenWeatherForecastResponse } from '@/types/api'
import type { AppLocale } from '@/types/locale'
import type { ChartPoint, DailyForecast, ForecastChartData, WeatherSnapshot } from '@/types/weather'
import { toIntlLocale } from '@/utils/intlLocale'

function getLocalDateKey(dt: number, timezone: number) {
  const date = new Date((dt + timezone) * 1000)

  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

function getLocalHour(dt: number, timezone: number) {
  return new Date((dt + timezone) * 1000).getHours()
}

function isNightHour(hour: number) {
  return hour >= 21 || hour < 6
}

function formatTimeLabel(dt: number, timezone: number, locale: AppLocale) {
  const date = new Date((dt + timezone) * 1000)

  return date.toLocaleTimeString(toIntlLocale(locale), {
    hour: '2-digit',
    minute: '2-digit'
  })
}

function formatDayLabel(dt: number, timezone: number, locale: AppLocale) {
  const date = new Date((dt + timezone) * 1000)

  return date.toLocaleDateString(toIntlLocale(locale), { weekday: 'short' })
}

function formatFullDate(dt: number, timezone: number, locale: AppLocale) {
  const date = new Date((dt + timezone) * 1000)

  return date.toLocaleDateString(toIntlLocale(locale), {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  })
}

function mapItemToSnapshot(item: OpenWeatherForecastResponse['list'][number]): WeatherSnapshot {
  const tempValue = Math.round(item.main.temp)

  return {
    temperature: `${tempValue} °C`,
    tempValue,
    feelsLike: `${tempValue} °C`,
    info: item.weather[0]?.main ?? '',
    humidity: item.main.humidity,
    wind: `${(item.wind.speed * 3.6).toFixed(2)} Km/h`,
    icon: `https://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`
  }
}

function buildNightSnapshot(items: OpenWeatherForecastResponse['list']): WeatherSnapshot | null {
  if (!items.length) {
    return null
  }

  const temps = items.map((item) => item.main.temp)

  const avgTemp = Math.round(temps.reduce((sum, temp) => sum + temp, 0) / temps.length)

  const midItem = items[Math.floor(items.length / 2)]

  if (!midItem) {
    return null
  }

  const base = mapItemToSnapshot(midItem)

  return {
    ...base,
    tempValue: avgTemp,
    temperature: `${avgTemp} °C`,
    feelsLike: `${avgTemp} °C`
  }
}

export function mapForecastToCharts(
  forecastData: OpenWeatherForecastResponse,
  locale: AppLocale
): ForecastChartData {
  const { list, city } = forecastData

  const timezone = city.timezone

  const todayKey = getLocalDateKey(Math.floor(Date.now() / 1000), timezone)

  const hourlyChart: ChartPoint[] = []
  const hourlyNightChart: ChartPoint[] = []
  const todayNightItems: OpenWeatherForecastResponse['list'] = []

  for (const item of list) {
    if (getLocalDateKey(item.dt, timezone) !== todayKey) {
      continue
    }

    const hour = getLocalHour(item.dt, timezone)
    const label = formatTimeLabel(item.dt, timezone, locale)
    const point = { label, temp: Math.round(item.main.temp) }

    if (isNightHour(hour)) {
      hourlyNightChart.push(point)
      todayNightItems.push(item)
    } else {
      hourlyChart.push(point)
    }
  }

  const dayMap = new Map<
    string,
    {
      temps: number[]
      items: OpenWeatherForecastResponse['list']
    }
  >()

  for (const item of list) {
    const key = getLocalDateKey(item.dt, timezone)

    if (!dayMap.has(key)) {
      dayMap.set(key, {
        temps: [],
        items: []
      })
    }

    const entry = dayMap.get(key)!

    entry.temps.push(item.main.temp)
    entry.items.push(item)
  }

  const dailyChart: ChartPoint[] = []
  const dailyForecasts: DailyForecast[] = []
  const sortedKeys = [...dayMap.keys()].sort().slice(0, 5)

  for (const key of sortedKeys) {
    const entry = dayMap.get(key)

    if (!entry) {
      continue
    }

    const avgTemp = Math.round(
      entry.temps.reduce((sum, temp) => sum + temp, 0) / entry.temps.length
    )
    const midItem = entry.items[Math.floor(entry.items.length / 2)]

    if (!midItem) {
      continue
    }

    dailyChart.push({
      label: formatDayLabel(midItem.dt, timezone, locale),
      temp: avgTemp
    })

    dailyForecasts.push({
      date: formatFullDate(midItem.dt, timezone, locale),
      tempAvg: avgTemp,
      tempDisplay: `${avgTemp} °C`,
      info: midItem.weather[0]?.main ?? '',
      icon: `https://openweathermap.org/img/wn/${midItem.weather[0]?.icon}@2x.png`,
      humidity: midItem.main.humidity,
      wind: `${(midItem.wind.speed * 3.6).toFixed(2)} Km/h`
    })
  }

  return {
    hourlyChart,
    hourlyNightChart,
    dailyChart,
    dailyForecasts,
    nightSnapshot: buildNightSnapshot(todayNightItems)
  }
}
