export type ProfileLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  year: string;
  cover: string;
  gallery: string[];
  summary: string;
  body: string;
  figmaUrl: string;
  liveUrl: string;
  tags: string[];
  role: string;
  deliverables: string[];
};

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  location: string;
  about: string;
  aboutShort: string;
  aboutFull: string;
  telegram: string;
  telegramUrl: string;
  telegramLabel: string;
  focus: string[];
  memberSince: string;
  avatar: string;
  shareTitle: string;
  shareText: string;
  projects: Project[];
};

export const projects: Project[] = [
  {
    slug: "diploma-grooming",
    title: "Flutt — Сервис груминга питомцев (Дипломная работа)",
    shortTitle: "Дипломная работа / Flutt",
    category: "Frontend & UI/UX",
    year: "2024",
    role: "UI/UX Design & Frontend Development",
    cover: "/projects/diploma-cover.png",
    gallery: [
      "/projects/diploma-cover.png",
      "/projects/diploma-detail.png"
    ],
    summary:
      "Дипломный проект: многостраничный интерактивный веб-сервис для салона груминга Flutt с каталогом услуг, блогом, видеоинструкциями и формой онлайн-бронирования.",
    body:
      "Комплексная дипломная работа по дизайну и фронтенд-разработке веб-приложения для груминг-салона Flutt.\n\nВ проекте спроектирована целостная дизайн-система и реализована многостраничная адаптивная вёрстка (Главная, О нас, Услуги, Блог, Команда, Авторизация).\n\nСайт полностью интерактивен: настроена анимация карточек, слайдеры, видеоплеер, формы записи и валидация данных.",
    figmaUrl: "https://www.figma.com/design/demo-flutt-grooming-diploma",
    liveUrl: "/demos/diploma/html/main.html",
    tags: ["HTML5", "CSS3", "JavaScript", "UI/UX Design", "Figma", "Responsive"],
    deliverables: [
      "UI/UX дизайн-макет",
      "Многостраничная верстка",
      "Интерактивные скрипты",
      "Адаптивный дизайн (Mobile & Desktop)"
    ]
  },
  {
    slug: "lumine",
    title: "Website / Бренд янтарных украшений (Amber jewelry brand)",
    shortTitle: "LUMINE / Ювелирный бренд",
    category: "E-Commerce & Branding",
    year: "2024",
    role: "UI/UX & Visual Design",
    cover: "/projects/lumine-cover.jpg",
    gallery: [
      "/projects/lumine-cover.jpg",
      "/projects/lumine-detail.jpg"
    ],
    summary:
      "Концепт премиального сайта для бренда украшений из янтаря: утончённая типографика, свободное пространство и крупные кадры изделий.",
    body:
      "Концепт интернет-магазина для бренда авторских янтарных украшений LUMINE.\n\nГлавный экран строится вокруг крупного названия и атмосферного портрета, погружая пользователя в эстетику бренда. Далее представлена интерактивная сетка изделий с фильтрацией по коллекциям, блок об истории и происхождении балтийского янтаря, а также интуитивный чекаут в 2 шага.\n\nПроект опубликован на Behance с детальной презентацией дизайн-решений.",
    figmaUrl: "https://www.figma.com/design/demo-lumine-jewelry-concept",
    liveUrl: "https://www.behance.net/gallery/245066905/Websitebrend-jantarnyh-ukrashenijAmber-jewelry-brand",
    tags: ["Figma", "UI/UX", "Web Design", "Behance", "Branding"],
    deliverables: [
      "Дизайн-система",
      "UI Kit",
      "Прототип мобильной версии",
      "Behance презентация"
    ]
  }
];

export const profile: Profile = {
  name: "Молдоисаева Алия",
  role: "Product & UI/UX Designer",
  tagline: "UI/UX, Web Design",
  location: "Бишкек, Кыргызстан",
  about:
    "Алия. Веб-дизайнер, который помогает продуктам расти за счёт визуальной ясности, ритма и понятного пути пользователя.",
  aboutShort:
    "Алия. Веб-дизайнер, который помогает сайту расти за счёт ясности, ритма и понятного пути пользователя.",
  aboutFull:
    "Алия. Веб-дизайнер, который помогает продуктам расти за счёт ясности, ритма и понятного пути пользователя.\n\nСпециализируюсь на создании удобных интерфейсов, e-commerce проектов, мобильных приложений и конверсионных посадочных страниц. Работаю в связке с разработчиками, создаю масштабируемые дизайн-системы и детально продумываю пользовательский путь от первого клика до целевого действия.",
  telegram: "@koooki0",
  telegramUrl: "https://t.me/koooki0",
  telegramLabel: "@koooki0",
  focus: ["UI/UX", "Web Design", "Frontend (HTML/CSS/JS)", "Design Systems"],
  memberSince: "SEP 18, 2026",
  avatar: "/avatar.jpg",
  shareTitle: "Молдоисаева Алия — Product & UI/UX Designer",
  shareText: "Портфолио продуктового и UI/UX дизайнера Молдоисаевой Алии",
  projects: projects
};

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
