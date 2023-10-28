import { openModal, closeModal } from './modal';
import { postData } from '../services/services';

function forms(modalTimerId) {

  // Forms

  const forms = document.querySelectorAll('form');

  forms.forEach((item) => {
    bindPostData(item);
  });

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', statusMessage);

      // request.setRequestHeader('Content-type', 'multipart/form-data');
      // при создании новой формы, заголовок(setRequestHeader) в XMLHttpReques устанавливать не нужно. Но если мы хоти отправлять JSON файлы на сервер, то заголовок нужен.
      // request.setRequestHeader('Content-type', 'application/json');
      const formData = new FormData(form);

      // const object = {};
      // formData.forEach(function (value, key) {
      //   object[key] = value;
      // });Классический способ перебора объекта в объект

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        }).catch(() => {
          showThanksModal(message.failure);
        }).finally(() => {
          form.reset();
        })
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal('.modal', modalTimerId);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
    <div class="modal__content">
      <div class="modal__close" data-close>×</div>
      <div class="modal__title">${message}</div>
    </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal('.modal');
    }, 4000);
  }
}

export default forms;