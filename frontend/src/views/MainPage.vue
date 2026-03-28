<template>
  <div class="main-page">
    <!-- ===== HERO SECTION ===== -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <p class="hero-subtitle elegant">Together with their families</p>
        <h1 class="hero-names cursive">MJ&Ryan</h1>
        <div class="hero-divider">
          <span class="ornament">—</span>
          <span class="ornament-center">♡</span>
          <span class="ornament">—</span>
        </div>
        <p class="hero-date elegant">June 04, 2026 &bull; Thursday</p>
        <p class="hero-tagline elegant">"Two souls, one heart"</p>
        <p class="hero-hashtag elegant">#GODsentTheRYghtoneforMJ</p>
      </div>
      <div class="scroll-indicator">
        <div class="scroll-arrow"></div>
      </div>
    </section>

    <div class="forever-background">
      <!-- ===== COUNTDOWN SECTION ===== -->
      <section id="save-the-date" class="countdown-section fade-in-section" ref="countdownSection">
        <div class="container">
          <h2 class="section-title">Save the Date</h2>
          <p class="section-subtitle">Counting down to our forever</p>

          <div class="save-date-layout">
            <div class="countdown-panel">
              <p class="panel-kicker">Wedding Countdown</p>
              <div class="countdown-grid">
                <div class="countdown-item" v-for="item in countdownItems" :key="item.label">
                  <div class="countdown-number">{{ item.value }}</div>
                  <div class="countdown-label">{{ item.label }}</div>
                </div>
              </div>
              <p class="countdown-date elegant">June 04, 2026</p>
            </div>

            <div class="calendar-panel">
              <p class="panel-kicker">Calendar</p>
              <h3 class="calendar-title elegant">{{ calendarMonthLabel }}</h3>
              <div class="calendar-weekdays">
                <span v-for="weekday in weekDays" :key="weekday">{{ weekday }}</span>
              </div>
              <div class="calendar-grid">
                <span
                  v-for="(day, index) in calendarDays"
                  :key="`${day.value || 'empty'}-${index}`"
                  :class="['calendar-day', { muted: !day.value, wedding: day.value === 4 }]"
                >
                  {{ day.value }}
                </span>
              </div>
              <button class="btn-outline calendar-btn" type="button">Add to Calendar</button>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== OUR STORY SECTION ===== -->
      <section id="our-story" class="story-section fade-in-section" ref="storySection">
        <div class="container story-shell">
          <h2 class="section-title">Our Love Story</h2>
          <p class="section-subtitle">A journey that led us to forever</p>

          <div class="timeline">
            <div class="timeline-item" v-for="(event, index) in storyTimeline" :key="index">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h3 class="timeline-title cursive">{{ event.title }}</h3>
                <p class="timeline-date elegant">{{ event.date }}</p>
                <p class="timeline-desc">{{ event.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- ===== GALLERY SECTION ===== -->
    <section id="gallery" class="gallery-section fade-in-section" ref="gallerySection">
      <div class="container">
        <h2 class="section-title">Our Moments</h2>
        <p class="section-subtitle">Prenup photos &amp; memories</p>

        <div class="gallery-grid">
          <div
            class="gallery-item"
            v-for="(photo, index) in galleryPhotos"
            :key="index"
            :class="[photo.size, photo.layout]"
            @click="openLightbox(index)"
          >
            <img :src="photo.src" :alt="photo.alt" loading="lazy" />
            <div class="gallery-overlay">
              <span class="gallery-zoom">✦</span>
            </div>
          </div>
        </div>

        <!-- Video Embed Placeholder -->
        <div class="video-section" v-if="videoUrl">
          <h3 class="cursive video-title">Our Prenup Video</h3>
          <div class="video-wrapper">
            <iframe
              :src="videoUrl"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== LIGHTBOX ===== -->
    <transition name="fade">
      <div class="lightbox" v-if="lightboxOpen" @click="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox">&times;</button>
        <button class="lightbox-prev" @click.stop="prevPhoto">‹</button>
        <img :src="galleryPhotos[lightboxIndex]?.src" class="lightbox-img" @click.stop />
        <button class="lightbox-next" @click.stop="nextPhoto">›</button>
      </div>
    </transition>

    <!-- ===== WEDDING DETAILS SECTION ===== -->
    <section id="details" class="details-section fade-in-section" ref="detailsSection">
      <div class="container">
        <h2 class="section-title">Wedding Details</h2>
        <p class="section-subtitle">We would be honored by your presence</p>

        <div class="details-grid">
          <!-- Ceremony -->
          <div class="detail-card ceremony-card">
            <div class="detail-body">
              <div class="detail-content">
                <div class="venue-photo-shell">
                  <img src="/photos/Ceremony.png" alt="Ceremony venue" loading="lazy" />
                </div>
                <h3 class="detail-title split-title cursive"><span>C</span>eremony</h3>
                <p class="detail-time elegant">2:00 PM Ceremony Start</p>
                <p class="detail-venue">Sto. Nino de Taguig Parish Church</p>
                <p class="detail-address">{{ ceremonyAddress }}</p>
                <a
                  :href="ceremonyMapUrl"
                  target="_blank"
                  class="btn-outline detail-btn"
                >
                  View Map
                </a>
              </div>
            </div>
          </div>

          <!-- Reception -->
          <div class="detail-card reception-card">
            <div class="detail-body">
              <div class="detail-content">
                <div class="venue-photo-shell">
                  <img src="/photos/Reception1.jpg" alt="Reception venue" loading="lazy" />
                </div>
                <h3 class="detail-title split-title cursive"><span>R</span>eception</h3>
                <p class="detail-time elegant">5:00 PM Reception Program</p>
                <p class="detail-venue">Alta Guia</p>
                <p class="detail-address">{{ receptionAddress }}</p>
                <a
                  :href="receptionMapUrl"
                  target="_blank"
                  class="btn-outline detail-btn"
                >
                  View Map
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- QR Codes -->
        <div class="qr-section">
          <h3 class="cursive qr-title">Scan for Directions</h3>
          <div class="qr-grid">
            <div class="qr-item">
              <QrcodeVue :value="ceremonyMapUrl" :size="150" level="M" />
              <p class="qr-label elegant">Ceremony</p>
              <p class="qr-address">{{ ceremonyAddress }}</p>
            </div>
            <div class="qr-item">
              <QrcodeVue :value="receptionMapUrl" :size="150" level="M" />
              <p class="qr-label elegant">Reception</p>
              <p class="qr-address">{{ receptionAddress }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== WEDDING ENTOURAGE SECTION ===== -->
    <section id="entourage" class="entourage-section fade-in-section" ref="entourageSection">
      <div class="container">
        <h2 class="section-title">Wedding Entourage</h2>
        <p class="section-subtitle">The people who will stand by us on our special day</p>

        <div class="entourage-group">
          <h3 class="entourage-group-title cursive">Immediate Family</h3>
          <div class="entourage-pair">
            <div class="entourage-role-card">
              <h4 class="role-title">Groom Side</h4>
              <p class="role-name elegant" v-for="member in groomFamily" :key="member.role + member.name">{{ member.role }}: {{ member.name }}</p>
            </div>
            <div class="entourage-role-card">
              <h4 class="role-title">Bride Side</h4>
              <p class="role-name elegant" v-for="member in brideFamily" :key="member.role + member.name">{{ member.role }}: {{ member.name }}</p>
            </div>
          </div>
        </div>

        <!-- Primary Sponsors -->
        <div class="entourage-group">
          <h3 class="entourage-group-title cursive">Our Principal Sponsors</h3>
          <p class="entourage-group-subtitle elegant">To witness our union...</p>
          <div class="sponsors-grid">
            <div class="sponsor-column">
              <div class="sponsor-name elegant" v-for="sponsor in principalSponsors.left" :key="sponsor">{{ sponsor }}</div>
            </div>
            <div class="sponsor-column">
              <div class="sponsor-name elegant" v-for="sponsor in principalSponsors.right" :key="sponsor">{{ sponsor }}</div>
            </div>
          </div>
        </div>

        <!-- Secondary Sponsors -->
        <div class="entourage-group">
          <h3 class="entourage-group-title cursive">Our Secondary Sponsors</h3>
          <p class="entourage-group-subtitle elegant">To assist us in our needs...</p>

          <div class="secondary-sponsor-grid">
            <p class="role-name elegant" v-for="sponsor in secondarySponsors" :key="sponsor">{{ sponsor }}</p>
          </div>

          <div class="bestman-row">
            <div class="entourage-role-card">
              <h4 class="role-title">Best Man</h4>
              <p class="role-name elegant">{{ bestMan }}</p>
            </div>
          </div>

          <div class="entourage-pair honor-pair">
            <div class="entourage-role-card">
              <h4 class="role-title">Maid of Honor</h4>
              <p class="role-name elegant">{{ maidOfHonor }}</p>
            </div>
            <div class="entourage-role-card">
              <h4 class="role-title">Maiden of Honor</h4>
              <p class="role-name elegant">{{ maidenOfHonor }}</p>
            </div>
          </div>

          <p class="entourage-caption elegant">To guide us on our way...</p>

          <!-- Groomsmen & Bridesmaids -->
          <div class="entourage-pair">
            <div class="entourage-role-card">
              <h4 class="role-title">Groomsmen</h4>
              <p class="role-name elegant" v-for="name in groomsmen" :key="name">Mr. {{ name }}</p>
            </div>
            <div class="entourage-role-card">
              <h4 class="role-title">Bridesmaids</h4>
              <p class="role-name elegant" v-for="name in bridesmaids" :key="name">Ms. {{ name }}</p>
            </div>
          </div>

          <!-- Candle, Veil, Cord -->
          <div class="entourage-trio">
            <div class="entourage-role-card">
              <h4 class="role-title">Candle</h4>
              <p class="entourage-caption elegant">To light up our path...</p>
              <p class="role-name elegant" v-for="name in candle" :key="name">{{ name }}</p>
            </div>
            <div class="entourage-role-card">
              <h4 class="role-title">Veil</h4>
              <p class="entourage-caption elegant">To clothe us as one...</p>
              <p class="role-name elegant" v-for="name in veil" :key="name">{{ name }}</p>
            </div>
            <div class="entourage-role-card">
              <h4 class="role-title">Cord</h4>
              <p class="entourage-caption elegant">To bind us together...</p>
              <p class="role-name elegant" v-for="name in cord" :key="name">{{ name }}</p>
            </div>
          </div>
        </div>

        <!-- Symbol Bearers -->
        <div class="entourage-group">
          <h3 class="entourage-group-title cursive">Our Symbol Bearers</h3>
          <p class="entourage-group-subtitle elegant">To carry our symbols of Love, Treasure, and Faith...</p>
          <div class="bearers-grid">
            <div class="bearer-item" v-for="bearer in symbolBearers" :key="bearer.role">
              <h4 class="role-title">{{ bearer.role }}</h4>
              <p class="role-name elegant" v-for="name in bearer.names" :key="bearer.role + name">{{ name }}</p>
            </div>
          </div>
        </div>

        <div class="entourage-group">
          <h3 class="entourage-group-title cursive">Singer</h3>
          <div class="bestman-row">
            <div class="entourage-role-card">
              <h4 class="role-title">Singer</h4>
              <p class="role-name elegant">{{ singer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== DRESS CODE SECTION ===== -->
    <section id="dress-code" class="dresscode-section fade-in-section" ref="dresscodeSection">
      <div class="container">
        <h2 class="section-title">Dress Code</h2>
        <p class="section-subtitle">Guests: Ladies (Maxi Dress/Long Gown), Gentlemen (Barong/Black Slacks)</p>
        <p class="dress-theme-line elegant">Attire: Formal &amp; Semi-Formal | Theme: Church Wedding</p>

        <div class="motif-role-grid">
          <div class="motif-role-card" v-for="role in colorMotifByRole" :key="role.role">
            <div class="motif-role-head">
              <span class="motif-figure" aria-hidden="true">{{ role.figure }}</span>
              <h3 class="motif-role-title elegant">{{ role.role }}</h3>
            </div>

            <div class="motif-swatches">
              <div
                class="motif-swatch"
                v-for="color in role.colors"
                :key="`${role.role}-${color.name}`"
                :style="{ background: color.hex }"
              >
                <span class="swatch-name" :style="{ color: color.textColor }">{{ color.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="dresscode-notes">
          <p class="elegant dresscode-note">Color motif is grouped by role for easier coordination.</p>
          <p class="elegant dresscode-note">For entourage attire pegs, the bride and groom will message separately.</p>
        </div>
      </div>
    </section>

    <!-- ===== RSVP CTA SECTION ===== -->
    <section class="rsvp-cta-section fade-in-section" ref="rsvpCtaSection">
      <div class="container rsvp-cta-content">
        <h2 class="section-title" style="color: #fff;">RSVP</h2>
        <p class="rsvp-cta-text elegant">Kindly let us know if you can make it to our special day on or before May 1, 2026.</p>
        <router-link to="/rsvp" class="btn-primary rsvp-cta-btn">
          Respond Now
        </router-link>
      </div>
    </section>

    <!-- ===== FOOTER ===== -->
    <footer class="footer">
      <div class="container">
        <div class="footer-hearts">♡ ♡ ♡</div>
        <p class="footer-names cursive">MJ&Ryan</p>
        <p class="footer-date elegant">June 04, 2026</p>
        <p class="footer-hashtag elegant">#GODsentTheRYghtoneforMJ</p>
        <div class="footer-divider"></div>
        <p class="footer-made">Made with ♡ by <strong>JC Lopez</strong></p>
        <p class="footer-copy">&copy; 2026 All rights reserved</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import QrcodeVue from 'qrcode.vue'

// ===== COUNTDOWN =====
const weddingDate = new Date('2026-06-04T14:00:00')
const now = ref(new Date())
let countdownInterval

const countdownItems = computed(() => {
  const diff = weddingDate - now.value
  if (diff <= 0) return [
    { value: '0', label: 'Days' },
    { value: '0', label: 'Hours' },
    { value: '0', label: 'Minutes' },
    { value: '0', label: 'Seconds' }
  ]
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return [
    { value: String(days).padStart(2, '0'), label: 'Days' },
    { value: String(hours).padStart(2, '0'), label: 'Hours' },
    { value: String(minutes).padStart(2, '0'), label: 'Minutes' },
    { value: String(seconds).padStart(2, '0'), label: 'Seconds' }
  ]
})

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const calendarMonthLabel = 'June 2026'
const calendarDays = computed(() => {
  const firstDay = new Date('2026-06-01T00:00:00')
  const daysInMonth = new Date(2026, 6, 0).getDate()
  const startWeekday = firstDay.getDay()
  const cells = []

  for (let i = 0; i < startWeekday; i += 1) {
    cells.push({ value: '' })
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ value: day })
  }

  while (cells.length % 7 !== 0) {
    cells.push({ value: '' })
  }

  return cells
})

// ===== OUR STORY TIMELINE =====
const storyTimeline = ref([
  {
    title: 'How We Met',
    date: 'Month, Year',
    description: 'Write your story here — how did you two first meet? Replace this text with your own love story.'
  },
  {
    title: 'First Date',
    date: 'Month, Year',
    description: 'Describe your first date together. Where did you go? What made it special?'
  },
  {
    title: 'The Proposal',
    date: 'Month, Year',
    description: 'Tell the story of the proposal. How did it happen? Was it a surprise?'
  },
  {
    title: 'The Wedding',
    date: 'June 04, 2026',
    description: 'And the journey continues… We can\'t wait to celebrate our love with you!'
  }
])

// ===== GALLERY =====
const galleryPhotos = ref([
  { src: '/photos/prenup-1.jpg', alt: 'Prenup Photo 1', size: '', layout: 'tile-a' },
  { src: '/photos/prenup-2.jpg', alt: 'Prenup Photo 2', size: '', layout: 'tile-b' },
  { src: '/photos/prenup-3.jpg', alt: 'Prenup Photo 3', size: '', layout: 'tile-c' },
  { src: '/photos/prenup-4.jpg', alt: 'Prenup Photo 4', size: '', layout: 'tile-d' },
  { src: '/photos/prenup-5.jpg', alt: 'Prenup Photo 5', size: '', layout: 'tile-e' },
  { src: '/photos/prenup-6.jpg', alt: 'Prenup Photo 6', size: '', layout: 'tile-center' },
  { src: '/photos/prenup-8.jpg', alt: 'Prenup Photo 8', size: '', layout: 'tile-f' },
  { src: '/photos/prenup-9.jpg', alt: 'Prenup Photo 9', size: '', layout: 'tile-g' },
  { src: '/photos/prenup-10.jpg', alt: 'Prenup Photo 10', size: '', layout: 'tile-h' },
])

const videoUrl = ref('') // e.g. 'https://www.youtube.com/embed/YOUR_VIDEO_ID'

// Lightbox
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

const openLightbox = (index) => {
  lightboxIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}
const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}
const nextPhoto = () => {
  lightboxIndex.value = (lightboxIndex.value + 1) % galleryPhotos.value.length
}
const prevPhoto = () => {
  lightboxIndex.value = (lightboxIndex.value - 1 + galleryPhotos.value.length) % galleryPhotos.value.length
}

// ===== MAP URLS =====
const ceremonyAddress = 'Sto. Nino de Taguig Parish Church (14.514415496368652, 121.05402886441746)'
const receptionAddress = 'Alta Guia (14.535985252005055, 121.06984540859224)'

const ceremonyMapUrl = 'https://www.google.com/maps/place/Sto.+Ni%C3%B1o+de+Taguig+Parish+Church/@14.5142597,121.0540235,17z/data=!4m14!1m7!3m6!1s0x3397cf35a861e809:0x815fd8cee6629c1!2sSto.+Ni%C3%B1o+de+Taguig+Parish+Church!8m2!3d14.5142597!4d121.0540235!16s%2Fg%2F1vzf_sm2!3m5!1s0x3397cf35a861e809:0x815fd8cee6629c1!8m2!3d14.5142597!4d121.0540235!16s%2Fg%2F1vzf_sm2!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D'
const receptionMapUrl = 'https://www.google.com/maps/place/Alta+Guia/@14.5358087,121.0697864,17z/data=!3m1!4b1!4m6!3m5!1s0x3397c8a409ed2663:0x7d875bff9f39c74c!8m2!3d14.5358087!4d121.0697864!16s%2Fg%2F1hc1snyhm!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D'

// ===== WEDDING ENTOURAGE =====
const groomFamily = ref([
  { role: 'Mother', name: 'Jeanne Lopez' },
  { role: 'Father', name: 'Arnulfo Lopez' }
])

const brideFamily = ref([
  { role: 'Mother', name: 'Concepcion Villa' },
  { role: 'Brother', name: 'Rogelio Villa Jr' }
])

const principalSponsors = ref({
  left: [
    'Teodora Robles',
    'Victor Robles',
    'Jerome Delos Santos',
    'Nelda Delos Santos',
    'Angel Almirañez',
    'Alex Almirañez',
    'Maan Zuñiga',
    'Jimmy Zuñiga',
    'Joel Zuñiga',
    'Less Zuñiga'
  ],
  right: [
    'Rolando Pasia',
    'Vilma Lopez Pasia',
    'Lilibeth Villa Antonio',
    'Nestor Antonio',
    'Arley Villa',
    'Anthony Villa',
    'Elizabeth Lanuza',
    'John Jerold Lanuza',
    'Arman Villa',
    'Carme Salazar Villa'
  ]
})

const secondarySponsors = ref([
  'Era Ganabban',
  'Rosa Paola Louise Sta. Ana',
  'Jessica Zuñiga',
  'Acmad Bacolod',
  'Armando Ignacio',
  'Jeffrey Cham',
  'Mike Capuno'
])

const bestMan = ref('Arjay Lopez')
const maidOfHonor = ref('Bernadeth Villa')
const maidenOfHonor = ref('Sharria Canciano')

const groomsmen = ref([
  'JC Lopez',
  'John Ernest',
  'Gino Villa',
  'Jared Zuñiga',
  'Ace Lopez Almirañez',
  'Cad Minbert Villa',
  'Christian Jones Fermin',
  'Kristian Quintana',
  'Rafael Sulit',
  'John Camille Pal',
  'Rian Pinlac'
])

const bridesmaids = ref([
  'Leyan Cameron Villa',
  'Julia Antonio',
  'Gil Permejo',
  'Anna Grace Tenefrancia',
  'Claudine Andrea Teodosio',
  'Patricia Igcasenza',
  'Krizia Nicole Vargas',
  'Kristine Delos Santos',
  'Julliesel Ganela',
  'Jennifer Lopez',
  'Leimee Ann Vasquez'
])

const candle = ref(['John Ernest', 'Julia Antonio'])
const veil = ref(['Arjay Lopez', 'Sharria Canciano'])
const cord = ref(['JC Lopez', 'Leyan Cameron Villa'])

const symbolBearers = ref([
  { role: 'Banner', names: ['Hughann Genesis Villa', 'Toni Marie Villa'] },
  { role: 'Flower', names: ['Yajra Lopez', 'Yeliza Lopez', 'Aya Piamonte'] },
  { role: 'Bible', names: ['Zion Delos Santos'] },
  { role: 'Coin', names: ['Achilles Villa'] },
  { role: 'Ring', names: ['Gabriel Canciano'] }
])

const singer = ref('Joseph Cabigon')

// ===== DRESS CODE =====
const colorMotifByRole = ref([
  {
    role: 'Parents',
    figure: '◍',
    colors: [
      { name: 'Navy Blue', hex: '#1f2f67', textColor: '#ffffff' }
    ]
  },
  {
    role: 'Principal Sponsors',
    figure: '◍',
    colors: [
      { name: 'Gray', hex: '#b8c0ca', textColor: '#243446' },
      { name: 'Silver', hex: '#d3d9de', textColor: '#3a4552' }
    ]
  },
  {
    role: 'Maid of Honor & Best Man',
    figure: '◍',
    colors: [
      { name: 'Blue', hex: '#5b7fa8', textColor: '#ffffff' }
    ]
  },
  {
    role: 'Bridesmaids & Groomsmen',
    figure: '◍',
    colors: [
      { name: 'Powder Blue', hex: '#b7d2e6', textColor: '#2d4f6c' },
      { name: 'Black', hex: '#161616', textColor: '#f4f4f4' }
    ]
  },
  {
    role: 'Flower Girls & Bearers',
    figure: '◍',
    colors: [
      { name: 'Dusty Blue', hex: '#8ea2bf', textColor: '#ffffff' },
      { name: 'Navy Blue', hex: '#1f2f67', textColor: '#ffffff' }
    ]
  }
])

// ===== INTERSECTION OBSERVER FOR FADE-IN =====
let observer

onMounted(() => {
  countdownInterval = setInterval(() => {
    now.value = new Date()
  }, 1000)

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.15 }
  )

  document.querySelectorAll('.fade-in-section').forEach((el) => {
    observer.observe(el)
  })
})

onUnmounted(() => {
  clearInterval(countdownInterval)
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.main-page {
  position: relative;
}

.forever-background {
  background-image:
    linear-gradient(180deg, rgba(240, 244, 248, 0.42), rgba(240, 244, 248, 0.42)),
    url('/photos/prenup-7.jpg');
  background-position: center top;
  background-size: 100% auto;
  background-repeat: repeat-y;
}

.main-page::before,
.main-page::after {
  content: '❀';
  position: fixed;
  top: 160px;
  font-size: 2.2rem;
  color: var(--pastel-mauve);
  opacity: 0.18;
  z-index: 2;
  pointer-events: none;
}

.main-page::before {
  left: 10px;
  animation: floralFloat 6s ease-in-out infinite;
}

.main-page::after {
  right: 10px;
  animation: floralFloat 6s ease-in-out infinite reverse;
}

@keyframes floralFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

/* ===== HERO ===== */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, var(--pastel-blush), var(--pastel-lavender), var(--pastel-peach));
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  text-align: center;
  padding-top: 80px;
}
/* If you add a background image, uncomment below: */
/* .hero-section { background-image: url('/photos/hero-bg.jpg'); } */

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.15);
}

