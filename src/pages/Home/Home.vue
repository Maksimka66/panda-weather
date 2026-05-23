<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import WeatherList from '@/components/WeatherList/WeatherList.vue'
import SearchField from '@/components/SearchField/SearchField.vue'
import WeatherChart from '@/components/WeatherChart/WeatherChart.vue'
import Loader from '@/components/Loader/Loader.vue'
import { useWeatherStore } from '@/store/weatherStore'
import { fetchClientIp, getClientLocation } from '@/api/fetchClientIp'
import { fetchWeather } from '@/api/api'
import AddForecastButton from '@/components/AddForecastButton/AddForecastButton.vue'

const weatherStore = useWeatherStore()

onMounted(async () => {
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
})
</script>

<template>
  <div class="home" v-if="!weatherStore.isLoading">
    <div class="field-layout">
      <SearchField />
      <AddForecastButton />
    </div>
    <WeatherList :forecasts="weatherStore.locations" />
    <WeatherChart />
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<style scoped>
.field-layout {
  width: 100%;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}
</style>
