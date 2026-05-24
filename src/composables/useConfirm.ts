import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useConfirmStore } from '@/store/confirmStore'
import type { ConfirmOptions } from '@/store/confirmStore'

export function useConfirm() {
  const confirmStore = useConfirmStore()
  const { t } = useI18n()
  const { visible, title, message, confirmText, cancelText } = storeToRefs(confirmStore)

  const confirm = (options: ConfirmOptions) =>
    confirmStore.open({
      confirmText: t('common.remove'),
      cancelText: t('common.cancel'),
      ...options
    })

  return {
    visible,
    title,
    message,
    confirmText,
    cancelText,
    confirm,
    confirmAction: () => confirmStore.confirm(),
    cancelAction: () => confirmStore.cancel()
  }
}
