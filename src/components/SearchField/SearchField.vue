<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCityAutocomplete } from '@/composables/useCityAutocomplete'
import { useCitySearch } from '@/composables/useCitySearch'
import type { GeocodingCity } from '@/types/weather'
import SearchIcon from '../icons/SearchIcon.vue'
import Loader from '../Loader/Loader.vue'

const props = defineProps({
  autofocus: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  locationAdded: []
}>()

const { t } = useI18n()
const { searchTerm, isSearching, searchCity } = useCitySearch(() => emit('locationAdded'))
const isFocused = ref(false)

const { suggestions, isLoading, clearSuggestions } = useCityAutocomplete(() => searchTerm.query)

const showSuggestions = computed(
  () => isFocused.value && searchTerm.query.trim().length >= 2 && !isSearching.value
)

const handleInput = () => {
  searchCity()
}

const selectCity = async (city: GeocodingCity) => {
  clearSuggestions()
  isFocused.value = false
  await searchCity(city.queryValue)
}

const onBlur = () => {
  setTimeout(() => {
    isFocused.value = false
    clearSuggestions()
  }, 150)
}
</script>

<template>
  <div class="search-layout">
    <form class="search-form" v-if="!isSearching" @submit.prevent="handleInput">
      <SearchIcon class="search-icon" />
      <input
        required
        name="search"
        type="text"
        :placeholder="t('search.placeholder')"
        class="search-field"
        v-model="searchTerm.query"
        v-debounce:1s="handleInput"
        :autofocus="props.autofocus"
        autocomplete="off"
        @focus="isFocused = true"
        @blur="onBlur"
      />
    </form>
    <Loader v-else inline />

    <ul v-if="showSuggestions" class="suggestions">
      <li v-if="isLoading" class="suggestions-item suggestions-item--muted">{{ t('loader.weather') }}</li>
      <li v-else-if="!suggestions.length" class="suggestions-item suggestions-item--muted">
        {{ t('search.noResults') }}
      </li>
      <li v-for="city in suggestions" :key="`${city.queryValue}-${city.label}`">
        <button type="button" class="suggestions-btn" @mousedown.prevent="selectCity(city)">
          {{ city.label }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search-layout {
  position: relative;
  width: 100%;
}

.search-form {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 4px 4px 16px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid transparent;
  box-shadow: inset 0 2px 8px rgba(30, 30, 36, 0.06);
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.search-form:focus-within {
  border-color: var(--primary);
  box-shadow:
    inset 0 2px 8px rgba(30, 30, 36, 0.04),
    0 0 0 4px rgba(67, 97, 238, 0.15);
}

.search-icon {
  flex-shrink: 0;
  opacity: 0.5;
}

.search-field {
  border: none;
  outline: none;
  padding: 12px 16px 12px 0;
  width: 100%;
  background-color: transparent;
  font-size: 1rem;
  font-family: inherit;
  color: var(--dark);
}

.suggestions {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  z-index: 20;
  max-height: 220px;
  overflow-y: auto;
  border-radius: var(--radius-md);
  background: var(--surface-strong);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-md);
}

.suggestions-item {
  padding: 12px 16px;
  font-size: 0.9rem;
}

.suggestions-item--muted {
  color: var(--muted);
}

.suggestions-btn {
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  font-size: 0.95rem;
  color: var(--dark);
  transition: background-color var(--transition-fast);
}

.suggestions-btn:hover {
  background: rgba(67, 97, 238, 0.1);
  color: var(--primary);
}
</style>
