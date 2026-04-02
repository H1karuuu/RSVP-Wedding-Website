<template>
  <div id="wedding-app">
    <!-- Navigation (hidden on landing page) -->
    <NavBar v-if="showNav" />

    <button v-if="showNav" class="faq-fab" type="button" @click="faqOpen = true">
      FAQ
    </button>

    <!-- Music Player (floating) -->
    <MusicPlayer v-if="showNav" />

    <FaqModal v-model="faqOpen" />

    <!-- Page Transitions -->
    <router-view v-slot="{ Component }">
      <transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import FaqModal from './components/FaqModal.vue'

const route = useRoute()
const showNav = computed(() => route.path !== '/')
const faqOpen = ref(false)
</script>

<style>
#wedding-app {
  min-height: 100vh;
}

.faq-fab {
  position: fixed;
  right: 20px;
  bottom: 92px;
  z-index: 900;
  padding: 12px 22px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.55);
  background: linear-gradient(135deg, var(--pastel-mauve), var(--pastel-gold));
  color: #fff;
  font-family: var(--font-elegant);
  font-size: 1rem;
  letter-spacing: 1.2px;
  font-weight: 700;
  box-shadow: 0 12px 24px rgba(52, 75, 100, 0.2);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.faq-fab:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 30px rgba(52, 75, 100, 0.26);
}

@media (max-width: 768px) {
  .faq-fab {
    right: 14px;
    bottom: 84px;
    padding: 10px 18px;
    font-size: 0.92rem;
  }
}
</style>
