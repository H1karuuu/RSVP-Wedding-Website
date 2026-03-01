<template>
  <div class="rsvp-page">
    <!-- Header -->
    <section class="rsvp-hero">
      <h1 class="section-title">RSVP</h1>
      <p class="section-subtitle">We would love to celebrate with you!</p>
    </section>

    <!-- Form Section -->
    <section class="rsvp-form-section">
      <div class="container">
        <div class="rsvp-card">
          <!-- Success Message -->
          <transition name="fade">
            <div v-if="submitted" class="success-message">
              <div class="success-icon">✓</div>
              <h2 class="cursive success-title">Thank You!</h2>
              <p class="elegant success-text">
                Your response has been recorded.<br>
                We look forward to celebrating with you!
              </p>
              <button class="btn-outline" @click="resetForm" style="margin-top: 20px;">
                Submit Another Response
              </button>
            </div>
          </transition>

          <!-- Form -->
          <form v-if="!submitted" @submit.prevent="handleSubmit" class="rsvp-form">
            <!-- Full Name -->
            <div class="form-group">
              <label class="form-label elegant">Full Name <span class="required">*</span></label>
              <input
                v-model="form.fullName"
                type="text"
                class="form-input"
                placeholder="Enter your full name"
                required
              />
            </div>

            <!-- Email (optional) -->
            <div class="form-group">
              <label class="form-label elegant">Email</label>
              <input
                v-model="form.email"
                type="email"
                class="form-input"
                placeholder="your.email@example.com"
              />
            </div>

            <!-- Phone -->
            <div class="form-group">
              <label class="form-label elegant">Phone Number</label>
              <input
                v-model="form.phone"
                type="tel"
                class="form-input"
                placeholder="09XX XXX XXXX"
              />
            </div>

            <!-- Attendance -->
            <div class="form-group">
              <label class="form-label elegant">Will you attend? <span class="required">*</span></label>
              <div class="radio-group">
                <label class="radio-option" :class="{ active: form.attending === 'yes' }">
                  <input type="radio" v-model="form.attending" value="yes" required />
                  <span class="radio-custom"></span>
                  <span class="radio-text">Joyfully Accepts</span>
                </label>
                <label class="radio-option" :class="{ active: form.attending === 'no' }">
                  <input type="radio" v-model="form.attending" value="no" />
                  <span class="radio-custom"></span>
                  <span class="radio-text">Regretfully Declines</span>
                </label>
              </div>
            </div>

            <!-- Message -->
            <div class="form-group">
              <label class="form-label elegant">Message for the Couple</label>
              <textarea
                v-model="form.message"
                class="form-input form-textarea"
                placeholder="Share your wishes, love notes, or advice..."
                rows="4"
              ></textarea>
            </div>

            <!-- Error -->
            <p v-if="errorMsg" class="error-text">{{ errorMsg }}</p>

            <!-- Submit -->
            <button type="submit" class="btn-primary submit-btn" :disabled="loading">
              <span v-if="!loading">Send RSVP</span>
              <span v-else class="loading-spinner"></span>
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-hearts">♡ ♡ ♡</div>
        <p class="footer-names cursive">MJ & Ryan</p>
        <p class="footer-date elegant">June 04, 2026</p>
        <div class="footer-divider"></div>
        <p class="footer-made">Made with ♡ by <strong>JC Lopez</strong></p>
        <p class="footer-copy">&copy; 2026 All rights reserved</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { submitRsvp } from '../api'

const submitted = ref(false)
const loading = ref(false)
const errorMsg = ref('')

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  attending: '',
  message: ''
})

const handleSubmit = async () => {
  errorMsg.value = ''
  loading.value = true

  try {
    await submitRsvp({
      fullName: form.fullName,
      email: form.email || null,
      phone: form.phone || null,
      attending: form.attending,
      guestCount: 1,
      dietary: null,
      songRequest: null,
      message: form.message || null,
    })

    submitted.value = true
  } catch (err) {
    console.error('RSVP Error:', err)
    errorMsg.value = 'Something went wrong. Please try again or contact the couple directly.'
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  submitted.value = false
  form.fullName = ''
  form.email = ''
  form.phone = ''
  form.attending = ''
  form.message = ''
}
</script>

<style scoped>
.rsvp-page {
  padding-top: 80px;
  min-height: 100vh;
  background: var(--pastel-cream);
}

.rsvp-hero {
  padding: 60px 20px 20px;
  text-align: center;
  background: linear-gradient(135deg, var(--pastel-blush), var(--pastel-lavender));
}

.rsvp-form-section {
  padding: 40px 20px 80px;
}

.rsvp-card {
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  border-radius: 20px;
  padding: 48px 36px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.06);
}

/* Form */
.rsvp-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 1rem;
  color: var(--text-medium);
  letter-spacing: 0.5px;
}
.required {
  color: var(--pastel-mauve);
}

.form-input {
  font-family: var(--font-body);
  font-size: 0.95rem;
  padding: 14px 18px;
  border: 2px solid var(--pastel-rose);
  border-radius: 12px;
  background: var(--pastel-cream);
  color: var(--text-dark);
  transition: border-color 0.3s, box-shadow 0.3s;
  outline: none;
}
.form-input:focus {
  border-color: var(--pastel-mauve);
  box-shadow: 0 0 0 3px rgba(201, 160, 176, 0.15);
}
.form-input::placeholder {
  color: var(--text-light);
  opacity: 0.7;
}

.form-select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%237a6565' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

/* Radio Group */
.radio-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  border: 2px solid var(--pastel-rose);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  flex: 1;
  min-width: 180px;
}
.radio-option.active {
  border-color: var(--pastel-mauve);
  background: var(--pastel-blush);
}
.radio-option input {
  display: none;
}
.radio-custom {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid var(--pastel-mauve);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.radio-option.active .radio-custom::after {
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--pastel-mauve);
}
.radio-text {
  font-family: var(--font-elegant);
  font-size: 1rem;
  color: var(--text-medium);
}

/* Submit */
.submit-btn {
  align-self: center;
  min-width: 200px;
  text-align: center;
  margin-top: 8px;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-text {
  color: #d4574b;
  text-align: center;
  font-size: 0.9rem;
}

/* Success */
.success-message {
  text-align: center;
  padding: 20px 0;
}
.success-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--pastel-sage), var(--pastel-mauve));
  color: #fff;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}
.success-title {
  font-size: 2.5rem;
  color: var(--text-accent);
  margin-bottom: 12px;
}
.success-text {
  font-size: 1.1rem;
  color: var(--text-medium);
  line-height: 1.6;
}

/* Fade */
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Footer */
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
  font-family: var(--font-cursive);
  font-size: 2.5rem;
  color: var(--text-accent);
  margin-bottom: 4px;
}
.footer-date {
  font-size: 1rem;
  color: var(--text-light);
  letter-spacing: 2px;
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

@media (max-width: 480px) {
  .rsvp-card { padding: 32px 20px; }
  .radio-group { flex-direction: column; }
  .radio-option { min-width: unset; }
}
</style>
