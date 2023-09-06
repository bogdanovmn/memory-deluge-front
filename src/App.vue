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
        <router-link to="/series">Series</router-link> ::
        <router-link to="/about">About</router-link>
        <auth-state :user-name="userName"/>
        <router-view/>
    </div>
</template>

<style scoped>
</style>
