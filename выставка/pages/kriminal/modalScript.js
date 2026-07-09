const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('.modal__content-btn');
const searchInput = document.getElementById('search');
const searchBtn = document.querySelector('.search__btn');

function openModal () {
    let queru = searchInput.value.trim()
    if (queru == ''){
        searchInput.style.border = '2px solid #EE3C10';
    } else {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
    }
}

function closeModal () {
    modal.style.display = 'none';
    document.body.style.overflow = 'scroll';
    searchInput.value = '';
    
}

searchBtn.addEventListener('click', openModal);
modalBtn.addEventListener('click', closeModal);