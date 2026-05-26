import { getDessertDetailsById } from "./dessert-details-api.js";
import { renderDetailsDessert } from "./render-function-modal-details.js";
import { showLoader, hideLoader } from "./render-function-modal-details.js";
import { openOrderModal } from "./order-modal.js";

import iziToast from "izitoast";
const refs = {
    inner:document.querySelector("[data-modal-inner]"),
    backdrop: document.querySelector("[data-modal]"),
    content: document.querySelector("[data-modal-content]"),
    closeBtn: document.querySelector("[data-modal-close]"),
}

export async function openModal(id) {
    refs.backdrop.classList.remove("is-hidden");
    document.body.style.overflow = "hidden";
    
  refs.content.innerHTML = "";
    showLoader();
  try {
    const data = await getDessertDetailsById(id);
    refs.content.innerHTML = renderDetailsDessert(data);
    const orderBtn = document.querySelector(".order-btn");
    orderBtn.disabled = false;
    orderBtn.addEventListener("click", () => {
      orderBtn.disabled = true;
      closeModal();
      openOrderModal(id);
      });
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
  refs.orderBtn.disabled = true;
}

refs.closeBtn.addEventListener("click", closeModal);

refs.backdrop.addEventListener("click", (e) => {
  if (e.target === refs.backdrop) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
