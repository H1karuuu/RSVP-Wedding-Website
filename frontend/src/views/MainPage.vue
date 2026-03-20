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
        <p class="hero-hashtag elegant">#GodsentTheRYghtOneForMJ</p>
      </div>
      <div class="scroll-indicator">
        <div class="scroll-arrow"></div>
      </div>
    </section>

    <!-- ===== COUNTDOWN SECTION ===== -->
    <section class="countdown-section" ref="countdownSection">
      <div class="container">
        <h2 class="section-title">Save the Date</h2>
        <p class="section-subtitle">Counting down to our forever</p>
        <div class="countdown-grid">
          <div class="countdown-item" v-for="item in countdownItems" :key="item.label">
            <div class="countdown-number">{{ item.value }}</div>
            <div class="countdown-label">{{ item.label }}</div>
          </div>
        </div>
        <p class="countdown-date elegant">June 04, 2026</p>
      </div>
    </section>

    <!-- ===== OUR STORY SECTION ===== -->
    <section id="our-story" class="story-section fade-in-section" ref="storySection">
      <div class="container">
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
            :class="photo.size"
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
          <div class="detail-card">
            <div class="detail-body">
              <div class="detail-photo-wrap">
                <img class="detail-photo" src="/photos/prenup-2.jpg" alt="Ceremony photo" loading="lazy" />
              </div>
              <div class="detail-content">
                <div class="detail-icon">⛪</div>
                <h3 class="detail-title cursive">Ceremony</h3>
                <p class="detail-time elegant">2:00 PM</p>
                <p class="detail-venue">Church Name Here</p>
                <p class="detail-address">123 Church Street, City, Province</p>
                <a
                  href="https://maps.google.com/?q=Church+Name+Here"
                  target="_blank"
                  class="btn-outline detail-btn"
                >
                  View Map
                </a>
              </div>
            </div>
          </div>

          <!-- Reception -->
          <div class="detail-card">
            <div class="detail-body">
              <div class="detail-photo-wrap">
                <img class="detail-photo" src="/photos/prenup-3.jpg" alt="Reception photo" loading="lazy" />
              </div>
              <div class="detail-content">
                <div class="detail-icon">🥂</div>
                <h3 class="detail-title cursive">Reception</h3>
                <p class="detail-time elegant">5:00 PM</p>
                <p class="detail-venue">Reception Venue Name</p>
                <p class="detail-address">456 Venue Road, City, Province</p>
                <a
                  href="https://maps.google.com/?q=Reception+Venue+Name"
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
            </div>
            <div class="qr-item">
              <QrcodeVue :value="receptionMapUrl" :size="150" level="M" />
              <p class="qr-label elegant">Reception</p>
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
            <div class="bearer-item" v-for="bearer in symbolBearers" :key="bearer.role + bearer.name">
              <h4 class="role-title">{{ bearer.role }}</h4>
              <p class="role-name elegant">{{ bearer.name }}</p>
            </div>
          </div>
        </div>

        <div class="entourage-group">
          <h3 class="entourage-group-title cursive">Additional Guests</h3>
          <p class="entourage-group-subtitle elegant">Our cherished guests joining the celebration...</p>
          <div class="guest-grid">
            <p class="guest-name elegant" v-for="guest in guests" :key="guest">{{ guest }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== DRESS CODE SECTION ===== -->
    <section id="dress-code" class="dresscode-section fade-in-section" ref="dresscodeSection">
      <div class="container">
        <h2 class="section-title">Dress Code</h2>
        <p class="section-subtitle">Kindly adhere to our wedding color palette</p>

        <div class="dresscode-palette">
          <div
            class="palette-swatch"
            v-for="color in dressCodeColors"
            :key="color.hex"
            :style="{ background: color.hex }"
          >
            <span class="swatch-name" :style="{ color: color.textColor }">{{ color.name }}</span>
          </div>
        </div>

        <div class="dresscode-notes">
          <p class="elegant dresscode-note">Please wear attire in the shades shown above.</p>
          <p class="elegant dresscode-note">Formal / Semi-formal attire is preferred.</p>
        </div>
      </div>
    </section>

    <!-- ===== RSVP CTA SECTION ===== -->
    <section class="rsvp-cta-section fade-in-section" ref="rsvpCtaSection">
      <div class="container rsvp-cta-content">
        <h2 class="section-title" style="color: #fff;">RSVP</h2>
        <p class="rsvp-cta-text elegant">Kindly let us know if you can make it to our special day</p>
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
        <p class="footer-hashtag elegant">#GodsentTheRYghtOneForMJ</p>
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
  { src: '/photos/prenup-1.jpg', alt: 'Prenup Photo 1', size: 'wide' },
  { src: '/photos/prenup-2.jpg', alt: 'Prenup Photo 2', size: '' },
  { src: '/photos/prenup-3.jpg', alt: 'Prenup Photo 3', size: '' },
  { src: '/photos/prenup-4.jpg', alt: 'Prenup Photo 4', size: 'tall' },
  { src: '/photos/prenup-5.jpg', alt: 'Prenup Photo 5', size: '' },
  { src: '/photos/prenup-6.jpg', alt: 'Prenup Photo 6', size: 'wide' },
  { src: '/photos/prenup-7.jpg', alt: 'Prenup Photo 7', size: '' },
  { src: '/photos/prenup-8.jpg', alt: 'Prenup Photo 8', size: '' },
  { src: '/photos/prenup-9.jpg', alt: 'Prenup Photo 9', size: '' },
  { src: '/photos/prenup-10.jpg', alt: 'Prenup Photo 10', size: '' },
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
const ceremonyMapUrl = 'https://maps.google.com/?q=Church+Name+Here'
const receptionMapUrl = 'https://maps.google.com/?q=Reception+Venue+Name'

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
  { role: 'Bible Bearer', name: 'Zion Delos Santos' },
  { role: 'Ring Bearer', name: 'Gabriel Canciano' },
  { role: 'Coin Bearer', name: 'Achilles Villa' },
  { role: 'Banner Bearer', name: 'Hughann Genesis Villa' },
  { role: 'Banner Bearer', name: 'Toni Marie Villa' },
  { role: 'Flower Girl', name: 'Yajra Lopez' },
  { role: 'Flower Girl', name: 'Yeliza Lopez' },
  { role: 'Flower Girl', name: 'Aya Piamonte' },
  { role: 'Singer', name: 'Joseph Cabigon' }
])

