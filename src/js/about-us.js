// import Swiper from 'swiper';
// import { Navigation, Pagination } from 'swiper/modules';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// let aboutSwiper = null;

// const breakpoint = window.matchMedia('(min-width: 768px)');

// function initAboutSwiper() {
//   if (breakpoint.matches && !aboutSwiper) {
//     aboutSwiper = new Swiper('.about-swiper', {
//       modules: [Navigation, Pagination],

//       slidesPerView: 2,
//       spaceBetween: 24,
//       speed: 700,

//       navigation: {
//         nextEl: '.about-btn-next',
//         prevEl: '.about-btn-prev',
//       },

//       pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//       },

//       breakpoints: {
//         1440: {
//           spaceBetween: 24,
//         },
//       },
//     });
//   }

//   if (!breakpoint.matches && aboutSwiper) {
//     aboutSwiper.destroy(true, true);
//     aboutSwiper = null;
//   }
// }

// initAboutSwiper();
// window.addEventListener('resize', initAboutSwiper);

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

let aboutSwiper = null;

const breakpoint = window.matchMedia('(min-width: 768px)');

function enableSwiper() {
  aboutSwiper = new Swiper('.about-swiper', {
    modules: [Navigation, Pagination],

    slidesPerView: 2,
    slidesPerGroup: 1, 
    spaceBetween: 24,
    speed: 700,

    navigation: {
      nextEl: '.about-btn-next',
      prevEl: '.about-btn-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
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
window.addEventListener('resize', initAboutSwiper);