import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import Notifications from '@kyvg/vue3-notification'
import { createPinia } from 'pinia'

createApp(App)
.use(Notifications)
.use(createPinia())
.mount("#app");
