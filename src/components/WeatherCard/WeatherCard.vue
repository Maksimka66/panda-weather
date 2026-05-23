<template>
  <div class="weather-display">
    <div class="weather-current">
      <div class="weather-main">
        <span class="location">{{ locationWeather.location }}</span>
        <span class="date">{{ locationWeather.date }}</span>
        <span class="temperature">{{ locationWeather.temperature }}</span>
        <span class="conditions">{{ locationWeather.info }}</span>
      </div>
      <div class="icon-layout">
        <img :src="locationWeather.icon" alt="Weather icon" class="weather-icon" />
      </div>
    </div>

    <ul class="details-list">
      <li class="detail">
        <TemperatureIcon />
        <div class="detail-info">
          <span>Feels like:</span>
          <span>{{ locationWeather.feelsLike }}</span>
        </div>
      </li>
      <li class="detail">
        <HumidityIcon />
        <div class="detail-info">
          <span>Humidity:</span>
          <span>{{ locationWeather.humidity }}%</span>
        </div>
      </li>
      <li class="detail">
        <WindIcon />
        <div class="detail-info">
          <span>Wind:</span>
          <span>{{ locationWeather.wind }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import HumidityIcon from '../icons/HumidityIcon.vue'
import TemperatureIcon from '../icons/TemperatureIcon.vue'
import WindIcon from '../icons/WindIcon.vue'

defineProps({
  locationWeather: {
    type: Object,
    required: true,
    default: null
  }
})
</script>

<style scoped>
.weather-current {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  margin-bottom: 30px;
}

.weather-main {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.location {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.date {
  font-size: 1rem;
  color: #666;
  margin-bottom: 16px;
}

.temperature {
  font-size: 3.5rem;
  font-weight: 600;
  margin-bottom: 6px;
}

.conditions {
  font-size: 1.2rem;
  color: #555;
}

.icon-layout {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #b8b2b2;
  width: 120px;
  height: 120px;
}

.weather-icon {
  object-fit: contain;
}

.details-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 3fr));
  gap: 16px;
  margin-bottom: 30px;
}

.detail {
  background-color: #ffffff99;
  padding: 6px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 1rem;
  font-weight: 500;
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
