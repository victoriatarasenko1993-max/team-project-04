// CSS-Star-Rating

export function renderStars() {
document.querySelectorAll('.desserts-details-rating').forEach(ratingEl => {
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

export function renderDetailsDessert({
  name,
  description,
  composition,
  price,
  rate,
  image,
}) {
  return `<div class="modal-inner" data-modal-inner><img class="dessert-details-img" src="${image}" alt="${name}"/>
    <div class="modal-text"><h3 class="dessert-details-title">${name}</h3>
    <p class="price">${price} грн</p>
    <div
          class="desserts-details-rating"
          data-rating="${Number(rate)}"
          aria-label="Оцінка ${Number(rate)} з 5"
        ></div>
    <p class="description">${description}</p>
    <p class="composition"><strong>Склад:</strong> ${composition}</p><button class="order-btn" data-order-btn disabled>Перейти до замовлення</button></div>
    </div>

  `;
}

const loaderEl = document.querySelector("[data-loader]");

export function showLoader() {
    loaderEl.classList.remove("is-hidden");
}
export function hideLoader() {
    loaderEl.classList.add("is-hidden");
}
