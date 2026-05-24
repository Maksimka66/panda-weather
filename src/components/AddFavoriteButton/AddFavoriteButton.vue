<template>
  <button
    class="favourite"
    :class="{ active: isFavorite(cardId) }"
    type="button"
    :aria-label="isFavorite(cardId) ? 'Remove from favourites' : 'Add to favourites'"
    @click="toggleFavorite(cardId)"
  >
    <FavoriteIcon />
  </button>
</template>

<script setup lang="ts">
import { useFavorite } from '@/composables/useFavorite'
import FavoriteIcon from '../icons/FavoriteIcon.vue'

defineProps({
  cardId: {
    type: Number,
    required: true
  }
})

const { isFavorite, toggleFavorite } = useFavorite()
</script>

<style scoped>
.favourite {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid rgba(255, 107, 53, 0.25);
  background: rgba(255, 255, 255, 0.7);
  color: var(--muted);
  transition:
    transform var(--transition-fast),
    border-color var(--transition-fast),
    background-color var(--transition-fast),
    box-shadow var(--transition-fast),
    color var(--transition-fast);
}

.favourite:hover {
  transform: scale(1.1);
  border-color: var(--favorite);
  color: var(--favorite);
  box-shadow: 0 4px 14px var(--favorite-glow);
}

.favourite.active {
  border-color: var(--favorite);
  background: linear-gradient(135deg, #ff6b35, #ff8fab);
  color: #fff;
  box-shadow: 0 4px 16px var(--favorite-glow);
  animation: pulse-soft 2s ease-in-out infinite;
}

.favourite:active {
  transform: scale(0.92);
}
</style>
