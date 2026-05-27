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
  addListeners();
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
  refs.content.innerHTML = "";
  removeListeners();
}

function onEscPress(e) {
  if (e.key === "Escape") closeModal();
}

function onBackdropClick(e) {
  if (e.target === refs.backdrop) closeModal();
}

function addListeners() {
  refs.closeBtn.addEventListener("click", closeModal);
  refs.backdrop.addEventListener("click", onBackdropClick);
  document.addEventListener("keydown", onEscPress);
}

function removeListeners() {
  refs.closeBtn.removeEventListener("click", closeModal);
  refs.backdrop.removeEventListener("click", onBackdropClick);
  document.removeEventListener("keydown", onEscPress);
}