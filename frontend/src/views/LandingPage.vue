<template>
  <div class="landing-page">
    <!-- ===== TOP SECTION: Envelope + Photos ===== -->
    <section class="envelope-section" @click="handleClick">
      <!-- Decorative Floral Corners -->
      <div class="floral-corner floral-top-left">
        <svg viewBox="0 0 120 120" fill="none">
          <path d="M10 110 Q30 60 80 40 Q50 30 20 10" stroke="var(--pastel-gold)" stroke-width="1.5" fill="none" opacity="0.4"/>
          <circle cx="25" cy="35" r="4" fill="var(--pastel-gold)" opacity="0.5"/>
          <circle cx="45" cy="20" r="3" fill="var(--pastel-mauve)" opacity="0.4"/>
          <path d="M15 80 Q25 50 50 45" stroke="var(--pastel-mauve)" stroke-width="1" fill="none" opacity="0.3"/>
          <circle cx="50" cy="45" r="2.5" fill="var(--pastel-gold)" opacity="0.3"/>
        </svg>
      </div>
      <div class="floral-corner floral-top-right">
        <svg viewBox="0 0 120 120" fill="none">
          <path d="M110 110 Q90 60 40 40 Q70 30 100 10" stroke="var(--pastel-gold)" stroke-width="1.5" fill="none" opacity="0.4"/>
          <circle cx="95" cy="35" r="4" fill="var(--pastel-gold)" opacity="0.5"/>
          <circle cx="75" cy="20" r="3" fill="var(--pastel-mauve)" opacity="0.4"/>
          <path d="M105 80 Q95 50 70 45" stroke="var(--pastel-mauve)" stroke-width="1" fill="none" opacity="0.3"/>
          <circle cx="70" cy="45" r="2.5" fill="var(--pastel-gold)" opacity="0.3"/>
        </svg>
      </div>

      <!-- Floating Sparkles -->
      <div class="sparkles-container">
        <div class="sparkle" v-for="i in 10" :key="i" :style="sparkleStyle(i)"></div>
      </div>

      <!-- Envelope -->
      <div class="envelope-wrapper" :class="{ opened: envelopeOpened }">
        <!-- Envelope Back -->
        <div class="envelope-back"></div>

        <!-- Card rising from envelope -->
        <div class="card" :class="{ risen: envelopeOpened }">
          <div class="card-inner">
            <div class="card-ornament-top">❀</div>
            <p class="card-subtitle elegant">You are cordially invited to</p>
            <p class="card-subtitle elegant">the wedding celebration of</p>
            <div class="card-divider">
              <span class="divider-ornament">✦</span>
            </div>
            <h1 class="card-names cursive">MJ&Ryan</h1>
            <p class="card-date elegant">June 04, 2026</p>
          </div>
        </div>

        <!-- Envelope Flap -->
        <div class="envelope-flap" :class="{ opened: envelopeOpened }"></div>

        <!-- Envelope Front -->
        <div class="envelope-front"></div>
      </div>

      <transition name="popup-fade">
        <div class="invitation-popup" v-if="showPhotoPopup" @click.stop>
          <button class="btn-primary proceed-btn" @click.stop="enterSite">
            Proceed to Invitation
            <span class="arrow">→</span>
          </button>
        </div>
      </transition>

      <!-- Tap prompt -->
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
  display: flex;
  flex-direction: column;
  background: var(--pastel-cream);
  overflow-x: hidden;
  position: relative;
}

.landing-page::before,
.landing-page::after {
  content: '❀';
  position: fixed;
  top: 42%;
  font-size: 2.1rem;
  color: var(--pastel-mauve);
  opacity: 0.2;
  z-index: 2;
  pointer-events: none;
}

.landing-page::before {
  left: 8px;
  animation: floralSideFloat 5.5s ease-in-out infinite;
}

.landing-page::after {
  right: 8px;
  animation: floralSideFloat 5.5s ease-in-out infinite reverse;
}

