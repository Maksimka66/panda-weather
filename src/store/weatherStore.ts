import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weatherStore', {
  state: () => ({
    currentLocationWeather: null,
    locations: [],
    favorites: [],
    isLoading: false
  }),
  getters: {
    getFavorites() {
      return this.locations.filter((item) => item.isFavourite)
    },
    getLoadingState() {
      return this.isLoading
    }
  },
  actions: {
    addLocationWeather(data) {
      this.locations.push(data)
    },
    setLoadingState(toogle: boolean) {
      this.isLoading = toogle
    },
    addToFavorites(data) {
      this.favorites.push(data)
    },
    removeWeather(id, forecastName) {
      console.log(forecastName)

      this[forecastName] = this[forecastName].filter((item) => item.id !== id)
    }
  }
})
