<template>
  <button
    class="remove"
    type="button"
    aria-label="Remove"
    @click="handleRemove"
  >
    <RemoveIcon />
  </button>
</template>

<script setup lang="ts">
import { useRemoveLocation } from '@/composables/useRemoveLocation'
import type { WeatherListKey } from '@/types/weather'
import RemoveIcon from '../icons/RemoveIcon.vue'

const props = defineProps({
  cardId: {
    type: Number,
    required: true
  },
  listKey: {
    type: String as () => WeatherListKey,
    default: 'locations'
  },
  cityLabel: {
    type: String,
    default: ''
  }
})

const { removeWithConfirm } = useRemoveLocation(props.listKey)

const handleRemove = () => {
  removeWithConfirm(props.cardId, props.cityLabel)
}
</script>

<style scoped>
.remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid rgba(230, 57, 70, 0.2);
  background: rgba(255, 255, 255, 0.7);
  color: var(--muted);
  transition:
    transform var(--transition-fast),
    border-color var(--transition-fast),
    background-color var(--transition-fast),
    color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.remove:hover {
  transform: scale(1.1);
  border-color: var(--danger);
  background: rgba(230, 57, 70, 0.1);
  color: var(--danger);
  box-shadow: 0 4px 14px rgba(230, 57, 70, 0.25);
}

.remove:active {
  transform: scale(0.92);
}
</style>
