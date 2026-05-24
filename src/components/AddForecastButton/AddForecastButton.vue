<template>
  <button class="add-forecast-btn" type="button" @click="openModal" aria-label="Add city">
    <PlusIcon />
  </button>

  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <button type="button" class="modal-close" aria-label="Close" @click="closeModal">×</button>
          <h2 id="modal-title" class="modal-title">{{ $t('modal.addCityTitle') }}</h2>
          <p class="modal-subtitle">{{ $t('modal.addCitySubtitle') }}</p>
          <SearchField autofocus @location-added="closeModal" />
          <button type="button" class="modal-cancel" @click="closeModal">{{ $t('common.cancel') }}</button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useAddForecastModal } from '@/composables/useAddForecastModal'
import SearchField from '../SearchField/SearchField.vue'
import PlusIcon from '../icons/PlusIcon.vue'

const { isModalOpen, openModal, closeModal } = useAddForecastModal()
</script>

<style scoped>
.add-forecast-btn {
  width: 52px;
  height: 52px;
  padding: 0;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  box-shadow: 0 6px 20px rgba(67, 97, 238, 0.45);
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.add-forecast-btn:hover {
  transform: scale(1.08) rotate(90deg);
  box-shadow: 0 8px 28px rgba(67, 97, 238, 0.55);
}

.add-forecast-btn:active {
  transform: scale(0.96) rotate(90deg);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(30, 30, 36, 0.45);
  backdrop-filter: blur(6px);
}

.modal {
  position: relative;
  width: 100%;
  max-width: 440px;
  padding: 28px;
  border-radius: var(--radius-lg);
  background: var(--surface-strong);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-lg);
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: rgba(30, 30, 36, 0.08);
  color: var(--muted);
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast),
    transform var(--transition-fast);
}

.modal-close:hover {
  background: rgba(230, 57, 70, 0.12);
  color: var(--danger);
  transform: rotate(90deg);
}

.modal-title {
  margin-bottom: 6px;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--dark);
}

.modal-subtitle {
  margin-bottom: 20px;
  font-size: 0.9rem;
  color: var(--muted);
}

.modal-cancel {
  margin-top: 18px;
  width: 100%;
  padding: 12px 20px;
  border: 1px solid rgba(67, 97, 238, 0.2);
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast),
    border-color var(--transition-fast);
}

.modal-cancel:hover {
  background: rgba(67, 97, 238, 0.08);
  color: var(--primary);
  border-color: var(--primary);
}
</style>
