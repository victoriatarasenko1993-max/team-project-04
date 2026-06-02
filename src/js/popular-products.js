const POPULAR_API_URL =
  'https://deserts-store.b.goit.study/api/desserts?type=popular';

const API_ORIGIN = 'https://desserts-store.b.goit.study';

const refs = {
  section: document.querySelector('#popular-products'),
  viewport: document.querySelector('[data-popular-viewport]'),
  list: document.querySelector('[data-popular-list]'),
  pagination: document.querySelector('[data-popular-pagination]'),
  prevBtn: document.querySelector('[data-popular-prev]'),
  nextBtn: document.querySelector('[data-popular-next]'),
};

const state = {
  products: [],
  currentPage: 0,
  cardsPerPage: 1,
  pagesCount: 1,
};

initPopularProducts();

async function initPopularProducts() {
  if (
    !refs.section ||
    !refs.viewport ||
    !refs.list ||
    !refs.pagination ||
    !refs.prevBtn ||
    !refs.nextBtn
  ) {
    return;
  }

  try {
    setControlsDisabled(true);

    const products = await fetchPopularProducts();

    state.products = products;

    if (state.products.length < 3) {
      renderMessage('Популярних товарів поки недостатньо для відображення.');
      return;
    }

    renderProducts(state.products);
    updateSlider(true);
    addListeners();
  } catch (error) {
    console.error('Popular products error:', error);
    renderMessage('Не вдалося завантажити популярні товари. Спробуйте пізніше.');
  }
}

async function fetchPopularProducts() {
  const response = await fetch(POPULAR_API_URL);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const result = await response.json();

  console.log('Popular products API response:', result);

  const products = normalizeProducts(result);

  if (!products.length) {
    throw new Error('Products array was not found in API response.');
  }

  return products;
}

function normalizeProducts(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (!data || typeof data !== 'object') {
    return [];
  }

  const possibleArrays = [
    data.desserts,
    data.data,
    data.items,
    data.products,
    data.results,
    data.data?.desserts,
    data.data?.items,
    data.data?.products,
    data.data?.results,
  ];

  const foundArray = possibleArrays.find(Array.isArray);

  return foundArray || [];
}

function addListeners() {
  refs.prevBtn.addEventListener('click', onPrevBtnClick);
  refs.nextBtn.addEventListener('click', onNextBtnClick);
  refs.pagination.addEventListener('click', onPaginationClick);

  window.addEventListener(
    'resize',
    debounce(() => {
      updateSlider(false);
    }, 150)
  );
}

function onPrevBtnClick() {
  if (state.currentPage === 0) {
    return;
  }

  state.currentPage -= 1;
  moveSlider();
}

function onNextBtnClick() {
  if (state.currentPage >= state.pagesCount - 1) {
    return;
  }

  state.currentPage += 1;
  moveSlider();
}

function onPaginationClick(event) {
  const button = event.target.closest('[data-popular-page]');

  if (!button) {
    return;
  }

  state.currentPage = Number(button.dataset.popularPage);
  moveSlider();
}

function updateSlider(skipAnimation = false) {
  const previousCardsPerPage = state.cardsPerPage;

  state.cardsPerPage = getCardsPerPage();
  state.pagesCount = Math.ceil(state.products.length / state.cardsPerPage);

  if (previousCardsPerPage !== state.cardsPerPage) {
    state.currentPage = 0;
  }

  if (state.currentPage > state.pagesCount - 1) {
    state.currentPage = state.pagesCount - 1;
  }

  renderPagination();
  moveSlider(skipAnimation);
}

function getCardsPerPage() {
  if (window.matchMedia('(min-width: 1440px)').matches) {
    return 3;
  }

  if (window.matchMedia('(min-width: 768px)').matches) {
    return 2;
  }

  return 1;
}

function moveSlider(skipAnimation = false) {
  const firstCard = refs.list.querySelector('.popular-products__item');

  if (!firstCard) {
    return;
  }

  const styles = getComputedStyle(refs.list);
  const gap = parseFloat(styles.columnGap || styles.gap) || 0;
  const cardWidth = firstCard.getBoundingClientRect().width;
  const offset = state.currentPage * state.cardsPerPage * (cardWidth + gap);

  refs.list.classList.toggle('is-not-animated', skipAnimation);
  refs.list.style.transform = `translateX(-${offset}px)`;

  updateControls();

  if (skipAnimation) {
    requestAnimationFrame(() => {
      refs.list.classList.remove('is-not-animated');
    });
  }
}

