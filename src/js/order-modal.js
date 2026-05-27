import axios from 'axios';
import iziToast from 'izitoast';

const ORDER_API_URL = 'https://deserts-store.b.goit.study/api/orders';

const orderBackdrop = document.querySelector('[data-order-backdrop]');
const orderCloseBtn = document.querySelector('[data-order-close]');
const orderForm = document.querySelector('[data-order-form]');

let currentDessertId = null;
let modalListenersAttached = false;

function showSuccessToast(orderNum) {
  iziToast.success({
    title: 'Успіх',
    message: `Замовлення №${orderNum} успішно створено!`,
    position: 'topRight',
    timeout: 4000,
  });
}

function showErrorToast(message) {
  iziToast.error({
    title: 'Помилка',
    message,
    position: 'topRight',
    timeout: 5000,
  });
}

function openOrderModal(dessertId) {
  if (!orderBackdrop) return;

  if (!dessertId) {
    showErrorToast('Не вдалося визначити десерт для замовлення.');
    return;
  }

  currentDessertId = dessertId;

  orderBackdrop.classList.remove('is-hidden');
  document.body.classList.add('modal-open');

  addModalListeners();
}

function closeOrderModal() {
  if (!orderBackdrop) return;

  orderBackdrop.classList.add('is-hidden');
  document.body.classList.remove('modal-open');

  removeModalListeners();
}

function addModalListeners() {
  if (modalListenersAttached) return;

  orderCloseBtn?.addEventListener('click', closeOrderModal);
  orderBackdrop?.addEventListener('click', onBackdropClick);
  orderForm?.addEventListener('submit', onOrderFormSubmit);
  document.addEventListener('keydown', onEscKeyPress);

  modalListenersAttached = true;
}

function removeModalListeners() {
  if (!modalListenersAttached) return;

  orderCloseBtn?.removeEventListener('click', closeOrderModal);
  orderBackdrop?.removeEventListener('click', onBackdropClick);
  orderForm?.removeEventListener('submit', onOrderFormSubmit);
  document.removeEventListener('keydown', onEscKeyPress);

  modalListenersAttached = false;
}

function onEscKeyPress(event) {
  if (event.key === 'Escape') {
    closeOrderModal();
  }
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    closeOrderModal();
  }
}

async function onOrderFormSubmit(event) {
  event.preventDefault();

  if (!orderForm.checkValidity()) {
    orderForm.reportValidity();
    return;
  }

  const submitBtn = orderForm.querySelector('.order-form-submit');
  const formData = new FormData(orderForm);

  const orderData = {
    name: formData.get('name').trim(),
    phone: formData.get('phone').trim(),
    dessertId: currentDessertId,
    comment: formData.get('comment').trim(),
  };

  try {
    if (submitBtn) {
      submitBtn.disabled = true;
    }

    const response = await axios.post(ORDER_API_URL, orderData);

    showSuccessToast(response.data.orderNum);

    orderForm.reset();
    closeOrderModal();
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      'Не вдалося створити замовлення. Перевірте дані та спробуйте ще раз.';

    showErrorToast(errorMessage);
    console.error(error);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
    }
  }
}

export { openOrderModal };