.hero-content {
  position: relative;
  z-index: 1;
  padding: 0 20px;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: var(--text-medium);
  margin-bottom: 12px;
  letter-spacing: 2px;
}

.hero-names {
  font-size: 4.5rem;
  color: var(--text-accent);
  line-height: 1.1;
  margin-bottom: 16px;
}

.hero-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
  color: var(--pastel-mauve);
}
.ornament { font-size: 1.2rem; opacity: 0.6; }
.ornament-center { font-size: 1.4rem; }

.hero-date {
  font-size: 1.4rem;
  color: var(--text-medium);
  letter-spacing: 3px;
  margin-bottom: 8px;
}

.hero-tagline {
  font-size: 1.1rem;
  color: var(--text-light);
  font-style: italic;
}

.hero-hashtag {
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 1.5px;
  margin-top: 10px;
  font-weight: 600;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  animation: scrollBounce 2s ease infinite;
}
.scroll-arrow {
  width: 24px;
  height: 24px;
  border-right: 2px solid var(--text-light);
  border-bottom: 2px solid var(--text-light);
  transform: rotate(45deg);
  opacity: 0.5;
}
@keyframes scrollBounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(10px); }
}

/* ===== COUNTDOWN ===== */
.countdown-section {
  padding: var(--section-padding);
  background: transparent;
  text-align: center;
}

