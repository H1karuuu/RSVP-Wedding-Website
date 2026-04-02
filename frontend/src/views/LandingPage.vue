<template>
  <div class="landing-page">
    <section class="envelope-section" @click="handleClick">
      <div class="sparkles-container" aria-hidden="true">
        <div class="sparkle" v-for="i in 12" :key="i" :style="sparkleStyle(i)"></div>
      </div>

      <transition name="surprise-fade">
        <div class="surprise-photos" v-if="envelopeOpened" aria-hidden="true">
          <div class="floating-photo photo-left">
            <img src="/photos/prenup-8.jpg" alt="" loading="lazy" />
          </div>

          <div class="floating-photo photo-right">
            <img src="/photos/prenup-10.jpg" alt="" loading="lazy" />
          </div>

          <div class="floating-photo photo-center">
            <img src="/photos/prenup-6.jpg" alt="" loading="lazy" />
          </div>
        </div>
      </transition>

      <div class="envelope-stage" :class="{ opened: envelopeOpened }">
        <img
          class="envelope-closed"
          src="/photos/Closed_Enve.png"
          alt="Closed envelope"
          loading="eager"
        />

        <img
          class="envelope-open"
          src="/photos/Open_Enve.png"
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

      <p class="browser-note" :class="{ hidden: envelopeOpened }">
        Best viewed in your phone browser (Safari or Chrome) for a smoother experience.
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
  min-height: 100svh;
  background:
    radial-gradient(circle at top, rgba(199, 220, 241, 0.6), rgba(235, 242, 249, 0.95) 45%, #f0f4f8 100%);
  overflow-x: hidden;
}

.envelope-section {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
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
  width: min(520px, 92vw);
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
.envelope-open {
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
  z-index: 2;
  transform: translateY(6px) scale(0.94);
  transition: opacity 0.45s ease, transform 0.7s ease;
}

.opened .envelope-closed {
  opacity: 0;
}

.opened .envelope-open {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.surprise-photos {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}

.floating-photo {
  position: absolute;
  width: min(220px, 28vw);
  border-radius: 18px;
  border: 6px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 20px 44px rgba(23, 45, 74, 0.24);
  overflow: hidden;
  z-index: 6;
}

.floating-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.photo-left {
  left: 18%;
  top: 28%;
  transform: rotate(-8deg) translateY(-8px);
}

.photo-right {
  right: 18%;
  top: 31%;
  transform: rotate(8deg) translateY(-8px);
}

.photo-center {
  left: 50%;
  top: 13%;
  width: min(236px, 30vw);
  transform: translateX(-50%) rotate(1.5deg) translateY(-16px);
}

.surprise-fade-enter-active,
.surprise-fade-leave-active {
  transition: opacity 0.45s ease, transform 0.45s ease;
}

.surprise-fade-enter-from,
.surprise-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
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
  color: #4a6788;
  font-style: italic;
  animation: pulse 2s ease-in-out infinite;
  transition: opacity 0.5s;
  z-index: 10;
  margin-top: 220px;
}
.tap-text.hidden {
  opacity: 0;
  pointer-events: none;
}
.tap-icon {
  display: inline-block;
  animation: bounce 1.5s ease infinite;
}

.browser-note {
  max-width: 420px;
  text-align: center;
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: rgba(65, 92, 120, 0.95);
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(111, 144, 177, 0.28);
  border-radius: 12px;
  padding: 9px 14px;
  backdrop-filter: blur(2px);
  z-index: 10;
  transition: opacity 0.5s;
}

.browser-note.hidden {
  opacity: 0;
  pointer-events: none;
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
    width: min(410px, 94vw);
  }

  .floating-photo {
    width: min(170px, 32vw);
  }

  .photo-left {
    left: 4%;
    top: 24%;
  }

  .photo-right {
    right: 4%;
    top: 39%;
  }

  .photo-center {
    top: 10%;
    width: min(180px, 34vw);
  }
}

@media (max-width: 480px) {
  .envelope-stage {
    width: min(350px, 95vw);
  }

  .floating-photo {
    width: 36vw;
    opacity: 0.92;
  }

  .photo-left {
    left: 2%;
    top: 24%;
  }

  .photo-right {
    right: 2%;
    top: 42%;
  }

  .photo-center {
    top: 12%;
    width: 42vw;
  }

  .invitation-popup {
    top: 82%;
  }

  .browser-note {
    max-width: 90vw;
    font-size: 0.88rem;
  }
}
</style>
