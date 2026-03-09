// script.js - для динамического изменения цвета и других эффектов

document.addEventListener('DOMContentLoaded', function() {
    
    // Можно менять цвет при клике
    const card = document.querySelector('.card');
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#ff9f1c', '#b5539f'];
    let colorIndex = 0;
    
    card.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.setProperty('--clr', colors[colorIndex]);
    });
    
    // Добавляем эффект при наведении
    card.addEventListener('mouseenter', function() {
        console.log('Карточка активирована');
    });
    
    card.addEventListener('mouseleave', function() {
        console.log('Карточка деактивирована');
    });
    
    // Можно добавить анимацию появления
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        card.style.opacity = 1;
        card.style.transform = 'translateY(0)';
    }, 100);
});