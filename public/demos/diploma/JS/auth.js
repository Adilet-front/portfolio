document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  // 1. Обработка отправки формы авторизации (на странице auth.html)
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      if (username && password) {
        sessionStorage.setItem('isAuthorized', 'true');
        alert(`Добро пожаловать, ${username}! Вы успешно авторизовались.`);
        loginForm.reset(); 
        
        // После успешного входа перенаправляем обратно на главную
        window.location.href = 'main.html';
      }
    });
  }

// 2. Логика для кнопок бронирования на карточках (.book-btn)
  document.addEventListener('click', (e) => {
    const bookBtn = e.target.closest('.book-btn');
    
    if (bookBtn) {
      e.preventDefault(); // Стопаем дефолтное поведение ссылки
      
      const isAuthorized = sessionStorage.getItem('isAuthorized') === 'true';

      if (isAuthorized) {
        // ЕСЛИ АВТОРИЗОВАН: отправляем на страницу about.html прямо к ID секции бронирования!
        window.location.href = 'about.html#auth-section';
      } else {
        // ЕСЛИ НЕ АВТОРИЗОВАН: просим сначала войти
        alert('Пожалуйста, авторизуйтесь для бронирования.');
        window.location.href = 'auth.html'; 
      }
    }
  });

  // 3. Логика для кнопки "Записаться на прием"
  document.addEventListener('click', (e) => {
    const appointmentBtn = e.target.closest('.appointment-btn');
    
    if (appointmentBtn) {
      e.preventDefault();
      const isAuthorized = sessionStorage.getItem('isAuthorized') === 'true';

      if (!isAuthorized) {
        alert('Для записи на прием необходимо сначала авторизоваться на сайте.');
        window.location.href = 'auth.html';
      } else {
        const targetBlock = document.getElementById('booking-container');
        if (targetBlock) {
          targetBlock.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  });

  // 4. Проверка для кнопки "Зарегистрироваться" (.register-check-btn)
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('register-check-btn') || e.target.closest('.register-check-btn')) {
      e.preventDefault(); 
      const isAuthorized = sessionStorage.getItem('isAuthorized') === 'true';

      if (isAuthorized) {
        alert('Вы уже авторизованы в системе!');
      } else {
        window.location.href = 'auth.html';
      }
    }
  });

  // 5. ФОРМА ЗАПИСИ (Кнопка "Отправить") — РАБОТАЕТ ОТДЕЛЬНО, ПРОСТО АЛЕРТ
  const appointmentForm = document.querySelector('.appointment-form');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Намертво стопаем перезагрузку страницы, чтобы увидеть alert

      const nameInput = appointmentForm.querySelector('input[placeholder*="имя"]') || appointmentForm.querySelector('input[type="text"]');
      const phoneInput = appointmentForm.querySelector('input[type="tel"]');

      const name = nameInput ? nameInput.value.trim() : 'Не указано';
      const phone = phoneInput ? phoneInput.value.trim() : 'Не указано';

      // Выводим alert с данными формы
      alert(`Успешная запись!\n\nИмя: ${name}\nТелефон: ${phone}`);

      // Очищаем форму после нажатия ОК
      appointmentForm.reset();
    });
  }

  // 6. ОТДЕЛЬНАЯ ЛОГИКА ДЛЯ ФОРМЫ БРОНИРОВАНИЯ (На странице about.html со щенком)
  const bookingForm = document.querySelector('.booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Намертво стопаем перезагрузку страницы!

      // Ищем инпуты внутри этой формы
      const nameInput = bookingForm.querySelector('input[placeholder*="имя"]') || bookingForm.querySelector('input[type="text"]');
      const phoneInput = bookingForm.querySelector('input[type="tel"]');

      const name = nameInput ? nameInput.value.trim() : 'Не указано';
      const phone = phoneInput ? phoneInput.value.trim() : 'Не указано';

      // Выводим alert для Брони
      alert(`Успешное бронирование!\n\nДанные заявки:\nИмя: ${name}\nТелефон: ${phone}`);

      // Очищаем форму
      bookingForm.reset();
    });
  }
});

