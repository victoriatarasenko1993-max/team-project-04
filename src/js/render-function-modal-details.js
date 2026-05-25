// CSS-Star-Rating
function getRatingClasses(rate) {
  const isHalf = rate % 1 !== 0;
  const value = Math.floor(rate);
  return `value-${value} ${isHalf ? "half" : ""}`;
}

function renderRating(rate) {
  return `
    <div class="rating large star-icon ${getRatingClasses(rate)} label-top">
      <div class="label-value">${rate}</div>
      <div class="star-container">
        ${Array(5)
          .fill(0)
          .map(
            () => `
          <div class="star">
            <i class="star-empty"></i>
            <i class="star-half"></i>
            <i class="star-filled"></i>
          </div>
        `
          )
          .join("")}
      </div>

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
  return `
    <img class="dessert-details-img" src="${image}" alt="${name}" />
    <div>
      <h3 class="dessert-details-title">${name}</h3>
      <p class="price">${price} грн</p>
      ${renderRating(rate)}
      <p class="description">${description}</p>
      <p class="composition">
        <strong>Склад:</strong> ${composition}
      </p>
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