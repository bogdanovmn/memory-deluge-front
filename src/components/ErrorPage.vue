<script setup lang="ts">
    import { inject, ref } from 'vue'

    const errorMsg = localStorage.getItem("errorMsg")
    localStorage.removeItem("errorMsg")

</script>

<template>
    <h1>Something went wrong</h1>
    <p>{{ errorMsg }}</p>
</template>

<style scoped>
</style>
