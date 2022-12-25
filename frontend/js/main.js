const body = document.getElementsByTagName("body")[0];
const modalCallingBtn = document.getElementsByClassName("modal-for-calling")[0];
const header = document.getElementsByClassName("header")[0];

const modalMin = document.getElementById("modal-min");
const modalOptimum = document.getElementById("modal-optimum");
const modalVip = document.getElementById("modal-vip");

header.addEventListener("click", (event) => {
  const target = event.target;
  const btnBurger = document.getElementsByClassName("header-burger")[0];

  if (target.classList.contains("header-burger")) {
    btnBurger.classList.toggle("active");
    header.classList.toggle("active");
    body.classList.toggle("block");
  } else if (target.tagName === "LI" || target.tagName === "A") {
    btnBurger.classList.remove("active");
    header.classList.remove("active");
    body.classList.remove("block");
  }
});

body.onclick = (e) => {
  const target = e.target;
  const modalElem = target.parentElement.parentElement.children[1];

  if (target.classList.contains("modal-calling")) {
    return openModal(modalCallingBtn);
  }

  if (target.classList.contains("modal-status__close")) {
    const modalStatus = target.parentElement.parentElement;
    modalStatus.remove();
  }

  if (target.classList.contains("modal-status__ok")) {
    const modalStatus = target.parentElement.parentElement.parentElement;
    modalStatus.remove();
  } else if (target.classList.contains("modal-status")) {
    target.remove();
  }

  if (target.classList.contains("types-coverings__item-btn")) {
    return openModal(modalElem);
  } else if (target.classList.contains("show")) {
    return closeModal(target);
  } else if (target.classList.contains("modal__close")) {
    const modal = target.parentElement.parentElement;
    return closeModal(modal);
  }

  if (target.classList.contains("trigger")) {
    const modalWork =
      target.parentElement.parentElement.parentElement.children[1];
    return openModal(modalWork);
  }
};

function closeModal(el) {
  el.classList.remove("show");
  el.classList.add("hide");
  document.body.style.overflow = "";
}

function openModal(el) {
  el.classList.remove("hide");
  el.classList.add("show");
  document.body.style.overflow = "hidden";
}

/**
 * Плавный скролл
 */
const anchors = document.querySelectorAll('a[href^="#"]');
for (let anchor of anchors) {
  anchor.addEventListener("click", (event) => {
    event.preventDefault();
    const blockID = anchor.getAttribute("href");
    document.querySelector("" + blockID).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

/**
 *
 * Отправка сообщений
 */
const URL = "https://api-mixa.onrender.com";
const ringBackForm = document.getElementById("ringBackForm");
const reqCall = document.getElementById("req-call");
const requestCallMin = document.getElementById("msg-minimum");
const requestCallOptimum = document.getElementById("msg-optimum");
const requestCallVip = document.getElementById("msg-vip");
const orderForm = document.getElementById("msg-order");

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = `${URL}/emails/req-call`;
  const modalNameCall = document.getElementById("order-name");
  const modalPhoneCall = document.getElementById("order-phone");
  const modalEmailCall = document.getElementById("order-email");
  const body = {
    name: modalNameCall.value,
    phone: modalPhoneCall.value,
    email: modalEmailCall.value,
  };
  return sendBody(body, url);
});

requestCallVip.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = `${URL}/emails/req-call`;
  const modalNameCall = document.getElementById("modal-name-vip");
  const modalPhoneCall = document.getElementById("modal-phone-vip");
  const modalEmailCall = document.getElementById("modal-email-vip");
  const body = {
    name: modalNameCall.value,
    phone: modalPhoneCall.value,
    email: modalEmailCall.value,
  };
  closeModal(modalVip);
  return sendBody(body, url);
});

requestCallMin.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = `${URL}/emails/req-call`;
  const modalNameCall = document.getElementById("modal-name-minimum");
  const modalPhoneCall = document.getElementById("modal-phone-minimum");
  const modalEmailCall = document.getElementById("modal-email-minimum");
  const body = {
    name: modalNameCall.value,
    phone: modalPhoneCall.value,
    email: modalEmailCall.value,
  };
  closeModal(modalMin);
  return sendBody(body, url);
});

requestCallOptimum.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = `${URL}/emails/req-call`;
  const modalNameCall = document.getElementById("modal-name-optimum");
  const modalPhoneCall = document.getElementById("modal-phone-optimum");
  const modalEmailCall = document.getElementById("modal-email-optimum");
  const body = {
    name: modalNameCall.value,
    phone: modalPhoneCall.value,
    email: modalEmailCall.value,
  };
  closeModal(modalOptimum);
  return sendBody(body, url);
});

reqCall.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = `${URL}/emails/req-call`;
  const modalNameCall = document.getElementById("modal-name-call");
  const modalPhoneCall = document.getElementById("modal-phone-call");
  const modalEmailCall = document.getElementById("modal-email-call");
  const body = {
    name: modalNameCall.value,
    phone: modalPhoneCall.value,
    email: modalEmailCall.value,
  };
  closeModal(modalCallingBtn);
  return sendBody(body, url);
});

ringBackForm.addEventListener("submit", (e) => {
  const url = `${URL}/emails/ring`;
  const ringBackPhone = document.getElementById("ringBackPhone");
  e.preventDefault();
  const body = { phone: ringBackPhone.value.toString() };
  return sendBody(body, url);
});

async function sendBody(body, url) {
  try {
    messageLoading();
    const request = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (request.status.toString()[0] === "2") {
      messageSuccess();
      console.log("Сообщение отправлено");
      return;
    }

    if (request.status === 422) {
      console.log("Error");
      messageErrorValid();
      return;
    }

    messageError();
    console.log("Error");
  } catch (error) {
    messageError();
    console.log("Error");
  }
}

function messageError() {
  const text = document.getElementsByClassName("modal-status__text")[0];
  text.textContent = "Сообщение не отправлено, что-то пошло не так :(";
  removeSpinner();
  addBtnContinue();
}

function messageErrorValid() {
  const text = document.getElementsByClassName("modal-status__text")[0];
  text.textContent = "Пожалуйста заполните данные корректно";
  removeSpinner();
  addBtnContinue();
}

function messageSuccess() {
  const text = document.getElementsByClassName("modal-status__text")[0];
  text.textContent = "Ваше сообщение успешно отправлено!";
  removeSpinner();
  addBtnContinue();
}

function removeSpinner() {
  const spinner = document.getElementsByClassName("spiner")[0];
  spinner.remove();
}

function addBtnContinue() {
  document
    .getElementsByClassName("modal-status__info")[0]
    .insertAdjacentHTML(
      "beforeend",
      '<button class="modal-status__ok btn-style">Продолжить</button>'
    );
}

function messageLoading() {
  body.insertAdjacentHTML(
    "beforeend",
    `
  <div class="modal-status show fade">
  <div class="modal-status__dialog">
    <div class="modal-status__close" data-close="">×</div>
    <div class="modal-status__info">
      <p class="modal-status__text">Отправка сообщения...</p>
      <img class="spiner" src="./img/spinner.svg" alt="spiner">
    </div>
  </div>
</div>
  `
  );
}
