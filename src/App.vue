<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navigation from './components/Navigation/Navigation.vue'
</script>

<template>
  <main>
    <div class="layout">
      <div class="container">
        <Navigation />
        <RouterView />
      </div>
    </div>
  </main>
</template>

<style>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