.save-date-layout {
  display: grid;
  grid-template-columns: 1.2fr 0.9fr;
  gap: 24px;
}

.countdown-panel,
.calendar-panel {
  background: rgba(255, 255, 255, 0.94);
  border-radius: 18px;
  padding: 24px;
  box-shadow: 0 8px 28px rgba(28, 60, 100, 0.12);
}

.panel-kicker {
  font-size: 1rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-medium);
  margin-bottom: 14px;
  font-weight: 600;
}

.countdown-grid {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.countdown-item {
  background: linear-gradient(135deg, #fff, var(--pastel-pink));
  border-radius: 16px;
  padding: 24px 20px;
  min-width: 100px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.countdown-number {
  font-family: var(--font-elegant);
  font-size: 3.2rem;
  font-weight: 700;
  color: var(--text-accent);
  line-height: 1;
}

.countdown-label {
  font-family: var(--font-elegant);
  font-size: 0.95rem;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 6px;
  font-weight: 700;
}

.countdown-date {
  font-size: 1.45rem;
  color: var(--text-medium);
  letter-spacing: 3px;
  font-weight: 700;
}

.calendar-title {
  font-size: 1.45rem;
  color: var(--text-accent);
  margin-bottom: 12px;
  font-weight: 700;
}

.calendar-weekdays,
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

.calendar-weekdays span {
  font-size: 0.8rem;
  color: var(--text-light);
  font-weight: 700;
  letter-spacing: 1px;
}

.calendar-day {
  font-size: 0.95rem;
  color: var(--text-medium);
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 600;
}

.calendar-day.muted {
  opacity: 0;
}

.calendar-day.wedding {
  background: var(--pastel-mauve);
  color: #fff;
  box-shadow: 0 4px 14px rgba(93, 132, 171, 0.35);
}

.calendar-btn {
  margin-top: 16px;
  font-size: 0.95rem;
}

/* ===== OUR STORY ===== */
.story-section {
  padding: var(--section-padding);
  background: transparent;
}

.story-shell {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  padding: 28px 24px;
}

.timeline {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  padding-left: 40px;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 12px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--pastel-mauve), var(--pastel-gold));
}

.timeline-item {
  position: relative;
  margin-bottom: 40px;
}
.timeline-item:last-child { margin-bottom: 0; }

.timeline-dot {
  position: absolute;
  left: -34px;
  top: 4px;
  width: 16px;
  height: 16px;
  background: var(--pastel-mauve);
  border-radius: 50%;
  border: 3px solid var(--pastel-cream);
  box-shadow: 0 0 0 3px var(--pastel-mauve);
}

.timeline-content {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
}

.timeline-title {
  font-size: 2.05rem;
  color: var(--text-accent);
  margin-bottom: 4px;
}

.timeline-date {
  font-size: 0.9rem;
  color: var(--pastel-gold);
  margin-bottom: 8px;
  letter-spacing: 1px;
}

.timeline-desc {
  font-size: 1.05rem;
  color: var(--text-medium);
  line-height: 1.75;
  font-weight: 500;
}

/* ===== GALLERY ===== */
.gallery-section {
  padding: var(--section-padding);
  background: var(--pastel-pink);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-auto-rows: 86px;
  gap: 10px;
  margin-bottom: 40px;
  align-items: start;
  max-width: 920px;
  margin-left: auto;
  margin-right: auto;
}

.gallery-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: #fff;
  padding: 8px;
  aspect-ratio: auto;
  box-shadow: 0 8px 24px rgba(25, 56, 90, 0.12);
}

