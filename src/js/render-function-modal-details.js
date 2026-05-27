
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
    <div class="rating" data-rating="${rate}"></div>
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