function updateControls() {
  refs.prevBtn.disabled = state.currentPage === 0;
  refs.nextBtn.disabled = state.currentPage >= state.pagesCount - 1;

  refs.pagination
    .querySelectorAll('[data-popular-page]')
    .forEach((button, index) => {
      const isActive = index === state.currentPage;

      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
}

function setControlsDisabled(disabled) {
  refs.prevBtn.disabled = disabled;
  refs.nextBtn.disabled = disabled;
}

function renderProducts(products) {
  refs.list.innerHTML = products.map(createProductMarkup).join('');
}
function getProductCategory(product) {
  const category = product.category || product.type;

  if (typeof category === 'string') {
    return category;
  }

  if (category && typeof category === 'object') {
    return (
      category.name ||
      category.title ||
      category.value ||
      category.label ||
      category.slug ||
      'Популярне'
    );
  }

  return 'Популярне';
}
function createProductMarkup(product) {
  const image = getProductImage(product);
  const title = product.name || product.title || 'Десерт';
  const category = getProductCategory(product);
  const description = product.description || product.text || '';
  const price = formatPrice(product.price);

  return `
    <li class="popular-products__item">
      <article class="dessert-list-item">
        <img
          class="desserts-list-img"
          src="${escapeHtml(image)}"
          alt="${escapeHtml(title)}"
          loading="lazy"
          width="278"
          height="230"
        >

        <p class="desserts-item-categorie">${escapeHtml(category)}</p>

        <h3 class="desserts-item-title">${escapeHtml(title)}</h3>

        <p class="desserts-item-descr">${escapeHtml(description)}</p>

        <div class="dessert-card-bottom">
          <p class="desserts-item-price">${price}</p>

        <button
  class="desserts-item-btn"
  type="button"
  aria-label="Переглянути ${escapeHtml(title)}"
>
  <svg
    class="desserts-item-btn-icon"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="M7 17L17 7M17 7H9M17 7V15"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</button>
        </div>
      </article>
    </li>
  `;
}

function renderPagination() {
  refs.pagination.innerHTML = Array.from(
    { length: state.pagesCount },
    (_, index) => `
      <li class="popular-products__pagination-item">
        <button
          class="popular-products__pagination-btn"
          type="button"
          data-popular-page="${index}"
          aria-label="Перейти до слайду ${index + 1}"
        ></button>
      </li>
    `
  ).join('');
}

function renderMessage(message) {
  refs.list.innerHTML = `
    <li class="popular-products__message">
      ${escapeHtml(message)}
    </li>
  `;

  refs.pagination.innerHTML = '';
  setControlsDisabled(true);
}

function getProductImage(product) {
  const image =
    product.image ||
    product.img ||
    product.photo ||
    product.thumb ||
    product.picture ||
    product.images;

  let imageUrl = '';

  if (typeof image === 'string') {
    imageUrl = image;
  }

  if (Array.isArray(image)) {
    const firstImage = image[0];

    if (typeof firstImage === 'string') {
      imageUrl = firstImage;
    } else if (firstImage && typeof firstImage === 'object') {
      imageUrl = firstImage.url || firstImage.src || '';
    }
  }

  if (image && typeof image === 'object' && !Array.isArray(image)) {
    imageUrl =
      image.desktop ||
      image.tablet ||
      image.mobile ||
      image.url ||
      image.src ||
      Object.values(image).find(value => typeof value === 'string') ||
      '';
  }

  if (imageUrl.startsWith('/')) {
    return `${API_ORIGIN}${imageUrl}`;
  }

  return imageUrl;
}

function formatPrice(price) {
  if (typeof price === 'number') {
    return `${price} грн`;
  }

  if (typeof price === 'string' && price.trim()) {
    return price.includes('грн') ? escapeHtml(price) : `${escapeHtml(price)} грн`;
  }

  return 'Ціну уточнюйте';
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function debounce(callback, delay) {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}