.gallery-item.tile-a { grid-column: 1 / span 2; grid-row: 1 / span 2; transform: rotate(-2.5deg); }
.gallery-item.tile-b { grid-column: 3 / span 2; grid-row: 1 / span 2; transform: rotate(1.8deg); }
.gallery-item.tile-c { grid-column: 5 / span 2; grid-row: 1 / span 2; transform: rotate(-1.2deg); }
.gallery-item.tile-d { grid-column: 7 / span 2; grid-row: 1 / span 2; transform: rotate(2deg); }
.gallery-item.tile-e { grid-column: 2 / span 2; grid-row: 3 / span 2; transform: rotate(-1.5deg); }
.gallery-item.tile-center { grid-column: 4 / span 2; grid-row: 2 / span 3; transform: scale(1.04); z-index: 2; }
.gallery-item.tile-f { grid-column: 6 / span 2; grid-row: 3 / span 2; transform: rotate(1.5deg); }
.gallery-item.tile-g { grid-column: 1 / span 2; grid-row: 4 / span 2; transform: rotate(-1deg); }
.gallery-item.tile-h { grid-column: 3 / span 2; grid-row: 5 / span 1; transform: rotate(1deg); }

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  transition: transform 0.5s ease;
  border-radius: 8px;
  background: #fff;
}
.gallery-item:hover img {
  transform: scale(1.02);
}

