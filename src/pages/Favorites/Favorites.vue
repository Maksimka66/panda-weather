<script setup lang="ts">
import WeatherList from '@/components/WeatherList/WeatherList.vue'
import { useForecastView } from '@/composables/useForecastView'
import { useWeatherStore } from '@/store/weatherStore'

const weatherStore = useWeatherStore()
const { setViewMode, setPeriodMode, getChartData } = useForecastView('favorites')
</script>

<template>
  <div class="favourites">
    <header class="favourites-header">
      <h1 class="favourites-title">{{ $t('favorites.title') }}</h1>
      <p class="favourites-subtitle">{{ $t('favorites.subtitle') }}</p>
    </header>
    <WeatherList
      :forecasts="weatherStore.favorites"
      list-key="favorites"
      :favorite-ids="weatherStore.favoriteIds"
      :show-favorite="false"
      :show-remove="true"
      :get-chart-data="getChartData"
      @change-view-mode="setViewMode"
      @change-period-mode="setPeriodMode"
    />
  </div>
</template>

<style scoped>
.favourites {
  animation: fadeIn 0.4s var(--ease-out);
}

.favourites-header {
  margin-bottom: 20px;
  text-align: center;
}

.favourites-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 6px;
  background: linear-gradient(135deg, var(--favorite), var(--accent));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.favourites-subtitle {
  font-size: 0.95rem;
  color: var(--muted);
}
</style>
