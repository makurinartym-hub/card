// script.js - дополнительные интерактивные эффекты для карточек

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Эффект параллакса при движении мыши
    initParallaxEffect();
    
    // 2. Анимация появления карточек при скролле
    initScrollAnimation();
    
    // 3. Случайные цвета для карточек (если не заданы)
    initRandomColors();
    
});

// Эффект параллакса
function initParallaxEffect() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            const circle = this.querySelector('.circle');
            const content = this.querySelector('.content');
            
            if (circle && content) {
                circle.style.transform = `translate(${moveX}px, ${moveY}px)`;
                content.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const circle = this.querySelector('.circle');
            const content = this.querySelector('.content');
            
            if (circle && content) {
                circle.style.transform = 'translate(0, 0)';
                content.style.transform = 'translate(0, 0)';
            }
        });
    });
}

// Анимация при скролле
function initScrollAnimation() {
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
}

// Случайные цвета (если не заданы в HTML)
function initRandomColors() {
    const colors = [
        '#ff6b6b', '#4ecdc4', '#ffe66d', '#ff9f1c', 
        '#b5539f', '#2e86ab', '#a23b72', '#f18f01'
    ];
    
    document.querySelectorAll('.card:not([style*="--clr"])').forEach(card => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const circle = card.querySelector('.circle');
        if (circle) {
            circle.style.setProperty('--clr', randomColor);
        }
    });
}

// Дополнительный эффект: пульсация при клике
document.querySelectorAll('.card .content a').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Эффект пульсации
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        
        // Показать сообщение (для демонстрации)
        const card = this.closest('.card');
        const title = card.querySelector('h2').textContent;
        alert(`Вы нажали на карточку: ${title}`);
    });
});

// Функция для динамического создания новых карточек
function addNewCard(title, description, icon, color) {
    const container = document.querySelector('.container-icons');
    
    const newCard = document.createElement('div');
    newCard.className = 'card';
    
    newCard.innerHTML = `
        <div class="circle" style="--clr: ${color}">
            <div class="logo">
                <span class="icon">${icon}</span>
            </div>
        </div>
        <div class="content">
            <h2>${title}</h2>
            <p>${description}</p>
            <a href="#">Подробнее</a>
        </div>
    `;
    
    container.appendChild(newCard);
    
    // Анимация появления
    setTimeout(() => {
        newCard.style.opacity = '1';
        newCard.style.transform = 'translateY(0)';
    }, 100);
}

// Пример использования (можно вызвать в консоли):
// addNewCard('Новая карточка', 'Описание новой карточки', '✨', '#ff6b6b');