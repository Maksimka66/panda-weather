<template>
  <div class="container">
    <ul class="weather-list" v-if="forecasts.length">
      <li class="weather-list-item" v-for="locationWeather of forecasts" :key="locationWeather.id">
        <div class="buttons-layout">
          <div>
            <button class="" @click="getForecastForToday">Day</button>
            <button class="" @click="getForecastForWeek">Week</button>
          </div>
          <div class="">
            <AddFavoriteButton :card-id="locationWeather.id" />
            <RemoveButton :card-id="locationWeather.id" :data="forecasts" />
          </div>
        </div>
        <WeatherCard :location-weather="locationWeather" />
      </li>
    </ul>
    <div class="empty-list-layout" v-else>
      <span class="empty-list">There's no forecasts</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import WeatherCard from '../WeatherCard/WeatherCard.vue'
import AddFavoriteButton from '../AddFavoriteButton/AddFavoriteButton.vue'
import RemoveButton from '../RemoveButton/RemoveButton.vue'
import { useWeatherStore } from '@/store/weatherStore'
import { fetchClientIp, getClientLocation } from '@/api/fetchClientIp'
import { fetchForecasts, fetchWeather } from '@/api/api'

const weatherStore = useWeatherStore()

defineProps({
  forecasts: {
    type: Array,
    required: true,
    default: []
  }
})

const getForecastForToday = async () => {
  try {
    weatherStore.setLoadingState(true)

    const { ip } = await fetchClientIp()

    const currentUserLocation = await getClientLocation(ip)

    const currentLocationWeather = await fetchWeather(currentUserLocation.location.city)

    const isSameData = weatherStore.locations.find((item) => item.id === currentLocationWeather.id)

    if (!isSameData) {
      weatherStore.addLocationWeather(currentLocationWeather)
    }
  } catch (e) {
    console.error(e)
  } finally {
    weatherStore.setLoadingState(false)
  }
}

const getForecastForWeek = async () => {
  try {
    weatherStore.setLoadingState(true)

    const resForecasts = await fetchForecasts()

    console.log(resForecasts)
  } catch (e) {
    console.error(e)
  } finally {
    weatherStore.setLoadingState(false)
  }
}
</script>

<style scoped>
.container {
  border-radius: 12px;
}

.weather-list {
  padding: 32px;
  background-color: #ffffff41;
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 10px 30px #0000001a;
  display: flex;
  justify-content: flex-start;
  gap: 16px;
  flex-wrap: wrap;
}

.weather-list-item {
  min-width: 580px;
  border-radius: 20px;
  background-color: #b5b5c7;
  padding: 20px;
}

.buttons-layout {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
}
</style>
