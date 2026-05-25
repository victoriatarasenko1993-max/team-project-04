'use strict';

import Swiper from 'swiper';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Raty from 'raty-js';
import 'raty-js/src/raty.css';

const API_URL = 'https://deserts-store.b.goit.study/api/feedbacks?limit=10';

const refs = {
  list: document.querySelector('.feedback-list'),
  loader: document.querySelector('.feedback-loader-wrap'),
  prevBtn: document.querySelector('.feedback-nav-prev'),
  nextBtn: document.querySelector('.feedback-nav-next'),
  bottom: document.querySelector('.feedback-bottom'),
  pagination: document.querySelector('.feedback-pagination'),
};

let feedbackSwiper = null;

initFeedback();

async function initFeedback() {
  if (!refs.list) return;

  try {
    const feedbacks = await fetchFeedbacks();
    renderFeedbacks(feedbacks);
    refs.list.hidden = false;
    refs.prevBtn.hidden = false;
    refs.nextBtn.hidden = false;
    refs.bottom.hidden = false;
    initRatings();
    initSwiper();
  } catch (error) {
    refs.list.hidden = false;
    refs.list.innerHTML =
      '<li class="feedback-message">Не вдалося завантажити відгуки. Спробуйте оновити сторінку.</li>';
    console.error(error);
  } finally {
    refs.loader.hidden = true;
  }
}

async function fetchFeedbacks() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Feedback request failed: ${response.status}`);
  }

  const data = await response.json();
  return (data.feedbacks || []).slice(0, 10);
}

function renderFeedbacks(feedbacks) {
  refs.list.innerHTML = feedbacks.map(createFeedbackMarkup).join('');
}

function createFeedbackMarkup({ _id, rate, description, author }) {
  return `
    <li class="swiper-slide feedback-item">
      <article class="feedback-card">
        <div
          class="feedback-rating"
          data-rating="${Number(rate)}"
          aria-label="Оцінка ${Number(rate)} з 5"
        ></div>
        <p class="feedback-review">"${description}"</p>
        <h3 class="feedback-author">${author}</h3>
      </article>
    </li>
  `;
}

function initRatings() {
  document.querySelectorAll('.feedback-rating').forEach(ratingEl => {
    new Raty(ratingEl, {
      score: Number(ratingEl.dataset.rating),
      readOnly: true,
      halfShow: true,
      starType: 'i',
      space: false,
      hints: ['1', '2', '3', '4', '5'],
    }).init();
  });
}

function initSwiper() {
  if (feedbackSwiper) {
    feedbackSwiper.destroy(true, true);
  }

  feedbackSwiper = new Swiper('.feedback-swiper', {
    modules: [Navigation, Pagination, A11y],
    slidesPerView: 1,
    spaceBetween: 24,
    speed: 500,
    grabCursor: true,
    navigation: {
      prevEl: refs.prevBtn,
      nextEl: refs.nextBtn,
    },
    pagination: {
      el: refs.pagination,
      clickable: true,
      bulletClass: 'feedback-pagination-bullet',
      bulletActiveClass: 'feedback-pagination-bullet-active',
      renderBullet(index, className) {
        return `<button class="${className}" type="button" aria-label="Перейти до відгуку ${index + 1}"></button>`;
      },
    },
    a11y: {
      prevSlideMessage: 'Попередній відгук',
      nextSlideMessage: 'Наступний відгук',
      paginationBulletMessage: 'Перейти до відгуку {{index}}',
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 22,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  });
}
