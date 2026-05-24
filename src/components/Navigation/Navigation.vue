<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { AppLocale } from '@/types/locale'
import { useLocaleStore } from '@/store/localeStore'

const localeStore = useLocaleStore()

const setLocale = (locale: AppLocale) => {
  localeStore.setLocale(locale)
}
</script>

<template>
  <nav class="nav">
    <ul class="nav-list">
      <li class="nav-item">
        <RouterLink to="/" class="link" active-class="active">{{ $t('nav.home') }}</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/favorites" class="link" active-class="active">
          {{ $t('nav.favorites') }}
        </RouterLink>
      </li>
    </ul>

    <div class="lang-toggle" role="group" :aria-label="$t('nav.home')">
      <button
        type="button"
        class="lang-btn"
        :class="{ active: localeStore.locale === 'en' }"
        @click="setLocale('en')"
      >
        {{ $t('common.langEn') }}
      </button>
      <button
        type="button"
        class="lang-btn"
        :class="{ active: localeStore.locale === 'uk' }"
        @click="setLocale('uk')"
      >
        {{ $t('common.langUk') }}
      </button>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.nav-list {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 4px;
  padding: 6px;
  border-radius: var(--radius-full);
  background: var(--surface);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-sm);
  max-width: 100%;
  overflow: hidden;
}

.nav-item {
  display: flex;
  min-width: 0;
  border-radius: var(--radius-full);
  overflow: hidden;
}

.link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border-radius: var(--radius-full);
  color: var(--muted);
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast);
}

.link:hover {
  color: var(--primary);
  background-color: rgba(67, 97, 238, 0.08);
}

.link.active {
  color: #fff;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  box-shadow: 0 4px 14px rgba(67, 97, 238, 0.35);
}

.lang-toggle {
  display: flex;
  gap: 4px;
  padding: 4px;
  border-radius: var(--radius-full);
  background: var(--surface);
  border: 1px solid var(--glass-border);
}

.lang-btn {
  padding: 6px 14px;
  border: none;
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast);
}

.lang-btn.active {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: #fff;
}
</style>
