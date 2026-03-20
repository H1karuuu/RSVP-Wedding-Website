<template>
  <div class="landing-page">
    <section class="envelope-section" @click="handleClick">
      <div class="sparkles-container" aria-hidden="true">
        <div class="sparkle" v-for="i in 12" :key="i" :style="sparkleStyle(i)"></div>
      </div>

      <div class="floating-photo photo-left" aria-hidden="true">
        <img src="/photos/prenup-8.jpg" alt="" loading="lazy" />
      </div>

      <div class="floating-photo photo-right" aria-hidden="true">
        <img src="/photos/prenup-10.jpg" alt="" loading="lazy" />
      </div>

      <div class="envelope-stage" :class="{ opened: envelopeOpened }">
        <img
          class="letter-inside"
          src="/photos/Screenshot_2026-03-20_221318-removebg-preview.png"
          alt="Invitation letter"
          loading="eager"
        />
        <img
          class="envelope-closed"
          src="/photos/Red and White Elegant Wedding Save the Date Invitation Video (2).png"
          alt="Closed envelope"
          loading="eager"
        />

        <img
          class="envelope-open"
          src="/photos/Screenshot_2026-03-20_221318-removebg-preview.png"
          alt="Opened envelope"
          loading="eager"
        />
      </div>

      <transition name="popup-fade">
        <div class="invitation-popup" v-if="showPhotoPopup" @click.stop>
          <button class="btn-primary proceed-btn" @click.stop="enterSite">
            Proceed to Invitation
            <span class="arrow">→</span>
          </button>
        </div>
      </transition>

      <p class="tap-text" :class="{ hidden: envelopeOpened }">
        <span class="tap-icon">✉</span> Tap to open your invitation
      </p>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const envelopeOpened = ref(false)
const showPhotoPopup = ref(false)

const handleClick = () => {
  if (!envelopeOpened.value) {
    envelopeOpened.value = true
    setTimeout(() => {
      showPhotoPopup.value = true
    }, 900)
  }
}

const enterSite = () => {
  router.push('/home')
}

const sparkleStyle = (i) => ({
  left: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 6}s`,
  animationDuration: `${6 + Math.random() * 6}s`,
  opacity: 0.3 + Math.random() * 0.4,
  fontSize: `${10 + Math.random() * 12}px`,
})
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(199, 220, 241, 0.6), rgba(235, 242, 249, 0.95) 45%, #f0f4f8 100%);
  overflow-x: hidden;
}

.envelope-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 70px 20px 40px;
  cursor: pointer;
  overflow: hidden;
}

.envelope-stage {
  position: absolute;
  width: min(420px, 86vw);
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 5;
  transition: transform 0.8s ease;
}

.envelope-stage.opened {
  transform: translateY(-8px);
}

.envelope-closed,
.envelope-open,
.letter-inside {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.envelope-closed {
  opacity: 1;
  transition: opacity 0.5s ease 0.1s;
  z-index: 3;
}

.envelope-open {
  opacity: 0;
  z-index: 4;
  transition: opacity 0.4s ease;
}

.letter-inside {
  width: 84%;
  transform: translateY(26%);
  transition: transform 0.95s cubic-bezier(0.2, 0.8, 0.2, 1);
  z-index: 2;
}

.opened .letter-inside {
  transform: translateY(-20%);
}

.opened .envelope-closed {
  opacity: 0;
}

.opened .envelope-open {
  opacity: 1;
}

.floating-photo {
  position: absolute;
  width: min(200px, 28vw);
  border-radius: 18px;
  border: 6px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 16px 40px rgba(23, 45, 74, 0.18);
  overflow: hidden;
  z-index: 2;
}

.floating-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.photo-left {
  left: 8%;
  top: 22%;
  transform: rotate(-6deg);
}

.photo-right {
  right: 8%;
  top: 34%;
  transform: rotate(7deg);
}

.sparkles-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.sparkle {
  position: absolute;
  top: -20px;
  animation: sparkleFall linear infinite;
}

.sparkle::after {
  content: '✦';
  font-size: inherit;
  color: var(--pastel-gold);
  opacity: 0.6;
}
@keyframes sparkleFall {
  0% { transform: translateY(-5vh) rotate(0deg); opacity: 0; }
  10% { opacity: 0.7; }
  90% { opacity: 0.7; }
  100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
}

.invitation-popup {
  position: absolute;
  top: 78%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 12;
  width: auto;
  pointer-events: none;
}

.proceed-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  padding: 14px 32px;
  margin: 0 auto;
  pointer-events: auto;
}

.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -42%);
}

.tap-text {
  font-family: var(--font-elegant);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-medium);
  font-style: italic;
  animation: pulse 2s ease-in-out infinite;
  transition: opacity 0.5s;
  z-index: 10;
}
.tap-text.hidden {
  opacity: 0;
  pointer-events: none;
}
.tap-icon {
  display: inline-block;
  animation: bounce 1.5s ease infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.arrow {
  display: inline-block;
  transition: transform 0.3s;
}
.proceed-btn:hover .arrow {
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .envelope-stage {
    width: min(340px, 86vw);
  }

  .photo-left {
    left: -8px;
    top: 14%;
  }

  .photo-right {
    right: -8px;
    top: 46%;
  }
}

@media (max-width: 480px) {
  .envelope-stage {
    width: min(300px, 84vw);
  }

  .floating-photo {
    width: 34vw;
    opacity: 0.85;
  }

  .photo-left {
    top: 12%;
  }

  .photo-right {
    top: 53%;
  }

  .invitation-popup {
    top: 82%;
  }
}
</style>
