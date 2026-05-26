import axios from 'axios';
import iziToast from 'izitoast';

const ORDER_API_URL = 'https://deserts-store.b.goit.study/api/orders';

// Тимчасовий fallback id для тесту модалки окремо.
// Після інтеграції з details modal сюди буде приходити реальний dessertId.
const DEFAULT_DESSERT_ID = '6852a9fcb459460cb6b47748';

const orderBackdrop = document.querySelector('[data-order-backdrop]');
const orderCloseBtn = document.querySelector('[data-order-close]');
const orderForm = document.querySelector('[data-order-form]');

let currentDessertId = DEFAULT_DESSERT_ID;

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

function openOrderModal(dessertId = DEFAULT_DESSERT_ID) {
  if (!orderBackdrop) return;

  currentDessertId = dessertId;

  orderBackdrop.classList.remove('is-hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscKeyPress);
}

function closeOrderModal() {
  if (!orderBackdrop) return;

  orderBackdrop.classList.add('is-hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscKeyPress);
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

  const submitBtn = orderForm.querySelector('.order-form-submit');
  const formData = new FormData(orderForm);

  const orderData = {
    name: formData.get('name').trim(),
    phone: formData.get('phone').trim(),
    dessertId: currentDessertId,
    comment: formData.get('comment').trim(),
  };

  if (!orderData.name || !orderData.phone || !orderData.comment) {
    showErrorToast('Будь ласка, заповніть усі поля форми.');
    return;
  }

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

orderCloseBtn?.addEventListener('click', closeOrderModal);
orderBackdrop?.addEventListener('click', onBackdropClick);
orderForm?.addEventListener('submit', onOrderFormSubmit);

window.openOrderModal = openOrderModal;

// Для інтеграції з details modal:
// import { openOrderModal } from './order-modal';
export { openOrderModal };