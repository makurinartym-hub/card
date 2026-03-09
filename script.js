// Основные функции для блога
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Управление поиском
    initSearch();
    
    // 2. Плавная прокрутка к якорям
    initSmoothScroll();
    
    // 3. Мобильное меню (если нужно)
    initMobileMenu();
    
    // 4. Оглавление с подсветкой
    initTableOfContents();
    
    // 5. Ленивая загрузка изображений
    initLazyLoading();
    
    // 6. Кнопки "Поделиться"
    initShareButtons();
    
});

// Функция поиска
function initSearch() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchForm = document.querySelector('.search-form');
    
    if (searchToggle && searchForm) {
        searchToggle.addEventListener('click', function() {
            searchForm.classList.toggle('active');
            if (searchForm.classList.contains('active')) {
                searchForm.querySelector('input').focus();
            }
        });
        
        // Закрыть поиск при клике вне
        document.addEventListener('click', function(e) {
            if (!searchForm.contains(e.target) && !searchToggle.contains(e.target)) {
                searchForm.classList.remove('active');
            }
        });
    }
}

// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Обновить URL без перезагрузки
                history.pushState(null, null, this.getAttribute('href'));
            }
        });
    });
}

// Мобильное меню
function initMobileMenu() {
    // Создаем кнопку для мобильного меню, если ее нет
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('.main-nav');
        const header = document.querySelector('header .container');
        
        if (nav && !document.querySelector('.mobile-menu-toggle')) {
            const toggle = document.createElement('button');
            toggle.className = 'mobile-menu-toggle';
            toggle.innerHTML = '☰';
            toggle.style.cssText = `
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                padding: 10px;
            `;
            
            header.insertBefore(toggle, nav);
            
            nav.style.display = 'none';
            
            toggle.addEventListener('click', function() {
                if (nav.style.display === 'none') {
                    nav.style.display = 'block';
                    toggle.innerHTML = '✕';
                } else {
                    nav.style.display = 'none';
                    toggle.innerHTML = '☰';
                }
            });
        }
    }
}

// Подсветка активного пункта в оглавлении
function initTableOfContents() {
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    const sections = document.querySelectorAll('.post-content section');
    
    if (tocLinks.length && sections.length) {
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                    link.style.fontWeight = 'bold';
                    link.style.color = 'var(--primary-color)';
                }
            });
        });
    }
}

// Ленивая загрузка изображений
function initLazyLoading() {
    // Проверяем поддержку IntersectionObserver
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        // Находим все изображения, которые нужно загружать лениво
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback для старых браузеров
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }
}

// Кнопки "Поделиться"
function initShareButtons() {
    const shareButtons = document.querySelector('.share-buttons');
    
    if (shareButtons) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        
        const shareHtml = `
            <span>Поделиться:</span>
            <a href="https://vk.com/share.php?url=${url}" target="_blank" class="share-btn vk">VK</a>
            <a href="https://t.me/share/url?url=${url}&text=${title}" target="_blank" class="share-btn tg">Telegram</a>
            <a href="https://twitter.com/intent/tweet?url=${url}&text=${title}" target="_blank" class="share-btn twitter">Twitter</a>
            <button class="share-btn copy" onclick="copyToClipboard('${window.location.href}')">Копировать</button>
        `;
        
        shareButtons.innerHTML = shareHtml;
        
        // Добавляем стили для кнопок
        const style = document.createElement('style');
        style.textContent = `
            .share-btn {
                padding: 5px 10px;
                border-radius: 5px;
                text-decoration: none;
                color: white;
                font-size: 14px;
                border: none;
                cursor: pointer;
            }
            .share-btn.vk { background: #4a76a8; }
            .share-btn.tg { background: #0088cc; }
            .share-btn.twitter { background: #1da1f2; }
            .share-btn.copy { background: #6c757d; }
        `;
        document.head.appendChild(style);
    }
}

// Функция копирования в буфер
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Ссылка скопирована!');
    }).catch(() => {
        // Fallback для старых браузеров
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Ссылка скопирована!');
    });
}

// Дополнительная функция: прогресс чтения
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--primary-color);
        z-index: 1001;
        transition: width 0.1s;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Инициализируем прогресс чтения
initReadingProgress();

// Функция для загрузки комментариев (заглушка)
function loadComments() {
    console.log('Загрузка комментариев...');
    // Здесь можно подключить Disqus, Commento или другую систему
}