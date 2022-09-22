const body = document.getElementsByTagName('body')[0];

body.onclick = (e) => {
    const target = e.target;
    const modalElem = target.parentElement.parentElement.children[1];

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

function foo(arr) {
    let str = '';
    let sql = `delete from nodes where id in`

    arr.forEach(item => {
        str += `${item},`
    })
    sql +=` (${str.slice(0,-1)})`
    console.log(sql)
}
foo([2,3,4,5,6,7])