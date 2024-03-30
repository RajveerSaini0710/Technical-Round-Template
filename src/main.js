import { createApp } from 'vue'
import './style.css'
import router from './router.js'
import App from './App.vue'
import BaseCard from './components/ui/baseCard.vue'
const app = createApp(App)

app.component('BaseCard', BaseCard)

app.use(router)
app.mount('#app')
