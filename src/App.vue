<script setup lang="ts">

    import { inject, ref } from 'vue';
    import { tokenStorage, SsoService } from "@bogdanovmn/ssofw"
    import AuthState from './components/AuthState.vue'
    import { eventBus, Event } from './common/event-bus';
    import router from './router';


    const ssoService = inject<SsoService>("ssoService")!
    const userName = ref(tokenStorage.claims?.userName)

    eventBus.on(Event.login, () => {
        userName.value = tokenStorage.claims?.userName
    });
    eventBus.on(Event.logout, async () => {
        console.log("try to delete tokens")
        await ssoService.deleteRefreshToken()
        userName.value = undefined
        router.push("/about")
    });
</script>

<template>
    <div id="#app">
        <v-layout>
            <v-navigation-drawer expand-on-hover rail permanent elevation="2">
                <v-list density="compact" nav>
                    <v-list-item prepend-icon="mdi-folder" title="Series" href="/series"/>
                    <v-list-item prepend-icon="mdi-information-variant" title="About" href='/about' />
                </v-list>
                
                <v-divider/>

                <v-list>
                    <auth-state :user-name="userName"/>
                </v-list>

            </v-navigation-drawer>

            <v-main>
                <router-view/>
            </v-main>
        </v-layout>
    </div>
</template>

<style scoped>
</style>
