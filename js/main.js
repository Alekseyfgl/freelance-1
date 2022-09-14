const body = document.getElementsByTagName('body')[0];
// let gallery = document.querySelectorAll(".image");
// let previewBox = document.querySelector(".preview-box");
// let previewImg = previewBox.querySelector("img");
// let closeIcon = previewBox.querySelector(".icon");
// let currentImg = previewBox.querySelector(".current-img");
// let totalImg = previewBox.querySelector(".total-img");
// let shadow = document.querySelector(".shadow");

let gallery;
let previewBox;
let previewImg;
let closeIcon;
let currentImg;
let totalImg;
let shadow;

let prevBtn;
let nextBtn;
let imageURL;

body.onclick = (e) => {
    const target = e.target;
    const modalElem = target.parentElement.parentElement.children[1];
    // console.log(e.target)
    // console.log(target)
    if (target.classList.contains('types-coverings__item-btn')) {
        openModal(modalElem)
    } else if (target.classList.contains('show')) {
        closeModal(target)
    } else if (target.classList.contains('modal__close')) {
        const modal = target.parentElement.parentElement;
        closeModal(modal)
    }

    if (target.classList.contains('trigger')) {
        const modalWork = target.parentElement.parentElement.parentElement.children[1];
        openModal(modalWork)
    }

}


function closeModal(el) {
    el.classList.remove('show')
    el.classList.add('hide');
    document.body.style.overflow = '';
}

function openModal(el) {
    el.classList.remove('hide')
    el.classList.add('show');
    document.body.style.overflow = 'hidden';
}

