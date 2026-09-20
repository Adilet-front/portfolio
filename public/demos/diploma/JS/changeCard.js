document.addEventListener('DOMContentLoaded', () => {
    // База данных сотрудников (замените пути к картинкам и ссылки на свои)
    const teamData = {
        0: {
            name: "Алина Маистер",
            role: "Няня для животных",
            img: "../assets/icons/alina.png",
            text: "«Я много лет работаю няней для животных и каждое мгновение рядом с питомцами дарит мне радость. Знаю, как найти подход к любой собаке или кошке: успокоить тревожного, развеселить грустного, дать заботу тому, кто скучает...»",
            socials: ["../assets/svg/Symbol1.svg", "../assets/svg/twitter.svg", "../assets/svg/youtube3.svg", "../assets/svg/linkidin4.svg"]
        },
        1: {
            name: "Дэвит Смит",
            role: "Координатор по работе",
            img: "../assets/icons/Itan.png", // Укажите правильный путь к большому фото Дэвита
            text: "«Привет! Я координирую все процессы в нашей команде, чтобы взаимодействие между хозяевами, нянями и ветеринарами было максимально комфортным, быстрым и безопасным для ваших любимцев.»",
            socials: ["../assets/svg/Symbol1.svg", "../assets/svg/twitter.svg", "../assets/svg/youtube3.svg", "../assets/svg/linkidin4.svg"]
        },
        2: {
            name: "Эмма Браун",
            role: "Ветеринар",
            img: "../assets/icons/Bekka.png", // Путь к большому фото Эммы
            text: "«Здоровье хвостатых и усатых пациентов — мой главный приоритет. Провожу регулярные осмотры, слежу за самочувствием и всегда готова оказать квалифицированную медицинскую помощь.»",
            socials: ["../assets/svg/Symbol1.svg", "../assets/svg/twitter.svg", "../assets/svg/youtube3.svg", "../assets/svg/linkidin4.svg"]
        },
        3: {
            name: "Мэри Глоуд",
            role: "Грумер",
            img: "../assets/icons/Sandra.png", // Путь к большому фото Мэри
            text: "«Красота требует заботы! С удовольствием сделаю вашему питомцу стильную стрижку, помою профессиональными средствами и приведу в порядок когти и шерстку без стресса.»",
            socials: ["../assets/svg/Symbol1.svg", "../assets/svg/twitter.svg", "../assets/svg/youtube3.svg", "../assets/svg/linkidin4.svg"]
        }
    };

    const tabs = document.querySelectorAll('.team-member-tab');
    const mainCard = document.querySelector('.team-main-card');
    
    // Элементы внутри главной карточки, которые будем менять
    const mainImg = mainCard.querySelector('.main-card-img img');
    const mainTitle = mainCard.querySelector('.main-card-content h3');
    const mainRole = mainCard.querySelector('.member-role');
    const mainText = mainCard.querySelector('.main-card-content p');
    const mainSocials = mainCard.querySelectorAll('.social-links a img');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Если кликнули по уже активному — ничего не делаем
            if (tab.classList.contains('active')) return;

            // 1. Переключаем активный класс слева (активирует вашу CSS-линию)
            document.querySelector('.team-member-tab.active').classList.remove('active');
            tab.classList.add('active');

            // 2. Запускаем анимацию исчезновения главной карточки
            mainCard.classList.add('fade-out');

            // 3. Ждем, пока карточка станет прозрачной (300мс), меняем текст и проявляем обратно
            setTimeout(() => {
                const data = teamData[index];
                
                if (data) {
                    mainImg.src = data.img;
                    mainImg.alt = data.name;
                    mainTitle.textContent = data.name;
                    mainRole.textContent = data.role;
                    mainText.innerHTML = data.text; // innerHTML, если используете <br>
                    
                    // Обновляем иконки соцсетей, если они есть
                    mainSocials.forEach((img, i) => {
                        if (data.socials[i]) img.src = data.socials[i];
                    });
                }

                // Убираем класс исчезновения, срабатывает анимация появления
                mainCard.classList.remove('fade-out');
            }, 300); // Время должно совпадать с transition в CSS
        });
    });
});
