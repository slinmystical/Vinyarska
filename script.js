document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && !event.target.closest('.menu-toggle')) {
            nav.classList.remove('active');
        }
    });
    
    // Модальное окно входа
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close');
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const guestLoginForm = document.getElementById('guestLoginForm');
    
    // Открытие модального окна
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'flex';
        });
    }
    
    // Закрытие модального окна
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            loginModal.style.display = 'none';
        });
    }
    
    // Закрытие по клику вне окна
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });
    
    // Вход как администратор (демо)
    if (adminLoginBtn) {
        adminLoginBtn.addEventListener('click', function() {
            alert('Дорогая мама! Это твой личный блог Vinyarska.\n\nТы можешь добавлять рецепты, редактировать посты и управлять всем содержимым.\n\nВ реальной версии здесь будет полноценная система входа!\n\nЛогин: мама\nПароль: семейный2024');
            loginModal.style.display = 'none';
            
            // Меняем кнопку входа на "Панель управления"
            loginBtn.innerHTML = '<i class="fas fa-user-cog"></i> Панель управления';
            loginBtn.href = '#';
            
            // Показываем уведомление
            showNotification('Вы вошли как администратор. Теперь вы можете добавлять и редактировать записи.');
        });
    }
    
    // Вход как гость (демо)
    if (guestLoginForm) {
        guestLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[type="text"]').value;
            alert(`Привет, ${name}! Вы вошли как гость.\nТеперь вы можете комментировать записи.`);
            loginModal.style.display = 'none';
            
            // Меняем кнопку входа на имя пользователя
            loginBtn.innerHTML = `<i class="fas fa-user"></i> ${name}`;
            loginBtn.href = '#';
            
            showNotification('Вы вошли как гость. Теперь вы можете оставлять комментарии.');
        });
    }
    
    // Показ уведомления
    function showNotification(message) {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Убираем уведомление через 5 секунд
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
    
    // Добавляем стили для анимации уведомлений
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Карточки постов - анимация при наведении
    const postCards = document.querySelectorAll('.post-card');
    postCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const readMore = this.querySelector('.read-more');
            if (readMore) {
                readMore.innerHTML = 'Читать дальше <i class="fas fa-arrow-right"></i>';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const readMore = this.querySelector('.read-more');
            if (readMore) {
                readMore.innerHTML = 'Читать дальше →';
            }
        });
    });
    
    // Имитация добавления комментария
    const commentDemo = document.createElement('div');
    commentDemo.innerHTML = `
        <div style="margin-top: 30px; padding: 20px; background-color: #f0f8ff; border-radius: 10px; border-left: 4px solid var(--primary-color);">
            <h4><i class="fas fa-comment"></i> Демо комментариев</h4>
            <p>Здесь будут появляться комментарии гостей. Вы можете попробовать:</p>
            <button id="addCommentDemo" class="btn" style="margin-top: 10px;">Добавить тестовый комментарий</button>
            <div id="demoComments" style="margin-top: 15px;"></div>
        </div>
    `;
    
    // Добавляем демо только на главной странице
    const seasonalSection = document.querySelector('.seasonal');
    if (seasonalSection) {
        seasonalSection.after(commentDemo);
        
        document.getElementById('addCommentDemo').addEventListener('click', function() {
            const commentsDiv = document.getElementById('demoComments');
            const comment = document.createElement('div');
            comment.className = 'demo-comment';
            comment.innerHTML = `
                <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 10px; border: 1px solid #eee;">
                    <strong>Гость:</strong> Какой замечательный блог! Обязательно попробую рецепт медового печенья!
                    <div style="font-size: 0.8rem; color: #777; margin-top: 5px;">Только что</div>
                </div>
            `;
            commentsDiv.prepend(comment);
            showNotification('Комментарий добавлен! В реальной версии комментарии будут сохраняться.');
        });
    }
});
