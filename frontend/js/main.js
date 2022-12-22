const body = document.getElementsByTagName("body")[0];
const modalCallingBtn = document.getElementsByClassName("modal-for-calling")[0];
const header = document.getElementsByClassName("header")[0];

header.addEventListener("click", (event) => {
  const target = event.target;
  const btnBurger = document.getElementsByClassName("header-burger")[0];
  console.log(btnBurger);

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
const URL = "http://localhost:3000";
const ringBackForm = document.getElementById("ringBackForm");
const ringBackPhone = document.getElementById("ringBackPhone");

ringBackForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const body = { phone: ringBackPhone.value.toString() };
  return sendBody(body);
});

async function sendBody(body) {
  try {
    messageLoading();
    const request = await fetch(`${URL}/emails/ring`, {
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
    console.log("Error");
    messageError();
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
