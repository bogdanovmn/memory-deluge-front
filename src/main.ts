import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { eventBus, Event } from './common/event-bus'
import './style.css'
import { SsoService, AuthHttpClient } from "@bogdanovmn/ssofw"
import { MemoryDelugeService } from './common/md-service'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css' 

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  }
})

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
    .use(vuetify)
    .provide("mdService", mdService)
    .provide("ssoService", ssoService)
    .mount('#app')