.gallery-item:hover {
  transform: translateY(-4px) rotate(0deg) !important;
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: rgba(139, 110, 90, 0.0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}
.gallery-item:hover .gallery-overlay {
  background: rgba(139, 110, 90, 0.2);
}
.gallery-zoom {
  color: #fff;
  font-size: 1.5rem;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s;
}
.gallery-item:hover .gallery-zoom {
  opacity: 1;
  transform: scale(1);
}

/* Video */
.video-title {
  font-size: 2rem;
  color: var(--text-accent);
  text-align: center;
  margin-bottom: 20px;
}
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}
.video-wrapper iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* ===== LIGHTBOX ===== */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lightbox-img {
  max-width: 90vw;
  max-height: 85vh;
  border-radius: 8px;
  object-fit: contain;
}
.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 2.5rem;
  color: #fff;
  background: none;
}
.lightbox-prev,
.lightbox-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 3rem;
  color: #fff;
  background: none;
  padding: 10px;
}
.lightbox-prev { left: 20px; }
.lightbox-next { right: 20px; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ===== DETAILS ===== */
.details-section {
  padding: var(--section-padding);
  background: linear-gradient(180deg, #f9fbfe, #eef3f8);
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  margin-bottom: 48px;
}

.detail-card {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.97), rgba(247, 251, 255, 0.98));
  border-radius: 16px;
  padding: 28px;
  text-align: center;
  box-shadow: 0 10px 28px rgba(26, 61, 104, 0.1);
  transition: transform 0.3s;
  position: relative;
  overflow: hidden;
}
.detail-card:hover {
  transform: translateY(-4px);
}

