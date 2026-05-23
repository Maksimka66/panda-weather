<script setup lang="ts">
import WeatherList from '@/components/WeatherList/WeatherList.vue'
import { useWeatherStore } from '@/store/weatherStore'

const weatherStore = useWeatherStore()
</script>

<template>
  <div class="favourites">
    <WeatherList :forecasts="weatherStore.favorites" />
  </div>
</template>
