<template>
  <div class="music-player" @click="toggleMusic">
    <div class="music-icon" :class="{ playing: isPlaying }">
      <div class="bar" v-for="i in 4" :key="i"></div>
    </div>
    <span class="music-label">{{ isPlaying ? '♪ Playing' : '♪ Paused' }}</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isPlaying = ref(false)
let audio = null

onMounted(() => {
  audio = new Audio('/music/bg-music.mp3')
  audio.loop = true
  audio.volume = 0.3
})

const toggleMusic = () => {
  if (!audio) return
  if (isPlaying.value) {
    audio.pause()
  } else {
    audio.play().catch(() => {})
  }
  isPlaying.value = !isPlaying.value
}
</script>

<style scoped>
.music-player {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 10px 18px;
  border-radius: 50px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
}
.music-player:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
}

.music-icon {
  display: flex;
  gap: 3px;
  align-items: flex-end;
  height: 18px;
}
.bar {
  width: 3px;
  background: var(--pastel-mauve);
  border-radius: 2px;
  height: 6px;
  transition: height 0.3s ease;
}
.music-icon.playing .bar:nth-child(1) {
  animation: musicBounce 0.5s ease infinite alternate;
  animation-delay: 0s;
}
.music-icon.playing .bar:nth-child(2) {
  animation: musicBounce 0.5s ease infinite alternate;
  animation-delay: 0.1s;
}
.music-icon.playing .bar:nth-child(3) {
  animation: musicBounce 0.5s ease infinite alternate;
  animation-delay: 0.2s;
}
.music-icon.playing .bar:nth-child(4) {
  animation: musicBounce 0.5s ease infinite alternate;
  animation-delay: 0.3s;
}

@keyframes musicBounce {
  0% { height: 4px; }
  100% { height: 18px; }
}

.music-label {
  font-family: var(--font-elegant);
  font-size: 0.85rem;
  color: var(--text-medium);
  font-style: italic;
}

@media (max-width: 480px) {
  .music-label { display: none; }
  .music-player { padding: 10px 14px; }
}
</style>