.ceremony-card::before,
.reception-card::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.12;
  pointer-events: none;
}

.ceremony-card::before {
  background: url('/photos/Ceremony.png') center/cover no-repeat;
}

.reception-card::before {
  background: url('/photos/Reception2.jpg') center/cover no-repeat;
}

.detail-body {
  display: block;
}

.detail-content {
  text-align: center;
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.86);
  border-radius: 16px;
  padding: 20px;
}

.venue-photo-shell {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 14px;
  border: 2px solid rgba(101, 139, 181, 0.22);
  background: rgba(227, 237, 247, 0.95);
}

.venue-photo-shell img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-title {
  font-size: 2.5rem;
  color: var(--text-accent);
  margin-bottom: 8px;
}

.split-title span {
  font-size: 3.1rem;
  color: #2d5f94;
}

.detail-time {
  font-size: 1.25rem;
  color: var(--pastel-gold);
  margin-bottom: 12px;
  letter-spacing: 2px;
  font-weight: 700;
}

.detail-venue {
  font-family: var(--font-elegant);
  font-size: 1.25rem;
  color: var(--text-dark);
  font-weight: 700;
  margin-bottom: 4px;
}

.detail-address {
  font-size: 1rem;
  color: var(--text-light);
  margin-bottom: 20px;
  line-height: 1.5;
  font-weight: 600;
}

