<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="nav">
    <ul class="nav-list">
      <li><RouterLink to="/" class="link" active-class="active">Home</RouterLink></li>
      <li>
        <RouterLink to="/favorites" class="link" active-class="active">Favourites</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.nav {
  margin-bottom: 20px;
}

.nav-list {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.link {
  color: #ff5100;
  font-size: 24px;
  font-weight: 400;
  text-decoration: none;
}

.active {
  color: #b3ff00;
  text-decoration: underline;
}
</style>