@keyframes floralSideFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* ===== TOP ENVELOPE SECTION ===== */
.envelope-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px 40px;
  background: linear-gradient(180deg, 
    #e8f0f8 0%, 
    var(--pastel-cream) 60%,
    var(--pastel-cream) 100%
  );
  cursor: pointer;
  overflow: hidden;
}

/* Floral Corners */
.floral-corner {
  position: absolute;
  width: 120px;
  height: 120px;
  pointer-events: none;
  z-index: 1;
}
.floral-top-left { top: 10px; left: 10px; }
.floral-top-right { top: 10px; right: 10px; }

/* Sparkles */
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
  100% { transform: translateY(80vh) rotate(360deg); opacity: 0; }
}

/* ===== ENVELOPE ===== */
.envelope-wrapper {
  position: relative;
  width: 320px;
  height: 220px;
  margin-bottom: 20px;
  perspective: 800px;
  z-index: 4;
  transition: transform 0.9s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.envelope-wrapper.opened {
  transform: translateY(-6px);
}

.envelope-back {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #7ca8cd, #6b9ac2);
  border-radius: 8px;
  box-shadow: 0 10px 50px rgba(30, 70, 120, 0.2);
}

.envelope-front {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 55%;
  background: linear-gradient(180deg, #a2c4de, #90b8d4);
  border-radius: 0 0 8px 8px;
  z-index: 4;
}
.envelope-front::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0;
  border-left: 160px solid transparent;
  border-right: 160px solid transparent;
  border-top: 80px solid #a2c4de;
  z-index: 2;
  transform: translateY(-100%);
}

/* Flap */
.envelope-flap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(180deg, #b8d4e8, #a2c4de);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  z-index: 4;
  transform-origin: top center;
  transition: transform 0.95s cubic-bezier(0.22, 1, 0.36, 1);
}
.envelope-flap.opened {
  transform: rotateX(180deg);
  z-index: 1;
}

/* Card */
.card {
  position: absolute;
  top: 55%;
  left: 8%;
  right: 8%;
  height: 65%;
  background: linear-gradient(135deg, #fffff8, #fafcff);
  border-radius: 6px;
  z-index: 6;
  transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.35s;
  box-shadow: 0 2px 12px rgba(30, 60, 100, 0.08);
  overflow: hidden;
}
.card.risen {
  transform: translateY(-130%);
}

.invitation-popup {
  position: absolute;
  top: 64%;
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
  font-size: 1rem;
  padding: 12px 26px;
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
  transform: translate(-50%, -46%);
}

.card-inner {
  padding: 18px 14px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.card-ornament-top {
  font-size: 1.2rem;
  color: var(--pastel-mauve);
  margin-bottom: 2px;
}
.card-subtitle {
  font-size: 0.8rem;
  color: var(--text-light);
  line-height: 1.4;
}
.card-divider { margin: 4px 0; }
.divider-ornament {
  color: var(--pastel-gold);
  font-size: 0.85rem;
}
.card-names {
  font-size: 1.8rem;
  color: var(--text-accent);
  line-height: 1.2;
}
.card-date {
  font-size: 0.9rem;
  color: var(--text-medium);
  letter-spacing: 2px;
  font-weight: 500;
}

/* Tap Text */
.tap-text {
  font-family: var(--font-elegant);
  font-size: 1rem;
  color: var(--text-light);
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

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .envelope-section { min-height: 100vh; padding: 40px 16px 30px; }
}

@media (max-width: 480px) {
  .envelope-wrapper { width: 280px; height: 190px; }
  .envelope-front::before {
    border-left-width: 140px;
    border-right-width: 140px;
    border-top-width: 70px;
  }
  .card-names { font-size: 1.5rem; }
  .floral-corner { width: 80px; height: 80px; }
  .invitation-popup {
    top: 68%;
  }
  .landing-page::before,
  .landing-page::after { display: none; }
}
</style>