const guests = ref([
  'Belle Andreo Lopez', 'Angelina Zuñiga', 'Kaye Delos Santos', 'Kurt Delos Santos', 'Kim Delos Santos',
  'Christopher Ramos', 'Milky Dumaran', 'Kim Tany Lerit', 'Dianne Garcia', 'Jaylyn Mozo', 'Jerome Tejerero',
  'Queenie Villa', 'Juvy Lasaga', 'Tomas Villa', 'Nica Villa', 'Ryan Jayma', 'Ezekiel Gonzaga', 'Agow Padin',
  'Delma Barotia', 'Vanessa Villarente', 'Ann Galang', 'Mylene Melendez', 'Gemma Villa', 'Paula Monichelle Hornido',
  'Liezel Villa', 'JC Canciano', 'Nikki Lopez', 'Joana Mae Pinuela', 'Aileen Joyce Wong', 'Jamie Rodriguez',
  'Kirsten Zuñiga', 'Ms. Myra Domino', 'Lovely Llanto', 'Nicole Ordillo', 'Jimboy Aseo', 'Elenita Villa',
  'Marielle Bautista', 'Ralph Louise Bolisay', 'Arceli Villa', 'Josh David Villa', 'Ella Mae Pasia'
])

// ===== DRESS CODE =====
const dressCodeColors = ref([
  { name: 'Dusty Blue', hex: '#7096c4', textColor: '#fff' },
  { name: 'Powder Blue', hex: '#b0cce1', textColor: '#2a4a6b' },
  { name: 'Navy', hex: '#2c3e6b', textColor: '#fff' },
  { name: 'Silver', hex: '#c0c8d0', textColor: '#2a3a4a' },
  { name: 'Ivory', hex: '#f5f0e8', textColor: '#4a5568' },
  { name: 'Champagne', hex: '#e8dcc8', textColor: '#4a4035' }
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
  background: var(--pastel-cream);
  text-align: center;
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
  font-size: 3rem;
  font-weight: 600;
  color: var(--text-accent);
  line-height: 1;
}

.countdown-label {
  font-family: var(--font-elegant);
  font-size: 0.85rem;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 6px;
}

.countdown-date {
  font-size: 1.3rem;
  color: var(--text-medium);
  letter-spacing: 3px;
}

/* ===== OUR STORY ===== */
.story-section {
  padding: var(--section-padding);
  background: linear-gradient(180deg, var(--pastel-cream), #fff, var(--pastel-cream));
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
  font-size: 1.8rem;
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
  font-size: 0.95rem;
  color: var(--text-medium);
  line-height: 1.7;
}

/* ===== GALLERY ===== */
.gallery-section {
  padding: var(--section-padding);
  background: var(--pastel-pink);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 40px;
}

.gallery-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: #fff;
  padding: 10px;
}
.gallery-item.wide {
  grid-column: span 1;
}
.gallery-item.tall {
  grid-row: span 1;
}

.gallery-item img {
  width: 100%;
  height: auto;
  object-fit: contain;
  object-position: center;
  transition: transform 0.5s ease;
  border-radius: 8px;
}
.gallery-item:hover img {
  transform: scale(1.05);
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
  background: linear-gradient(180deg, var(--pastel-cream), #fff);
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  margin-bottom: 48px;
}

.detail-card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s;
}
.detail-card:hover {
  transform: translateY(-4px);
}

.detail-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.detail-body {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 18px;
  align-items: center;
}

.detail-photo-wrap {
  width: 100%;
}

.detail-photo {
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
}

.detail-content {
  text-align: left;
}

.detail-title {
  font-size: 2rem;
  color: var(--text-accent);
  margin-bottom: 8px;
}

.detail-time {
  font-size: 1.2rem;
  color: var(--pastel-gold);
  margin-bottom: 12px;
  letter-spacing: 2px;
}

.detail-venue {
  font-family: var(--font-elegant);
  font-size: 1.1rem;
  color: var(--text-dark);
  font-weight: 600;
  margin-bottom: 4px;
}

.detail-address {
  font-size: 0.9rem;
  color: var(--text-light);
  margin-bottom: 20px;
  line-height: 1.5;
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
}
.qr-label {
  font-size: 1rem;
  color: var(--text-medium);
  letter-spacing: 1px;
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
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  max-width: 700px;
  margin: 0 auto;
}

.bearer-item {
  background: #fff;
  border-radius: 16px;
  padding: 24px 28px;
  box-shadow: 0 4px 18px rgba(30, 60, 100, 0.06);
  text-align: center;
  min-width: 160px;
}

.guest-grid {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 6px 16px;
  text-align: left;
}

.guest-name {
  color: var(--text-medium);
  font-size: 0.95rem;
}

/* ===== DRESS CODE ===== */
.dresscode-section {
  padding: var(--section-padding);
  background: var(--pastel-cream);
  text-align: center;
}

.dresscode-palette {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 32px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.palette-swatch {
  width: 100px;
  height: 120px;
  border-radius: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 12px;
  box-shadow: 0 4px 16px rgba(30, 60, 100, 0.1);
  transition: transform 0.3s ease;
  cursor: default;
}
.palette-swatch:hover {
  transform: translateY(-4px);
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
  font-size: 1rem;
  color: var(--text-light);
  margin-bottom: 8px;
  font-style: italic;
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
  .countdown-grid { gap: 12px; }
  .countdown-item { min-width: 80px; padding: 16px 12px; }
  .countdown-number { font-size: 2.2rem; }
  .gallery-grid { grid-template-columns: repeat(2, 1fr); }
  .gallery-item.wide { grid-column: span 1; }
  .gallery-item.tall { min-height: unset; }
  .detail-body { grid-template-columns: 1fr; }
  .detail-content { text-align: center; }
  .qr-grid { gap: 24px; }
  .entourage-trio { grid-template-columns: 1fr; }
  .entourage-pair { grid-template-columns: 1fr; }
  .sponsors-grid { grid-template-columns: 1fr; gap: 8px 0; }
  .palette-swatch { width: 80px; height: 100px; }
}

@media (max-width: 480px) {
  .hero-names { font-size: 2.4rem; }
  .hero-date { font-size: 1.1rem; }
  .countdown-item { min-width: 70px; }
  .countdown-number { font-size: 1.8rem; }
  .gallery-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
  .gallery-item,
  .gallery-item.wide,
  .gallery-item.tall { grid-column: span 1; grid-row: span 1; }
  .details-grid { grid-template-columns: 1fr; }
  .bearers-grid { flex-direction: column; align-items: center; }
  .palette-swatch { width: 70px; height: 90px; }
  .main-page::before,
  .main-page::after { display: none; }
}
</style>
