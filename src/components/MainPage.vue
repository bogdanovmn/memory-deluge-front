<script setup lang="ts">
import { inject, ref } from 'vue'
import { MemoryDelugeService } from '../common/md-service'

const mdService = inject<MemoryDelugeService>("mdService")!
const series = ref(mdService.getSeries())
</script>

<template>
    <h1>Select a series</h1>
    <div v-for="s in series">
        {{ s.name }} - ({{ s.episodes }} episodes)
    </div>
</template>

<style scoped>
</style>
