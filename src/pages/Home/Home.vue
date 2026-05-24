<script setup lang="ts">
import WeatherList from '@/components/WeatherList/WeatherList.vue'
import Loader from '@/components/Loader/Loader.vue'
import AddForecastButton from '@/components/AddForecastButton/AddForecastButton.vue'
import { useInitialLocation } from '@/composables/useInitialLocation'
import { useForecastView } from '@/composables/useForecastView'
import { useWeatherStore } from '@/store/weatherStore'

const weatherStore = useWeatherStore()
const { setViewMode, setPeriodMode, getChartData } = useForecastView('locations')

useInitialLocation()
</script>

<template>
  <div class="home" v-if="!weatherStore.isLoading">
    <div class="field-layout">
      <AddForecastButton />
    </div>
    <WeatherList
      :forecasts="weatherStore.locations"
      list-key="locations"
      :favorite-ids="weatherStore.favoriteIds"
      :get-chart-data="getChartData"
      @change-view-mode="setViewMode"
      @change-period-mode="setPeriodMode"
    />
  </div>
  <div class="home-loading" v-else>
    <Loader />
  </div>
</template>

<style scoped>
.home {
  animation: fadeIn 0.4s var(--ease-out);
}

.field-layout {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}

.home-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;
}
</style>
