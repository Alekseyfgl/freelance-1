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
