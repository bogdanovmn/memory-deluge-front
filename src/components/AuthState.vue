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
    <div v-if="userName">
        {{ userName }}
        <button @click="logout()">log out</button>
    </div>
    <div v-else>
        <button @click="loginRequest()">log in</button>
    </div>
</template>

<style scoped>
</style>