.detail-btn {
  display: inline-block;
  font-size: 0.95rem;
  padding: 10px 28px;
}

/* QR Codes */
.qr-section {
  text-align: center;
  margin-top: 20px;
}
.qr-title {
  font-size: 2rem;
  color: var(--text-accent);
  margin-bottom: 24px;
}
.qr-grid {
  display: flex;
  justify-content: center;
  gap: 48px;
  flex-wrap: wrap;
}
.qr-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  max-width: 320px;
}
.qr-label {
  font-size: 1rem;
  color: var(--text-medium);
  letter-spacing: 1px;
}

.qr-address {
  font-size: 0.88rem;
  color: var(--text-light);
  line-height: 1.5;
  max-width: 290px;
}

/* ===== RSVP CTA ===== */
.rsvp-cta-section {
  padding: var(--section-padding);
  background: linear-gradient(135deg, var(--pastel-mauve), var(--pastel-gold));
  text-align: center;
}
.rsvp-cta-text {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 28px;
  font-style: italic;
}
.rsvp-cta-btn {
  background: #fff;
  color: var(--text-accent);
  font-weight: 600;
  display: inline-block;
}
.rsvp-cta-btn:hover {
  background: var(--pastel-cream);
}

/* ===== WEDDING ENTOURAGE ===== */
.entourage-section {
  padding: var(--section-padding);
  background: linear-gradient(180deg, #fff, var(--pastel-cream), #fff);
}

.entourage-group {
  margin-bottom: 48px;
  text-align: center;
}

.entourage-group-title {
  font-size: 2.2rem;
  color: var(--text-accent);
  margin-bottom: 4px;
}

.entourage-group-subtitle {
  font-size: 1rem;
  color: var(--text-light);
  font-style: italic;
  margin-bottom: 24px;
}

.entourage-caption {
  font-size: 0.95rem;
  color: var(--text-light);
  font-style: italic;
  margin: 20px 0 8px;
}

.secondary-sponsor-grid {
  max-width: 760px;
  margin: 0 auto 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 8px 20px;
}

.bestman-row {
  max-width: 360px;
  margin: 0 auto 16px;
}

.honor-pair {
  margin-top: 0;
}

.sponsors-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 40px;
  max-width: 700px;
  margin: 0 auto;
}

