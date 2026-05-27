const BASE_URL = 'https://deserts-store.b.goit.study/api';

const refs = {
  list: document.querySelector('[data-popular-list]'),
  viewport: document.querySelector('[data-popular-viewport]'),
  prevBtn: document.querySelector('[data-popular-prev]'),
  nextBtn: document.querySelector('[data-popular-next]'),
  pagination: document.querySelector('[data-popular-pagination]'),
};

let products = [];
let currentIndex = 0;
let itemsPerView = 1;
let maxIndex = 0;

initPopularProducts();

async function initPopularProducts() {
  if (!refs.list || !refs.viewport || !refs.prevBtn || !refs.nextBtn || !refs.pagination) {
    return;
  }

  try {
    products = await fetchPopularProducts();

    if (!products.length) {
      refs.list.innerHTML = `
        <li class="popular-products__empty">
          Популярні товари не знайдено
        </li>
      `;
      refs.prevBtn.disabled = true;
      refs.nextBtn.disabled = true;
      return;
    }

    updateItemsPerView();
    renderProducts(products);
    renderPagination();
    updateSlider();

    refs.prevBtn.addEventListener('click', onPrevClick);
    refs.nextBtn.addEventListener('click', onNextClick);
    refs.pagination.addEventListener('click', onPaginationClick);
    window.addEventListener('resize', onResize);

    initSwipe();
  } catch (error) {
    console.error('POPULAR PRODUCTS ERROR:', error);

    refs.list.innerHTML = `
      <li class="popular-products__empty">
        Не вдалося завантажити популярні товари
      </li>
    `;

    refs.prevBtn.disabled = true;
    refs.nextBtn.disabled = true;
  }
}

async function fetchPopularProducts() {
  const response = await fetch(`${BASE_URL}/desserts?type=popular`);

  if (!response.ok) {
    throw new Error(`Failed to fetch popular products. Status: ${response.status}`);
  }

  const data = await response.json();

  return normalizeProductsResponse(data);
}

function normalizeProductsResponse(data) {
  if (Array.isArray(data)) {
    return data;
  }

  return data.data || data.desserts || data.results || data.items || [];
}

function renderProducts(items) {
  refs.list.innerHTML = items.map(createProductCard).join('');
}

function createProductCard(product) {
  const productId = product._id || product.id || '';
  const productName = product.name || product.title || 'Десерт';
  const productCategory =
    product.category ||
    product.type ||
    product.categoryName ||
    'Шоколадні випічки';

  const productDescription =
    product.shortDescription ||
    product.description ||
    product.text ||
    'Соковитий десерт з натуральними інгредієнтами.';

  const productImage =
    product.image ||
    product.img ||
    product.preview ||
    product.photo ||
    product.imageUrl ||
    '';

  const productPrice = getProductPrice(product.price);

  return `
    <li class="popular-products__item">
      <article class="popular-card" data-id="${productId}">
        <img
          class="popular-card__image"
          src="${productImage}"
          alt="${escapeHtml(productName)}"
          loading="lazy"
        />

        <p class="popular-card__category">${escapeHtml(productCategory)}</p>

        <h3 class="popular-card__title">${escapeHtml(productName)}</h3>

        <p class="popular-card__description">${escapeHtml(productDescription)}</p>

        <div class="popular-card__bottom">
          <p class="popular-card__price">${productPrice}</p>

          <button
            class="popular-card__details-btn"
            type="button"
            data-dessert-id="${productId}"
            aria-label="Відкрити деталі товару ${escapeHtml(productName)}"
          >
            ↗
          </button>
        </div>
      </article>
    </li>
  `;
}

function getProductPrice(price) {
  if (price === undefined || price === null || price === '') {
    return '';
  }

  return `${price} грн`;
}

function updateItemsPerView() {
  const width = window.innerWidth;

  if (width >= 1440) {
    itemsPerView = 3;
  } else if (width >= 768) {
    itemsPerView = 2;
  } else {
    itemsPerView = 1;
  }

  maxIndex = Math.max(products.length - itemsPerView, 0);

  if (currentIndex > maxIndex) {
    currentIndex = maxIndex;
  }
}

function updateSlider() {
  const firstItem = refs.list.querySelector('.popular-products__item');

  if (!firstItem) {
    return;
  }

  const itemWidth = firstItem.getBoundingClientRect().width;
  const gap = getListGap(refs.list);
  const offset = currentIndex * (itemWidth + gap);

  refs.list.style.transform = `translateX(-${offset}px)`;

  refs.prevBtn.disabled = currentIndex === 0;
  refs.nextBtn.disabled = currentIndex === maxIndex;

  updatePagination();
}

function getListGap(element) {
  const styles = window.getComputedStyle(element);

  return parseFloat(styles.columnGap || styles.gap) || 0;
}

function onPrevClick() {
  if (currentIndex === 0) {
    return;
  }

  currentIndex -= 1;
  updateSlider();
}

function onNextClick() {
  if (currentIndex === maxIndex) {
    return;
  }

  currentIndex += 1;
  updateSlider();
}

function renderPagination() {
  const pagesCount = maxIndex + 1;

  refs.pagination.innerHTML = Array.from({ length: pagesCount }, (_, index) => {
    return `
      <li class="popular-products__pagination-item">
        <button
          class="popular-products__pagination-btn"
          type="button"
          data-popular-page="${index}"
          aria-label="Перейти до слайду ${index + 1}"
        ></button>
      </li>
    `;
  }).join('');
}

function onPaginationClick(event) {
  const button = event.target.closest('[data-popular-page]');

  if (!button) {
    return;
  }

  currentIndex = Number(button.dataset.popularPage);
  updateSlider();
}

function updatePagination() {
  const buttons = refs.pagination.querySelectorAll('[data-popular-page]');

  buttons.forEach((button, index) => {
    button.classList.toggle(
      'popular-products__pagination-btn--active',
      index === currentIndex
    );
  });
}

function onResize() {
  updateItemsPerView();
  renderPagination();
  updateSlider();
}

function initSwipe() {
  let startX = 0;
  let currentX = 0;
  let isSwiping = false;

  refs.viewport.addEventListener('touchstart', event => {
    startX = event.touches[0].clientX;
    currentX = startX;
    isSwiping = true;
  });

  refs.viewport.addEventListener('touchmove', event => {
    if (!isSwiping) {
      return;
    }

    currentX = event.touches[0].clientX;
  });

  refs.viewport.addEventListener('touchend', () => {
    if (!isSwiping) {
      return;
    }

    const diff = startX - currentX;
    const minSwipeDistance = 50;

    if (Math.abs(diff) >= minSwipeDistance) {
      if (diff > 0) {
        onNextClick();
      } else {
        onPrevClick();
      }
    }

    startX = 0;
    currentX = 0;
    isSwiping = false;
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}