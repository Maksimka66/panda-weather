import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vueDebounce from 'vue-debounce'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(VueSweetalert2)
app.directive(
  'debounce',
  vueDebounce({
    lock: true
  })
)

app.mount('#app')
