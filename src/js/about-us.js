import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

let aboutSwiper = null;

const breakpoint = window.matchMedia('(min-width: 768px)');

function enableSwiper() {
  const swiperEl = document.querySelector('.about-swiper');
  if (!swiperEl) return;

  aboutSwiper = new Swiper(swiperEl, {
    modules: [Navigation, Pagination],

    slidesPerView: 2,
    slidesPerGroup: 1,
    spaceBetween: 24,
    speed: 700,
    loop: false,

    navigation: {
      nextEl: '.about-btn-next',
      prevEl: '.about-btn-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets',
    },
  });
}

function initAboutSwiper() {
  if (breakpoint.matches) {
    if (!aboutSwiper) enableSwiper();
  } else {
    if (aboutSwiper) {
      aboutSwiper.destroy(true, true);
      aboutSwiper = null;
    }
  }
}

initAboutSwiper();
breakpoint.addEventListener('change', initAboutSwiper);