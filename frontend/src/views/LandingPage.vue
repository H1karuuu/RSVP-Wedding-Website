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

      <!-- Polaroid Photos scattered around envelope -->
      <div class="polaroid-photos" :class="{ 'photos-aside': envelopeOpened }">
        <div class="polaroid polaroid-1">
          <div class="polaroid-inner">
            <img :src="photoSrc(1)" alt="MJ & Ryan" @error="handleImgError" />
          </div>
        </div>
        <div class="polaroid polaroid-2">
          <div class="polaroid-inner">
            <img :src="photoSrc(2)" alt="MJ & Ryan" @error="handleImgError" />
          </div>
        </div>
        <div class="polaroid polaroid-3">
          <div class="polaroid-inner">
            <img :src="photoSrc(3)" alt="MJ & Ryan" @error="handleImgError" />
          </div>
        </div>
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
            <h1 class="card-names cursive">MJ & Ryan</h1>
            <p class="card-date elegant">June 04, 2026</p>
          </div>
        </div>

        <!-- Envelope Flap -->
        <div class="envelope-flap" :class="{ opened: envelopeOpened }"></div>

        <!-- Envelope Front -->
        <div class="envelope-front"></div>
      </div>

      <!-- Tap prompt -->
      <p class="tap-text" :class="{ hidden: envelopeOpened }">
        <span class="tap-icon">✉</span> Tap to open your invitation
      </p>
    </section>

    <!-- ===== BOTTOM SECTION: Names + Enter ===== -->
    <section class="names-section" :class="{ visible: envelopeOpened }">
      <div class="names-content">
        <div class="names-ornament">— ✦ —</div>
        <h1 class="couple-names cursive">MJ & Ryan</h1>
        <p class="wedding-date elegant">June 04, 2026 &bull; Thursday</p>
        <p class="wedding-tagline elegant">"Two hearts, one love"</p>
        <p class="wedding-hashtag elegant">#GodsentTheRYghtOneForMJ</p>

        <transition name="fade-up">
          <button v-if="showEnterBtn" class="enter-btn btn-primary" @click.stop="enterSite">
            Open Invitation
            <span class="arrow">→</span>
          </button>
        </transition>
      </div>
    </section>
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

// Dynamic src so Vite won't try to resolve at build time
const photoSrc = (n) => `/photos/couple-${n}.jpg`

const handleImgError = (e) => {
  // Hide broken image gracefully
  e.target.parentElement.parentElement.style.opacity = '0'
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
}

/* ===== TOP ENVELOPE SECTION ===== */
.envelope-section {
  position: relative;
  min-height: 75vh;
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

/* ===== POLAROID PHOTOS ===== */
.polaroid-photos {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;
  transition: all 0.8s ease;
}
.polaroid-photos.photos-aside {
  opacity: 0.5;
  transform: scale(0.95);
}

.polaroid {
  position: absolute;
  background: #fff;
  padding: 6px 6px 24px 6px;
  border-radius: 2px;
  box-shadow: 0 4px 20px rgba(30, 60, 100, 0.15), 0 1px 4px rgba(0,0,0,0.08);
  transition: transform 0.5s ease, opacity 0.5s ease;
}
.polaroid-inner {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 1px;
  background: var(--pastel-blue);
}
.polaroid-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.polaroid-1 {
  width: 110px;
  height: 130px;
  top: 18%;
  right: 8%;
  transform: rotate(8deg);
  animation: floatPolaroid1 5s ease-in-out infinite;
  z-index: 6;
}
.polaroid-2 {
  width: 100px;
  height: 120px;
  top: 12%;
  right: 22%;
  transform: rotate(-5deg);
  animation: floatPolaroid2 6s ease-in-out infinite;
  z-index: 7;
}
.polaroid-3 {
  width: 90px;
  height: 110px;
  top: 30%;
  right: 5%;
  transform: rotate(-12deg);
  animation: floatPolaroid3 7s ease-in-out infinite;
  z-index: 5;
}

@keyframes floatPolaroid1 {
  0%, 100% { transform: rotate(8deg) translateY(0); }
  50% { transform: rotate(8deg) translateY(-6px); }
}
@keyframes floatPolaroid2 {
  0%, 100% { transform: rotate(-5deg) translateY(0); }
  50% { transform: rotate(-5deg) translateY(-8px); }
}
@keyframes floatPolaroid3 {
  0%, 100% { transform: rotate(-12deg) translateY(0); }
  50% { transform: rotate(-12deg) translateY(-5px); }
}

/* ===== ENVELOPE ===== */
.envelope-wrapper {
  position: relative;
  width: 320px;
  height: 220px;
  margin-bottom: 20px;
  perspective: 800px;
  z-index: 4;
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
  background: linear-gradient(135deg, #fffff8, #fafcff);
  border-radius: 6px;
  z-index: 2;
  transition: transform 0.8s ease-in-out 0.4s;
  box-shadow: 0 2px 12px rgba(30, 60, 100, 0.08);
  overflow: hidden;
}
.card.risen {
  transform: translateY(-85%);
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

/* ===== BOTTOM NAMES SECTION ===== */
.names-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px 60px;
  background: var(--pastel-cream);
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1s ease 0.6s, transform 1s ease 0.6s;
}
.names-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.names-content {
  text-align: center;
}
.names-ornament {
  font-family: var(--font-elegant);
  font-size: 1rem;
  color: var(--pastel-gold);
  letter-spacing: 6px;
  margin-bottom: 12px;
  opacity: 0.7;
}
.couple-names {
  font-size: 4rem;
  color: var(--text-accent);
  line-height: 1.1;
  margin-bottom: 12px;
}
.wedding-date {
  font-size: 1.2rem;
  color: var(--text-medium);
  letter-spacing: 3px;
  margin-bottom: 6px;
}
.wedding-tagline {
  font-size: 1rem;
  color: var(--text-light);
  font-style: italic;
  margin-bottom: 8px;
}
.wedding-hashtag {
  font-size: 1.1rem;
  color: var(--pastel-gold);
  letter-spacing: 1px;
  font-weight: 600;
  margin-bottom: 24px;
  opacity: 0.85;
}

/* Enter Button */
.enter-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  z-index: 2;
}
.arrow {
  display: inline-block;
  transition: transform 0.3s;
}
.enter-btn:hover .arrow {
  transform: translateX(4px);
}

/* Transitions */
.fade-up-enter-active { transition: all 0.8s ease; }
.fade-up-enter-from { opacity: 0; transform: translateY(20px); }

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .envelope-section { min-height: 65vh; padding: 40px 16px 30px; }
  .polaroid-1 { width: 90px; height: 105px; top: 10%; right: 5%; }
  .polaroid-2 { width: 80px; height: 95px; top: 5%; right: 20%; }
  .polaroid-3 { width: 75px; height: 90px; top: 25%; right: 2%; }
  .couple-names { font-size: 3rem; }
}

@media (max-width: 480px) {
  .envelope-wrapper { width: 280px; height: 190px; }
  .envelope-front::before {
    border-left-width: 140px;
    border-right-width: 140px;
    border-top-width: 70px;
  }
  .card-names { font-size: 1.5rem; }
  .polaroid-1 { width: 75px; height: 90px; top: 8%; right: 3%; }
  .polaroid-2 { width: 70px; height: 85px; top: 2%; right: 18%; }
  .polaroid-3 { width: 65px; height: 80px; top: 22%; right: 1%; }
  .couple-names { font-size: 2.5rem; }
  .floral-corner { width: 80px; height: 80px; }
}
</style>
