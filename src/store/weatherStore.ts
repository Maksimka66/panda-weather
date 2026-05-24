import { defineStore } from 'pinia'
import { MAX_FAVORITES, MAX_LOCATIONS } from '@/config/constants'
import { loadCurrentWeather, loadForecastCharts } from '@/services/weatherService'
import { resolveCityByIp } from '@/services/geoService'
import type {
  ForecastChartData,
  LocationWeather,
  PeriodMode,
  ViewMode,
  WeatherListKey
} from '@/types/weather'
import { cloneLocationWeather, createLocationWeather } from '@/utils/locationWeather'
import { useLocaleStore } from './localeStore'
import { loadFavorites, saveFavorites } from './storage/favoritesStorage'

type ToggleFavoriteResult = 'added' | 'removed' | 'max_reached' | 'not_found'

export const useWeatherStore = defineStore('weatherStore', {
  state: () => ({
    locations: [] as LocationWeather[],
    favorites: loadFavorites() as LocationWeather[],
    isLoading: false
  }),

  getters: {
    canAddLocation: (state) => state.locations.length < MAX_LOCATIONS,
    canAddFavorite: (state) => state.favorites.length < MAX_FAVORITES,
    favoriteIds: (state) => state.favorites.map((item) => item.id),
    isFavorite: (state) => (id: number) => state.favorites.some((item) => item.id === id),
    getChartDataFor: () => (location: LocationWeather) => {
      if (location.viewMode === 'week') {
        return location.dailyChart
      }

      return location.periodMode === 'night' ? location.hourlyNightChart : location.hourlyChart
    }
  },

  actions: {
    getApiLang() {
      return useLocaleStore().apiLang
    },

    setLoadingState(toggle: boolean) {
      this.isLoading = toggle
    },

    findLocationById(id: number) {
      return this.locations.find((item) => item.id === id) ?? this.favorites.find((item) => item.id === id)
    },

    applyForecastToAllById(id: number, forecast: ForecastChartData) {
      for (const listName of ['locations', 'favorites'] as const) {
        const location = this[listName].find((item) => item.id === id)

        if (!location) {
          continue
        }

        location.hourlyChart = forecast.hourlyChart
        location.hourlyNightChart = forecast.hourlyNightChart
        location.dailyChart = forecast.dailyChart
        location.dailyForecasts = forecast.dailyForecasts
        location.nightSnapshot = forecast.nightSnapshot
        location.forecastLoaded = true
      }

      this.persistFavorites()
    },

    applyCurrentWeatherToAllById(id: number, data: LocationWeather) {
      const fields = {
        date: data.date,
        temperature: data.temperature,
        tempValue: data.tempValue,
        feelsLike: data.feelsLike,
        info: data.info,
        humidity: data.humidity,
        wind: data.wind,
        icon: data.icon,
        location: data.location,
        cityName: data.cityName
      } as const

      for (const listName of ['locations', 'favorites'] as const) {
        const location = this[listName].find((item) => item.id === id)

        if (location) {
          Object.assign(location, fields)
        }
      }
    },

    persistFavorites() {
      saveFavorites(this.favorites)
    },

    setForecastLoadingForId(id: number, isLoading: boolean) {
      for (const listName of ['locations', 'favorites'] as const) {
        const item = this[listName].find((location) => location.id === id)

        if (item) {
          item.isForecastLoading = isLoading
        }
      }
    },

    async enrichLocationWithForecast(location: LocationWeather, force = false) {
      if (!force && (location.forecastLoaded || location.isForecastLoading)) {
        return
      }

      this.setForecastLoadingForId(location.id, true)

      try {
        const forecast = await loadForecastCharts(location.cityName, this.getApiLang())

        if (!forecast) {
          return
        }

        this.applyForecastToAllById(location.id, forecast)
      } finally {
        this.setForecastLoadingForId(location.id, false)
      }
    },

    async refreshLocationWeather(location: LocationWeather) {
      const weatherData = await loadCurrentWeather(location.cityName, this.getApiLang())

      if (!weatherData) {
        return
      }

      const refreshed = createLocationWeather(weatherData, {
        isFavourite: location.isFavourite
      })

      refreshed.viewMode = location.viewMode
      refreshed.periodMode = location.periodMode

      this.applyCurrentWeatherToAllById(location.id, refreshed)
      await this.enrichLocationWithForecast(location, true)
    },

    async reloadAllWeather() {
      const unique = new Map<number, LocationWeather>()

      for (const location of [...this.locations, ...this.favorites]) {
        unique.set(location.id, location)
      }

      await Promise.all([...unique.values()].map((location) => this.refreshLocationWeather(location)))
    },

    async addLocationFromCity(city: string, listName: WeatherListKey = 'locations') {
      if (listName === 'locations' && !this.canAddLocation) {
        return null
      }

      const weatherData = await loadCurrentWeather(city, this.getApiLang())

      if (!weatherData) {
        return null
      }

      const exists = this[listName].find((item) => item.id === weatherData.id)

      if (exists) {
        await this.enrichLocationWithForecast(exists)

        return exists
      }

      const location = createLocationWeather(weatherData, {
        isFavourite: this.isFavorite(weatherData.id)
      })

      this[listName].push(location)
      await this.enrichLocationWithForecast(location)

      return location
    },

    async initDefaultLocation() {
      this.hydrateFavoriteFlags()

      if (this.locations.length > 0) {
        return
      }

      const city = await resolveCityByIp()

      if (!city) {
        return
      }

      await this.addLocationFromCity(city)
    },

    syncLocationField<T extends keyof LocationWeather>(
      id: number,
      field: T,
      value: LocationWeather[T]
    ) {
      for (const listName of ['locations', 'favorites'] as const) {
        const location = this[listName].find((item) => item.id === id)

        if (location) {
          location[field] = value
        }
      }
    },

    async setViewMode(id: number, mode: ViewMode, listName: WeatherListKey) {
      const location = this[listName].find((item) => item.id === id)

      if (!location) {
        return
      }

      this.syncLocationField(id, 'viewMode', mode)
      await this.enrichLocationWithForecast(location)
    },

    setPeriodMode(id: number, mode: PeriodMode) {
      this.syncLocationField(id, 'periodMode', mode)
    },

    toggleFavorite(id: number): ToggleFavoriteResult {
      const location = this.locations.find((item) => item.id === id)

      if (!location) {
        return 'not_found'
      }

      const favoriteIndex = this.favorites.findIndex((item) => item.id === id)

      if (favoriteIndex >= 0) {
        this.favorites.splice(favoriteIndex, 1)
        location.isFavourite = false
        this.persistFavorites()

        return 'removed'
      }

      if (!this.canAddFavorite) {
        return 'max_reached'
      }

      this.favorites.push(
        cloneLocationWeather({
          ...location,
          isFavourite: true
        })
      )
      location.isFavourite = true
      this.persistFavorites()

      return 'added'
    },

    hydrateFavoriteFlags() {
      for (const location of this.locations) {
        location.isFavourite = this.isFavorite(location.id)
      }
    },

    removeLocation(id: number, listName: WeatherListKey) {
      this[listName] = this[listName].filter((item) => item.id !== id)

      if (listName === 'favorites') {
        const homeLocation = this.locations.find((item) => item.id === id)

        if (homeLocation) {
          homeLocation.isFavourite = false
        }

        this.persistFavorites()
      }
    }
  }
})
