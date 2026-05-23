<template>
  <button class="favourite" @click="handleFavorite(cardId)"><FavoriteIcon /></button>
</template>

<script setup lang="ts">
import { useWeatherStore } from '@/store/weatherStore'
import FavoriteIcon from '../icons/FavoriteIcon.vue'

defineProps({
  cardId: {
    type: Number,
    required: true,
    default: 0
  }
})

const weatherStore = useWeatherStore()

const handleFavorite = (id) => {
  const newFavoriteWeather = weatherStore.locations.find((item) => item.id === id)

  if (newFavoriteWeather) {
    const isSameFavorites = weatherStore.favorites.find((item) => item.id === id)

    if (!isSameFavorites) {
      weatherStore.addToFavorites(newFavoriteWeather)
    } else {
      weatherStore.removeWeather(isSameFavorites.id, 'favorites')
    }
  }
}
</script>

<style scoped>
.favourite {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
