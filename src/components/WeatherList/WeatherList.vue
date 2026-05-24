<template>
  <div class="container">
    <ul class="weather-list" v-if="forecasts.length">
      <li
        class="weather-list-item"
        v-for="locationWeather of forecasts"
        :key="locationWeather.id"
        :class="{
          'weather-list-item--favorite': favoriteIds.includes(locationWeather.id),
          'weather-list-item--favorites-tab': listKey === 'favorites'
        }"
      >
        <div class="buttons-layout">
          <div class="toggles">
            <div class="view-toggle">
              <button
                class="view-btn"
                :class="{ active: locationWeather.viewMode === 'day' }"
                @click="emit('changeViewMode', locationWeather.id, 'day')"
              >
                {{ t('common.day') }}
              </button>
              <button
                class="view-btn"
                :class="{ active: locationWeather.viewMode === 'week' }"
                @click="emit('changeViewMode', locationWeather.id, 'week')"
              >
                {{ t('common.week') }}
              </button>
            </div>
            <div v-if="locationWeather.viewMode === 'day'" class="view-toggle">
              <button
                class="view-btn"
                :class="{ active: locationWeather.periodMode === 'day' }"
                @click="emit('changePeriodMode', locationWeather.id, 'day')"
              >
                {{ t('common.day') }}
              </button>
              <button
                class="view-btn"
                :class="{ active: locationWeather.periodMode === 'night' }"
                :disabled="!locationWeather.nightSnapshot"
                @click="emit('changePeriodMode', locationWeather.id, 'night')"
              >
                {{ t('common.night') }}
              </button>
            </div>
          </div>
          <div class="action-buttons" v-if="showFavorite || showRemove">
            <AddFavoriteButton v-if="showFavorite" :card-id="locationWeather.id" />
            <RemoveButton
              v-if="showRemove"
              :card-id="locationWeather.id"
              :list-key="listKey"
              :city-label="locationWeather.location"
            />
          </div>
        </div>

        <WeatherCard :location-weather="locationWeather" />

        <div class="chart-section" v-if="locationWeather.isForecastLoading">
          <Loader inline />
        </div>
        <WeatherChart
          v-else-if="getChartData(locationWeather).length"
          :chart-data="getChartData(locationWeather)"
          :view-mode="locationWeather.viewMode"
        />
      </li>
    </ul>
    <div class="empty-list-layout" v-else>
      <span class="empty-list">{{ emptyMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type {
  ChartPoint,
  LocationWeather,
  PeriodMode,
  ViewMode,
  WeatherListKey
} from '@/types/weather'
import WeatherCard from '../WeatherCard/WeatherCard.vue'
import WeatherChart from '../WeatherChart/WeatherChart.vue'
import AddFavoriteButton from '../AddFavoriteButton/AddFavoriteButton.vue'
import RemoveButton from '../RemoveButton/RemoveButton.vue'
import Loader from '../Loader/Loader.vue'

const props = defineProps({
  forecasts: {
    type: Array as () => LocationWeather[],
    required: true,
    default: () => []
  },
  listKey: {
    type: String as () => WeatherListKey,
    default: 'locations'
  },
  favoriteIds: {
    type: Array as () => number[],
    default: () => []
  },
  showFavorite: {
    type: Boolean,
    default: true
  },
  showRemove: {
    type: Boolean,
    default: true
  },
  getChartData: {
    type: Function as unknown as () => (location: LocationWeather) => ChartPoint[],
    required: true
  }
})

const emit = defineEmits<{
  changeViewMode: [id: number, mode: ViewMode]
  changePeriodMode: [id: number, mode: PeriodMode]
}>()

const { t } = useI18n()

const emptyMessage = computed(() =>
  props.listKey === 'favorites' ? t('favorites.empty') : t('home.empty')
)
</script>

<style scoped>
.container {
  border-radius: var(--radius-md);
}

.weather-list {
  padding: 24px;
  background: var(--surface);
  backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  flex-wrap: wrap;
}

.weather-list-item {
  min-width: 0;
  flex: 1 1 100%;
  max-width: 100%;
  padding: 22px;
  border-radius: var(--radius-lg);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.55));
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: var(--shadow-sm);
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base),
    border-color var(--transition-base);
  animation: slideUp 0.45s var(--ease-out) both;
}

.weather-list-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.weather-list-item--favorite,
.weather-list-item--favorites-tab {
  border: 2px solid var(--favorite);
  box-shadow:
    var(--shadow-sm),
    0 0 0 4px var(--favorite-glow);
  animation:
    slideUp 0.45s var(--ease-out) both,
    pulse-soft 2.5s ease-in-out infinite;
}

.weather-list-item--favorite:hover,
.weather-list-item--favorites-tab:hover {
  box-shadow:
    var(--shadow-md),
    0 0 0 6px var(--favorite-glow);
}

@media (min-width: 640px) {
  .weather-list-item {
    flex: 1 1 480px;
  }
}

.buttons-layout {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.toggles {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.view-toggle {
  display: flex;
  gap: 4px;
  padding: 4px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(67, 97, 238, 0.15);
}

.view-btn {
  padding: 8px 18px;
  border-radius: var(--radius-full);
  border: none;
  background-color: transparent;
  color: var(--muted);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast),
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.view-btn:hover:not(.active) {
  color: var(--primary);
  background-color: rgba(67, 97, 238, 0.08);
}

.view-btn.active {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: #fff;
  box-shadow: 0 4px 12px rgba(67, 97, 238, 0.35);
  transform: scale(1.02);
}

.view-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.action-buttons {
  display: flex;
  gap: 10px;
  align-items: center;
}

.chart-section {
  margin-top: 16px;
}

.empty-list-layout {
  padding: 48px 24px;
  text-align: center;
  background: var(--surface);
  backdrop-filter: blur(12px);
  border-radius: var(--radius-lg);
  border: 1px dashed rgba(67, 97, 238, 0.3);
}

.empty-list {
  color: var(--muted);
  font-size: 1.05rem;
  font-weight: 500;
}
</style>
