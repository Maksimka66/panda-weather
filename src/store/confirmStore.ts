import { defineStore } from 'pinia'

export interface ConfirmOptions {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  alert?: boolean
}

export const useConfirmStore = defineStore('confirm', {
  state: () => ({
    visible: false,
    title: '',
    message: '',
    confirmText: '',
    cancelText: '',
    alertOnly: false,
    resolve: null as ((value: boolean) => void) | null
  }),

  actions: {
    open(options: ConfirmOptions) {
      return new Promise<boolean>((resolve) => {
        this.title = options.title
        this.message = options.message
        this.confirmText = options.confirmText ?? ''
        this.cancelText = options.cancelText ?? ''
        this.alertOnly = options.alert ?? false
        this.resolve = resolve
        this.visible = true
      })
    },

    confirm() {
      this.resolve?.(true)
      this.close()
    },

    cancel() {
      this.resolve?.(false)
      this.close()
    },

    close() {
      this.visible = false
      this.alertOnly = false
      this.resolve = null
    }
  }
})
