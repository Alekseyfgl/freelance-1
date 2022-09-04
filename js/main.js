const body = document.getElementsByTagName('body')[0];


body.addEventListener('click', (e) => {
    const target = e.target;
    const modalElem = target.parentElement.parentElement.children[1]//
    // console.log(target)

    if (target.classList.contains('types-coverings__item-btn')) {
        openModal(modalElem)
    } else if (target.classList.contains('show')) {
        closeModal(target)
    } else if (target.classList.contains('modal__close')) {
        const modal = target.parentElement.parentElement;
        closeModal(modal)
    }
})


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