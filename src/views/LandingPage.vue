<template>
  <div class="landing-page" @click="handleClick">
    <!-- Floating Petals Background -->
    <div class="petals-container">
      <div class="petal" v-for="i in 12" :key="i" :style="petalStyle(i)"></div>
    </div>

    <!-- Envelope Container -->
    <div class="envelope-wrapper" :class="{ opened: envelopeOpened }">
      <!-- Envelope Back -->
      <div class="envelope-back"></div>

      <!-- Card that rises from envelope -->
      <div class="card" :class="{ risen: envelopeOpened }">
        <div class="card-inner">
          <p class="card-subtitle elegant">You are cordially invited to</p>
          <p class="card-subtitle elegant">the wedding celebration of</p>
          <div class="card-divider">
            <span class="divider-ornament">✦</span>
          </div>
          <h1 class="card-names cursive">Groom & Bride</h1>
          <p class="card-date elegant">June 04, 2026</p>
          <div class="card-rings">💍</div>
        </div>
      </div>

      <!-- Envelope Front (flap) -->
      <div class="envelope-flap" :class="{ opened: envelopeOpened }"></div>

      <!-- Envelope Front Body -->
      <div class="envelope-front"></div>
    </div>

    <!-- Tap to Open Text -->
    <p class="tap-text" :class="{ hidden: envelopeOpened }">
      <span class="tap-icon">✉</span> Tap to open your invitation
    </p>

    <!-- Enter Button (after opening) -->
    <transition name="fade-up">
      <button v-if="showEnterBtn" class="enter-btn btn-primary" @click.stop="enterSite">
        Open Invitation
        <span class="arrow">→</span>
      </button>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const envelopeOpened = ref(false)
const showEnterBtn = ref(false)

const handleClick = () => {
  if (!envelopeOpened.value) {
    envelopeOpened.value = true
    setTimeout(() => {
      showEnterBtn.value = true
    }, 1200)
  }
}

const enterSite = () => {
  router.push('/home')
}

const petalStyle = (i) => ({
  left: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 6}s`,
  animationDuration: `${6 + Math.random() * 6}s`,
  opacity: 0.3 + Math.random() * 0.4,
  fontSize: `${12 + Math.random() * 14}px`,
})
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--pastel-blush) 0%, var(--pastel-cream) 40%, var(--pastel-lavender) 100%);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

/* ===== PETALS ===== */
.petals-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.petal {
  position: absolute;
  top: -30px;
  animation: petalFall linear infinite;
}
.petal::after {
  content: '🌸';
  font-size: inherit;
}
@keyframes petalFall {
  0% {
    transform: translateY(-10vh) rotate(0deg) translateX(0);
    opacity: 0;
  }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% {
    transform: translateY(110vh) rotate(720deg) translateX(80px);
    opacity: 0;
  }
}

/* ===== ENVELOPE ===== */
.envelope-wrapper {
  position: relative;
  width: 320px;
  height: 220px;
  margin-bottom: 30px;
  perspective: 800px;
}

.envelope-back {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #e8d5c4, #d4bfae);
  border-radius: 6px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.1);
}

.envelope-front {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 55%;
  background: linear-gradient(180deg, #f0ddd0, #e8cdbf);
  border-radius: 0 0 6px 6px;
  z-index: 3;
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
  border-top: 80px solid #f0ddd0;
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
  background: linear-gradient(180deg, #f5e6da, #eed8c8);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  z-index: 4;
  transform-origin: top center;
  transition: transform 0.8s ease-in-out;
}
.envelope-flap.opened {
  transform: rotateX(180deg);
  z-index: 1;
}

/* Card */
.card {
  position: absolute;
  top: 20%;
  left: 8%;
  right: 8%;
  height: 85%;
  background: linear-gradient(135deg, #fffaf5, #fff5ee);
  border-radius: 4px;
  z-index: 2;
  transition: transform 0.8s ease-in-out 0.4s;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}
.card.risen {
  transform: translateY(-85%);
}

.card-inner {
  padding: 24px 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.card-subtitle {
  font-size: 0.85rem;
  color: var(--text-light);
  line-height: 1.4;
}

.card-divider {
  margin: 6px 0;
}
.divider-ornament {
  color: var(--pastel-gold);
  font-size: 0.9rem;
}

.card-names {
  font-size: 2rem;
  color: var(--text-accent);
  line-height: 1.2;
}

.card-date {
  font-size: 1rem;
  color: var(--text-medium);
  letter-spacing: 2px;
  font-weight: 500;
}

.card-rings {
  font-size: 1.5rem;
  margin-top: 4px;
}

/* Tap Text */
.tap-text {
  font-family: var(--font-elegant);
  font-size: 1rem;
  color: var(--text-light);
  font-style: italic;
  animation: pulse 2s ease-in-out infinite;
  transition: opacity 0.5s;
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

/* Enter Button */
.enter-btn {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.arrow {
  display: inline-block;
  transition: transform 0.3s;
}
.enter-btn:hover .arrow {
  transform: translateX(4px);
}

/* Transitions */
.fade-up-enter-active {
  transition: all 0.8s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 480px) {
  .envelope-wrapper {
    width: 280px;
    height: 190px;
  }
  .envelope-front::before {
    border-left-width: 140px;
    border-right-width: 140px;
    border-top-width: 70px;
  }
  .card-names {
    font-size: 1.6rem;
  }
}
</style>
