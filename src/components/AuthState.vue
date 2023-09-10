<script setup lang="ts">
    import { useRoute } from 'vue-router'
    import { eventBus, Event } from '../common/event-bus'
    
    defineProps({
        userName: {
            type: String,
            default: null
        }
    })

    const route = useRoute()

    function loginRequest() {
        window.location.href = `${import.meta.env.VITE_SSO_FRONT_URL}/login?from=${encodeURIComponent(window.location.origin + route.fullPath)}`
    }

    async function logout() {
        eventBus.emit(Event.logout)
    }

</script>

<template>
    <v-list-item v-if="userName" prepend-icon="mdi-logout" :subtitle="userName" title="log out" @click="logout()"/>
    <v-list-item v-else prepend-icon="mdi-login" title="log in" @click="loginRequest()"/>
</template>

<style scoped>
</style>
