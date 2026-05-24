<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="confirm-overlay" @click.self="cancelAction">
        <div class="confirm-dialog" role="alertdialog" aria-modal="true">
          <h2 class="confirm-title">{{ title }}</h2>
          <p class="confirm-message">{{ message }}</p>
          <div class="confirm-actions">
            <button
              v-if="!alertOnly"
              type="button"
              class="confirm-btn confirm-btn--ghost"
              @click="cancelAction"
            >
              {{ cancelText || $t('common.cancel') }}
            </button>
            <button type="button" class="confirm-btn confirm-btn--primary" @click="confirmAction">
              {{ confirmText || $t('common.remove') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useConfirm } from '@/composables/useConfirm'
import { useConfirmStore } from '@/store/confirmStore'

const { visible, title, message, confirmText, cancelText, confirmAction, cancelAction } =
  useConfirm()

const { alertOnly } = storeToRefs(useConfirmStore())
</script>

<style scoped>
.confirm-overlay {
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(30, 30, 36, 0.45);
  backdrop-filter: blur(6px);
}

.confirm-dialog {
  width: 100%;
  max-width: 400px;
  padding: 24px;
  border-radius: var(--radius-lg);
  background: var(--surface-strong);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-lg);
}

.confirm-title {
  margin-bottom: 10px;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--dark);
}

.confirm-message {
  margin-bottom: 20px;
  color: var(--muted);
  line-height: 1.5;
}

.confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
}

.confirm-btn {
  padding: 10px 18px;
  border-radius: var(--radius-full);
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition:
    transform var(--transition-fast),
    background-color var(--transition-fast);
}

.confirm-btn:active {
  transform: scale(0.96);
}

.confirm-btn--ghost {
  background: transparent;
  color: var(--muted);
  border: 1px solid rgba(67, 97, 238, 0.2);
}

.confirm-btn--ghost:hover {
  color: var(--primary);
  border-color: var(--primary);
}

.confirm-btn--primary {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: #fff;
}
</style>
