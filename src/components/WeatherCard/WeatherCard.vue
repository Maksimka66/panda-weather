<template>
  <div class="weather-display" :class="{ 'weather-display--night': locationWeather.periodMode === 'night' }">
    <template v-if="locationWeather.viewMode === 'week' && locationWeather.dailyForecasts.length">
      <ul class="week-list">
        <li
          v-for="day in locationWeather.dailyForecasts"
          :key="day.date"
          class="week-day"
        >
          <div class="week-day-main">
            <span class="week-date">{{ day.date }}</span>
            <span class="week-temp">{{ day.tempDisplay }}</span>
            <span class="week-info">{{ day.info }}</span>
          </div>
          <img :src="day.icon" alt="Weather icon" class="week-icon" />
        </li>
      </ul>
    </template>

    <template v-else>
      <div class="weather-current">
        <div class="weather-main">
          <span class="location">{{ locationWeather.location }}</span>
          <span class="date">{{ locationWeather.date }}</span>
          <span class="temperature">{{ display.temperature }}</span>
          <span class="conditions">{{ display.info }}</span>
        </div>
        <div class="icon-layout">
          <img :src="display.icon" alt="Weather icon" class="weather-icon" />
        </div>
      </div>

      <ul class="details-list">
        <li class="detail">
          <TemperatureIcon />
          <div class="detail-info">
            <span class="detail-label">{{ t('card.feelsLike') }}</span>
            <span>{{ display.feelsLike }}</span>
          </div>
        </li>
        <li class="detail">
          <HumidityIcon />
          <div class="detail-info">
            <span class="detail-label">{{ t('card.humidity') }}</span>
            <span>{{ display.humidity }}%</span>
          </div>
        </li>
        <li class="detail">
          <WindIcon />
          <div class="detail-info">
            <span class="detail-label">{{ t('card.wind') }}</span>
            <span>{{ display.wind }}</span>
          </div>
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { LocationWeather } from '@/types/weather'
import { getActiveWeatherSnapshot } from '@/utils/weatherDisplay'
import HumidityIcon from '../icons/HumidityIcon.vue'
import TemperatureIcon from '../icons/TemperatureIcon.vue'
import WindIcon from '../icons/WindIcon.vue'

const props = defineProps({
  locationWeather: {
    type: Object as () => LocationWeather,
    required: true
  }
})

const { t } = useI18n()
const display = computed(() => getActiveWeatherSnapshot(props.locationWeather))
</script>

<style scoped>
.weather-display--night .icon-layout {
  background: linear-gradient(145deg, rgba(30, 30, 60, 0.35), rgba(67, 97, 238, 0.2));
}

.weather-current {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
}

.weather-main {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.location {
  font-size: clamp(1.4rem, 3vw, 1.8rem);
  font-weight: 700;
  margin-bottom: 4px;
  color: var(--dark);
  letter-spacing: -0.02em;
}

.date {
  font-size: 0.95rem;
  color: var(--muted);
  margin-bottom: 12px;
}

.temperature {
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 4px;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1.1;
}

.conditions {
  font-size: 1.1rem;
  color: var(--muted);
  font-weight: 500;
}

.icon-layout {
  flex-shrink: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 110px;
  background: linear-gradient(145deg, rgba(67, 97, 238, 0.15), rgba(247, 37, 133, 0.1));
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-base);
}

.icon-layout:hover {
  transform: scale(1.05) rotate(3deg);
}

.weather-icon {
  width: 72px;
  height: 72px;
  object-fit: contain;
}

.details-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}

.detail {
  background: var(--surface-strong);
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.detail:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.detail-label {
  font-size: 0.75rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.week-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.week-day {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  background: var(--surface-strong);
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.week-day:hover {
  transform: translateX(4px);
  box-shadow: var(--shadow-sm);
}

.week-day-main {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.week-date {
  font-weight: 600;
  color: var(--dark);
}

.week-temp {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--primary);
}

.week-info {
  color: var(--muted);
  font-size: 0.9rem;
}

.week-icon {
  width: 52px;
  height: 52px;
  object-fit: contain;
}
</style>
