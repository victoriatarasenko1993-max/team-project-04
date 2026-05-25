import { getDessertDetailsById } from "./dessert-details-api.js";
import { renderDetailsDessert } from "./render-function-modal-details.js";
import {showLoader, hideLoader} from "./render-function-modal-details.js";
import iziToast from "izitoast";
import "css-star-rating/css/star-rating.css";

const refs = {
    backdrop: document.querySelector("[data-modal]"),
    content: document.querySelector("[data-modal-content]"),
    closeBtn: document.querySelector("[data-modal-close]"),
    orderBtn: document.querySelector("[data-order-btn]"),
}

export async function openModal(id) {
    refs.backdrop.classList.remove("is-hidden");
    document.body.style.overflow = "hidden";
    
    refs.content.innerHTML = "";
    showLoader();
  try {
    const data = await getDessertDetailsById(id);
    refs.content.innerHTML = renderDetailsDessert(data);
  } catch {
      iziToast.error({
          title: 'Error',
          message: 'Illegal operation',
      });
  } finally {
      hideLoader();
  }
}

function closeModal() {
  refs.backdrop.classList.add("is-hidden");
  document.body.style.overflow = "";
}

refs.closeBtn.addEventListener("click", closeModal);

refs.backdrop.addEventListener("click", (e) => {
  if (e.target === backdrop) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ORDER BUTTON
refs.orderBtn.addEventListener("click", () => {
  closeModal();
  console.log("Открыть модалку заказа");
});