.sponsor-column {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sponsor-name {
  font-size: 1rem;
  color: var(--text-medium);
  padding: 4px 0;
}

.entourage-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-width: 700px;
  margin: 16px auto;
}

.entourage-trio {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  max-width: 750px;
  margin: 24px auto;
}

.entourage-role-card {
  background: #fff;
  border-radius: 16px;
  padding: 28px 20px;
  box-shadow: 0 4px 18px rgba(30, 60, 100, 0.06);
  text-align: center;
}

.role-title {
  font-family: var(--font-cursive);
  font-size: 1.5rem;
  color: var(--text-accent);
  margin-bottom: 12px;
}

.role-name {
  font-size: 1rem;
  color: var(--text-medium);
  line-height: 1.8;
}

.bearers-grid {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 700px;
  margin: 0 auto;
}

.bearer-item {
  background: #fff;
  border-radius: 16px;
  padding: 12px 22px;
  box-shadow: 0 4px 18px rgba(30, 60, 100, 0.06);
  text-align: center;
  width: 100%;
}

.bearer-item .role-title {
  margin: 0 0 4px;
}

.bearer-item .role-name {
  line-height: 1.35;
  margin: 2px 0;
}

/* ===== DRESS CODE ===== */
.dresscode-section {
  padding: var(--section-padding);
  background: var(--pastel-cream);
  text-align: center;
}

.dress-theme-line {
  font-size: 1.08rem;
  color: var(--text-medium);
  margin-bottom: 20px;
  font-weight: 700;
}

.motif-role-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(260px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.motif-role-card {
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 8px 24px rgba(27, 58, 92, 0.08);
}

.motif-role-head {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
}

.motif-figure {
  font-size: 1.4rem;
  color: var(--pastel-gold);
}

.motif-role-title {
  font-size: 1.15rem;
  color: var(--text-accent);
  font-weight: 700;
}

.motif-swatches {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.motif-swatch {
  width: 120px;
  height: 68px;
  border-radius: 12px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 10px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.45), 0 4px 12px rgba(30, 60, 100, 0.12);
}

.swatch-name {
  font-family: var(--font-elegant);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.dresscode-notes {
  max-width: 500px;
  margin: 0 auto;
}

.dresscode-note {
  font-size: 1.06rem;
  color: var(--text-light);
  margin-bottom: 8px;
  font-style: italic;
  font-weight: 600;
}

/* ===== FOOTER ===== */
.footer {
  background: var(--pastel-cream);
  padding: 48px 20px 24px;
  text-align: center;
}
.footer-hearts {
  font-size: 1.2rem;
  color: var(--pastel-mauve);
  margin-bottom: 12px;
  letter-spacing: 8px;
}
.footer-names {
  font-size: 2.5rem;
  color: var(--text-accent);
  margin-bottom: 4px;
}
.footer-date {
  font-size: 1rem;
  color: var(--text-light);
  letter-spacing: 2px;
}
.footer-hashtag {
  font-size: 1rem;
  color: var(--pastel-gold);
  letter-spacing: 1px;
  margin-top: 8px;
  font-weight: 600;
  opacity: 0.85;
}
.footer-divider {
  width: 60px;
  height: 1px;
  background: var(--pastel-mauve);
  margin: 20px auto;
}
.footer-made {
  font-size: 0.85rem;
  color: var(--text-light);
  margin-bottom: 4px;
}
.footer-made strong {
  color: var(--text-accent);
}
.footer-copy {
  font-size: 0.75rem;
  color: var(--text-light);
  opacity: 0.7;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .hero-names { font-size: 3rem; }
  .forever-background { background-size: auto 100%; }
  .save-date-layout { grid-template-columns: 1fr; }
  .countdown-grid { gap: 12px; }
  .countdown-item { min-width: 80px; padding: 16px 12px; }
  .countdown-number { font-size: 2.2rem; }
  .gallery-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: auto; }
  .gallery-item,
  .gallery-item.tile-a,
  .gallery-item.tile-b,
  .gallery-item.tile-c,
  .gallery-item.tile-d,
  .gallery-item.tile-e,
  .gallery-item.tile-center,
  .gallery-item.tile-f,
  .gallery-item.tile-g,
  .gallery-item.tile-h { grid-column: auto; grid-row: auto; aspect-ratio: 4 / 3; }
  .qr-grid { gap: 24px; }
  .entourage-trio { grid-template-columns: 1fr; }
  .entourage-pair { grid-template-columns: 1fr; }
  .sponsors-grid { grid-template-columns: 1fr; gap: 8px 0; }
  .motif-role-grid { grid-template-columns: 1fr; }
  .motif-swatch { width: 108px; height: 62px; }
}

@media (max-width: 480px) {
  .hero-names { font-size: 2.4rem; }
  .hero-date { font-size: 1.1rem; }
  .countdown-item { min-width: 70px; }
  .countdown-number { font-size: 1.8rem; }
  .gallery-grid { gap: 10px; }
  .details-grid { grid-template-columns: 1fr; }
  .bearers-grid { flex-direction: column; align-items: center; }
  .motif-swatch { width: 92px; height: 58px; }
  .main-page::before,
  .main-page::after { display: none; }
}
</style>
