<template>
  <button class="remove" @click="handleRemove(cardId)">
    <RemoveIcon />
  </button>
</template>

<script setup lang="ts">
import { useWeatherStore } from '@/store/weatherStore'
import RemoveIcon from '../icons/RemoveIcon.vue'

const props = defineProps({
  cardId: {
    type: Number,
    required: true,
    default: 0
  },
  data: {
    type: Array,
    required: true,
    default: []
  }
})

const weatherStore = useWeatherStore()

const handleRemove = (id) => {
  const removingElem = props.data.find((item) => item.id === id)

  if (removingElem) {
    weatherStore.removeWeather(removingElem.id, 'locations')
  }
}
</script>

<style scoped>
.remove {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
