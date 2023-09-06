import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { eventBus, Event } from './common/event-bus'
import './style.css'
import { SsoService, AuthHttpClient } from "@bogdanovmn/ssofw"

import { MemoryDelugeService } from './common/md-service'


const ssoService = new SsoService(import.meta.env.VITE_SSO_SERVICE_URL)
const authHttpClient = new AuthHttpClient(
    ssoService,
    () => {
        console.log("auth error");
        eventBus.emit(Event.authError)
    }
)
const mdService = new MemoryDelugeService(import.meta.env.VITE_MEMORY_DELIGE_SERVICE_URL, authHttpClient)

createApp(App)
    .use(router)
    .provide("mdService", mdService)
    .provide("ssoService", ssoService)
    .mount('#app')
