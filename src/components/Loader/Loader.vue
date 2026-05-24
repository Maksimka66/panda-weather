<template>
  <div class="loading" :class="{ 'loading--inline': inline }">
    <div class="loader" :class="{ 'loader--inline': inline }"></div>
    <span class="loader-text" v-if="!inline">{{ $t('loader.weather') }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  inline: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-height: 200px;
  animation: fadeIn 0.3s var(--ease-out);
}

.loading--inline {
  min-height: auto;
  padding: 20px 0;
}

.loader {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 4px solid rgba(67, 97, 238, 0.15);
  border-top-color: var(--primary);
  border-right-color: var(--accent);
  animation: spin 0.75s linear infinite;
}

.loader--inline {
  width: 36px;
  height: 36px;
  border-width: 3px;
}

.loader-text {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--muted);
}
</style>
