<template>
  <nav class="navbar" :class="{ scrolled: isScrolled, open: menuOpen }">
    <div class="nav-container">
      <router-link to="/home" class="nav-logo cursive">MJ &amp; R</router-link>

      <!-- Hamburger -->
      <button class="hamburger" @click="toggleMenu" :class="{ active: menuOpen }" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Nav Links -->
      <ul class="nav-links" :class="{ open: menuOpen }">
        <li><router-link to="/home" @click="closeMenu">Home</router-link></li>
        <li><router-link to="/home#our-story" @click="closeMenu">Our Story</router-link></li>
        <li><router-link to="/home#gallery" @click="closeMenu">Gallery</router-link></li>
        <li><router-link to="/home#details" @click="closeMenu">Details</router-link></li>
        <li><router-link to="/rsvp" @click="closeMenu" class="nav-rsvp-btn">RSVP</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 16px 0;
  transition: all 0.4s ease;
  background: rgba(240, 244, 248, 0.85);
  backdrop-filter: blur(12px);
}
.navbar.scrolled {
  padding: 10px 0;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
}

.nav-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  font-size: 2rem;
  color: var(--text-accent);
  letter-spacing: 2px;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 32px;
  align-items: center;
}
.nav-links a {
  font-family: var(--font-elegant);
  font-size: 1.05rem;
  color: var(--text-medium);
  transition: color 0.3s;
  letter-spacing: 0.5px;
}
.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--pastel-gold);
}
.nav-rsvp-btn {
  background: linear-gradient(135deg, var(--pastel-mauve), var(--pastel-gold));
  color: #fff !important;
  padding: 8px 24px;
  border-radius: 50px;
  font-weight: 500;
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  padding: 4px;
}
.hamburger span {
  display: block;
  width: 26px;
  height: 2px;
  background: var(--text-accent);
  transition: all 0.3s ease;
  border-radius: 2px;
}
.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger.active span:nth-child(2) {
  opacity: 0;
}
.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }
  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 70%;
    max-width: 300px;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    gap: 28px;
    background: var(--pastel-cream);
    box-shadow: -4px 0 30px rgba(0,0,0,0.08);
    transition: right 0.4s ease;
    padding: 24px;
  }
  .nav-links.open {
    right: 0;
  }
  .nav-links a {
    font-size: 1.2rem;
  }
}
</style>
