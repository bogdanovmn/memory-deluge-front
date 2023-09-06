import { createRouter, createWebHistory, useRoute } from 'vue-router'
import { tokenStorage, Role, SsoService } from "@bogdanovmn/ssofw"
import MainPage from '../components/MainPage.vue'
import AboutPage from '../components/AboutPage.vue'
import ErrorPage from '../components/ErrorPage.vue'
import { inject } from 'vue'
import { eventBus, Event } from '../common/event-bus'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/about", component: AboutPage },
        { path: "/error", component: ErrorPage },
        { path: "/series", component: MainPage, meta: { allow: Role.user } },
    ]
})

router.beforeEach(
    async (to: any) => {
        const targetRole: Role = to.meta.allow
        const isAuthenticated = tokenStorage.defined()
        const code = to.query.code

        console.log(`routing to ${to.fullPath} auth: ${isAuthenticated} targetRole: ${targetRole}`)
        
        if (code) {
            handleCode(code, to)
        }

        if (targetRole && !tokenStorage.claims?.hasRole(targetRole, 'memory-deluge')) {
            console.error(`role ${targetRole} expected`)
            localStorage.setItem("errorMsg", 'Permision denied')
            return { path: "/error" }
        }

        return true
    }
);

async function handleCode(code: string, route: any) {
    console.log(`there is a code, will exchange it for JWT`)
    await inject<SsoService>('ssoService')!.exchangeCodeToJwt(code)
        .then(
            () => {
                eventBus.emit(Event.login)
            }
        )
        .finally(
            () => {
                if (route.path == '/error') {
                    router.replace({ path: '/series' })
                } else {
                    const queryParams = { ...route.query };
                    delete queryParams.code;
                    router.replace({ path: route.path, query: queryParams });
                }
            }
        )
}

export default router