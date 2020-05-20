/* eslint-disable */
/////ALERTS/////
export const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="text-center alert alert-${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};