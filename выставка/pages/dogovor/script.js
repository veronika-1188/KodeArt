document.addEventListener('DOMContentLoaded', function() {
    let btn = document.getElementById('btn');
    let fio = document.getElementById('fio');
    let problem = document.getElementById('problem');
    let date = document.getElementById('date');
    const res = document.querySelector('.result__text');
    
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal__content">
            <p class="modal__text">Заполните все поля</p>
            <button class="modal__btn">OK</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    const modalBtn = modal.querySelector('.modal__btn');
    
    // Функция проверки заполнения полей
    function checkFields() {
        return fio.value.trim() !== '' && 
               problem.value.trim() !== '' && 
               date.value.trim() !== '';
    }

    // Закрытие модального окна
    modalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Закрытие по клику вне модального окна
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    btn.addEventListener('click', (event) => {
        event.preventDefault();
        
        // Проверяем заполнение полей
        if (!checkFields()) {
            modal.style.display = 'block';
            return;
        }
        
        // Если все поля заполнены, продолжаем выполнение
        res.style.display = "block";
        res.style.transition = "0.9s";
        btn.style.color = "#fff";
        btn.style.setProperty('--before-display', 'block');
        
        const styles = window.getComputedStyle(btn, '::before');
        console.log('Display после клика:', styles.display);
    });
});