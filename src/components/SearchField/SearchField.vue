<script setup lang="ts">
import { reactive } from 'vue'
import { fetchWeather } from '@/api/api'
import { useWeatherStore } from '@/store/weatherStore'
import SearchIcon from '../icons/SearchIcon.vue'
import Loader from '../Loader/Loader.vue'

const weatherStore = useWeatherStore()

const searchTerm = reactive({
  query: ''
})

const handleInput = async () => {
  if (searchTerm.query) {
    try {
      weatherStore.setLoadingState(true)

      const data = await fetchWeather(searchTerm.query.trim())

      const isSameData = weatherStore.locations.find((item) => item.id === data.id)

      if (!isSameData) {
        weatherStore.addLocationWeather(data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      weatherStore.setLoadingState(false)
    }
  }
}
</script>

<template>
  <div class="search-layout" v-if="!weatherStore.isLoading">
    <form class="search-form">
      <SearchIcon />
      <input
        required
        name="search"
        type="text"
        placeholder="Search for a place"
        class="search-field"
        v-model="searchTerm.query"
        v-debounce:1s="handleInput"
      />
    </form>

    <div class="bg-white my-2 rounded-lg shadow-lg" v-if="weatherStore.locations.length">
      <ul v-for="place in weatherStore.locations" :key="place.id">
        <li>
          <!-- <button class="px-3 my-2 hover:text-indigo-600 hover:font-bold w-full text-left">
            {{ place.name }},{{ place.region }}, {{ place.country }}
          </button> -->
        </li>
      </ul>
    </div>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<style scoped>
.search-layout {
  width: 100%;
}

.search-form {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow:
    inset 0 10px 15px -3px #0000001a,
    0 4px 6px -4px #0000001a;
}

.search-field {
  border: none;
  outline: none;
  border-radius: 50px;
  padding: 12px 24px;
  width: 100%;
  background-color: transparent;
  font-size: 1rem;
}

.search-field::placeholder {
  font-size: 14px;
  font-weight: 400;
  color: #000000;
}
</style>
