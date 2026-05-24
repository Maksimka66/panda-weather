<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal.vue'
import Navigation from './components/Navigation/Navigation.vue'
import { useLocaleStore } from '@/store/localeStore'

const localeStore = useLocaleStore()

onMounted(() => {
  localeStore.init()
})
</script>

<template>
  <main>
    <div class="layout">
      <div class="container">
        <Navigation />
        <RouterView />
      </div>
    </div>
    <ConfirmModal />
  </main>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.5s var(--ease-out);
}

.container {
  width: 100%;
  max-width: 1200px;
  min-width: 0;
  margin: 0 auto;
  padding-inline: 4px;
}
</style>
