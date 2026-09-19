document.addEventListener("DOMContentLoaded", () => {
    
    function initSlider({ trackSel, prevSel, nextSel, dotSel, cardSel, gapSize, visibleCount }) {
        const track = document.querySelector(trackSel);
        if (!track) return; // Если трека нет на этой странице (например, на странице Блога), просто выходим без ошибок

        // Ищем элементы внутри контейнера слайдера, чтобы не пересекаться с другими блоками
        const container = track.closest('.testimonials-container') || track.closest('section') || track.parentElement.parentElement;
        
        // Поиск с подстраховкой: сначала ищем внутри контейнера, если нет — ищем глобально в документе
        const prevBtn = container.querySelector(prevSel) || document.querySelector(prevSel);
        const nextBtn = container.querySelector(nextSel) || document.querySelector(nextSel);
        const dots = container.querySelectorAll(dotSel).length ? container.querySelectorAll(dotSel) : document.querySelectorAll(dotSel);
        const cards = track.querySelectorAll(cardSel);

        // Если критически важные кнопки не найдены, прекращаем работу этого слайдера
        if (cards.length === 0 || !prevBtn || !nextBtn) return;

        let currentIndex = 0;
        const maxIndex = cards.length - visibleCount;

        function updateSlider() {
            if (!cards[0]) return;
            const cardWidth = cards[0].getBoundingClientRect().width;
            const moveAmount = currentIndex * (cardWidth + gapSize);
            track.style.transform = `translateX(-${moveAmount}px)`;

            // Обновляем точки пагинации, если они есть
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        nextBtn.addEventListener('click', () => {
            if (currentIndex < maxIndex) { 
                currentIndex++; 
            } else { 
                currentIndex = 0; 
            }
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) { 
                currentIndex--; 
            } else { 
                currentIndex = maxIndex; 
            }
            updateSlider();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (index <= maxIndex) {
                    currentIndex = index;
                    updateSlider();
                }
            });
        });

        window.addEventListener('resize', updateSlider);
        
        // Стартовая инициализация положения
        updateSlider();
    }

    // --- ИНИЦИАЛИЗАЦИЯ ВСЕХ СЛАЙДЕРОВ СУЩЕСТВУЮЩИХ НА СТРАНИЦЕ ---

    // 1. Слайдер услуг (Блок 3)
    initSlider({
        trackSel: '.b3-cards-track',
        prevSel: '.b3-prev',
        nextSel: '.b3-next',
        dotSel: '.b3-dot',
        cardSel: '.b3-card',
        gapSize: 24,
        visibleCount: 3
    });

    // 2. Первый слайдер отзывов (по 2 карточки)
    initSlider({
        trackSel: '.testimonials-track:not(.testimonials-slider .testimonials-track)', 
        prevSel: '.test-prev',
        nextSel: '.test-next',
        dotSel: '.slider-dots:not(.slider-dots-3) .dot',
        cardSel: '.testimonial-card:not(.testimonials-slider .testimonial-card)',
        gapSize: 24,
        visibleCount: 2
    });

    // 3. Третий слайдер отзывов (с кнопками внизу)
    initSlider({
        trackSel: '.testimonials-slider .testimonials-track', 
        prevSel: '.slider-controls .test-prev-3', 
        nextSel: '.slider-controls .test-next-3', 
        dotSel: '.slider-dots-3 .dot',            
        cardSel: '.testimonials-slider .testimonial-card',
        gapSize: 30,
        visibleCount: 2
    });

});