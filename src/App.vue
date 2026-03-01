<template>
  <div id="wedding-app">
    <!-- Navigation (hidden on landing page) -->
    <NavBar v-if="showNav" />

    <!-- Music Player (floating) -->
    <MusicPlayer v-if="showNav" />

    <!-- Page Transitions -->
    <router-view v-slot="{ Component }">
      <transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import MusicPlayer from './components/MusicPlayer.vue'

const route = useRoute()
const showNav = computed(() => route.path !== '/')
</script>

<style>
#wedding-app {
  min-height: 100vh;
}
</style>
