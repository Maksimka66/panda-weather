import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vueDebounce from 'vue-debounce'
import { i18n } from '@/i18n'
import './styles/main.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)
app.directive(
  'debounce',
  vueDebounce({
    lock: true
  })
)

app.mount('#app')
