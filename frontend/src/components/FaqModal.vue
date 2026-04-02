<template>
  <Teleport to="body">
    <transition name="faq-fade">
      <div
        v-if="modelValue"
        class="faq-modal-backdrop"
        @click.self="close"
      >
        <section
          class="faq-modal-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="faq-modal-title"
        >
          <button class="faq-close" type="button" @click="close" aria-label="Close FAQ">
            &times;
          </button>

          <p class="faq-kicker">Frequently Asked Questions</p>
          <h2 id="faq-modal-title" class="faq-title cursive">FAQ</h2>
          <p class="faq-subtitle elegant">A few things to help you plan your day</p>

          <div class="faq-grid">
            <article class="faq-card" v-for="faq in faqItems" :key="faq.question">
              <p class="faq-question">{{ faq.question }}</p>
              <p class="faq-answer" v-html="faq.answer"></p>
            </article>
          </div>
        </section>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const faqItems = [
  {
    question: 'Do you have any gift preferences?',
    answer: 'As love is what this day is all about, your presence is one we couldn\'t celebrate without. However, should you insist that a gift is worth giving, a small saving for our future is a delightful blessing.',
  },
  {
    question: 'Can I bring a plus one?',
    answer: 'Please refer to the number of seat/s allotted for you. As much as we want to celebrate with everybody, unfortunately, we can only accommodate a limited number of guests due to venue and budget restrictions.',
  },
  {
    question: 'Can I bring my kid(s) with me?',
    answer: 'Children are really adorable but our event is an adult-only event. Only children who are part of the entourage are included in both ceremony and reception.',
  },
  {
    question: 'Can we sit anywhere at the reception?',
    answer: 'We have assigned seats for each one of you. It took us a lot of effort and discussion to finalize the seating arrangement which is meant for everyone\'s convenience and group familiarity, so no need to worry. Our coordinators will gladly assist you in finding your designated seats.',
  },
  {
    question: 'What if I did not RSVP but will attend the wedding?',
    answer: '<strong>NO RSVP = NO SEAT.</strong> We will assign your seats so we strongly suggest you do the RSVP <strong>on or before May 1, 2026</strong> or you may contact and inform us ahead of time. In any case that you may have said Yes in our RSVP but suddenly won\'t be able to attend, please let us know ASAP so we can accommodate any changes.',
  },
  {
    question: 'When should we arrive at the venue?',
    answer: 'The ceremony will <strong>strictly start at 2:00 PM</strong>. Entourage will march by <strong>1:30 PM</strong>. Please be at the venue at least 10-15 minutes before 1:30 PM.',
  },
  {
    question: 'When can we leave?',
    answer: 'The program is estimated to last until 9PM. We are hoping that you will stay with us until the end of program. Should you wish to leave early, we\'d love to personally thank you and bid goodbye before you go, perhaps not until the same day video is played.',
  },
]

const close = () => emit('update:modelValue', false)

const handleKeydown = (event) => {
  if (event.key === 'Escape' && props.modelValue) {
    close()
  }
}

watch(
  () => props.modelValue,
  (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  },
  { immediate: true }
)

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.faq-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(13, 22, 36, 0.58);
  backdrop-filter: blur(10px);
}

.faq-modal-card {
  position: relative;
  width: min(980px, 100%);
  max-height: min(86vh, 920px);
  overflow: auto;
  border-radius: 26px;
  padding: 34px 28px 30px;
  background:
    radial-gradient(circle at top left, rgba(187, 210, 230, 0.34), transparent 28%),
    radial-gradient(circle at bottom right, rgba(216, 200, 178, 0.26), transparent 24%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(246, 249, 252, 0.98));
  box-shadow: 0 24px 70px rgba(6, 16, 28, 0.28);
  border: 1px solid rgba(145, 166, 191, 0.25);
}

.faq-close {
  position: sticky;
  top: 0;
  float: right;
  margin: -8px -6px 0 0;
  width: 42px;
  height: 42px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: var(--text-accent);
  font-size: 2rem;
  line-height: 1;
  box-shadow: 0 6px 18px rgba(28, 58, 93, 0.12);
}

.faq-kicker {
  font-size: 0.9rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--text-light);
  text-align: center;
  margin-bottom: 8px;
}

.faq-title {
  font-size: 3rem;
  color: var(--text-accent);
  text-align: center;
  margin-bottom: 10px;
}

.faq-subtitle {
  font-size: 1.2rem;
  color: var(--text-light);
  text-align: center;
  margin-bottom: 24px;
  font-style: italic;
  font-weight: 600;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.faq-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 18px;
  padding: 22px 20px 20px;
  border: 1px solid rgba(130, 154, 181, 0.18);
  box-shadow: 0 10px 26px rgba(28, 58, 93, 0.08);
  position: relative;
  overflow: hidden;
}

.faq-card::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 4px;
  background: linear-gradient(180deg, var(--pastel-mauve), var(--pastel-gold));
}

.faq-question {
  font-family: var(--font-elegant);
  font-size: 1.2rem;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  color: #b1ae98;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 14px;
  padding-left: 10px;
}

.faq-answer {
  font-family: var(--font-elegant);
  font-size: 1.12rem;
  line-height: 1.62;
  color: var(--text-medium);
  padding-left: 10px;
}

.faq-answer strong {
  color: var(--text-dark);
  font-weight: 700;
}

.faq-fade-enter-active,
.faq-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.faq-fade-enter-from,
.faq-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 768px) {
  .faq-modal-card {
    padding: 28px 18px 22px;
    max-height: 90vh;
  }

  .faq-title {
    font-size: 2.4rem;
  }

  .faq-grid {
    grid-template-columns: 1fr;
  }

  .faq-question {
    font-size: 1.08rem;
  }

  .faq-answer {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .faq-modal-backdrop {
    padding: 12px;
  }

  .faq-modal-card {
    border-radius: 20px;
  }

  .faq-title {
    font-size: 2rem;
  }

  .faq-subtitle {
    font-size: 1.05rem;
  }
}
</style>