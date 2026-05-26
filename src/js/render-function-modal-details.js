// CSS-Star-Rating

function renderStars(rate) {
  const fullStars = Math.floor(rate);
  const hasHalf = rate % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return `
    <div class="stars">
      
      ${Array(fullStars)
        .fill()
        .map(() => `
          <svg class="star filled">
            <use href="#icon-star"></use>
          </svg>
        `)
        .join("")}

      ${
        hasHalf
          ? `
        <svg class="star half">
          <use href="#icon-star"></use>
        </svg>
      `
          : ""
      }

      ${Array(emptyStars)
        .fill()
        .map(() => `
          <svg class="star empty">
            <use href="#icon-star"></use>
          </svg>
        `)
        .join("")}

    </div>
  `;
}

export function renderDetailsDessert({
  name,
  description,
  composition,
  price,
  rate,
  image,
}) {
    return `<div class="modal-inner">
    <img class="dessert-details-img" src="${image}" alt="${name}" />
    <div class="modal-text">
    <h3 class="dessert-details-title">${name}</h3>
    <p class="price">${price} грн</p>
    ${renderStars(rate)}
    <p class="description">${description}</p>
    <p class="composition"><strong>Склад:</strong> ${composition}</p>
    </div>
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