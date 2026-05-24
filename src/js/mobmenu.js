const openBtn = document.querySelector('.burger-btn');
const closeBtn = document.querySelector('.mob-menu-close');
const mobMenu = document.querySelector('.mob-menu');

const menuLinks = document.querySelectorAll('.js-close-menu');

if (openBtn && closeBtn && mobMenu) {
  openBtn.addEventListener('click', openMenu);

  closeBtn.addEventListener('click', closeMenu);

  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
}

function openMenu() {
  mobMenu.classList.remove('is-hidden');

  document.body.classList.add('no-scroll');
}

function closeMenu() {
  mobMenu.classList.add('is-hidden');

  document.body.classList.remove('no-scroll');
}
