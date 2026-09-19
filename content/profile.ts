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
    slug: "lumine",
    title: "Website / Бренд янтарных украшений LUMINE",
    shortTitle: "LUMINE / Ювелирный бренд",
    category: "E-Commerce & Branding",
    year: "2024",
    role: "UI/UX & Visual Design",
    cover: "/projects/lumine-cover.jpg",
    gallery: ["/projects/lumine-cover.jpg", "/projects/lumine-detail.jpg"],
    summary:
      "Концепт премиального сайта для бренда украшений из янтаря: утончённая типографика, свободное пространство и крупные кадры изделий.",
    body: "Концепт интернет-магазина для бренда авторских янтарных украшений LUMINE.\n\nГлавный экран строится вокруг крупного названия и атмосферного портрета, погружая пользователя в эстетику бренда. Далее представлена интерактивная сетка изделий с фильтрацией по коллекциям, блок об истории и происхождении балтийского янтаря, а также интуитивный чекаут в 2 шага.\n\nПроект разработан с фокусом на mobile-first опыт, лёгкую навигацию и визуальное наслаждение продуктом.",
    figmaUrl: "https://www.figma.com/design/demo-lumine-jewelry-concept",
    liveUrl: "/demos/lumine/index.html",
    tags: ["Figma", "UI/UX", "Web Design", "E-Commerce", "Design System"],
    deliverables: [
      "Дизайн-система",
      "UI Kit",
      "Прототип мобильной версии",
      "Адаптивный десктоп",
    ],
  },
  {
    slug: "lobby",
    title: "LOBBY — Concept Online Shop",
    shortTitle: "Concept online-shop",
    category: "Fashion & Retail",
    year: "2024",
    role: "Product & Interaction Design",
    cover: "/projects/lobby-cover.jpg",
    gallery: ["/projects/lobby-cover.jpg", "/projects/lobby-detail.jpg"],
    summary:
      "Минималистичный интернет-магазин концептуальной одежды: акцент на визуале товара, монохромной палитре и бесшовном пользовательском пути.",
    body: "Концепт современного онлайн-ритейла в духе концепт-стора LOBBY.\n\nОсновная задача — убрать визуальный шум и направить фокус покупателя на текстуры тканей, крой и стиль. В проекте реализованы карточки товаров с быстрой сменой ракурсов при ховере/тапе, интерактивный lookbook со стилизацией образов и минималистичная корзина со свайп-удалением.\n\nДизайн разработан в строгой тёмной и светлой палитре с глубоким вниманием к микро-взаимодействиям.",
    figmaUrl: "https://www.figma.com/design/demo-lobby-concept-shop",
    liveUrl: "/demos/lobby/index.html",
    tags: ["UI/UX", "Mobile First", "Figma", "E-Commerce", "Minimalism"],
    deliverables: [
      "UX Research",
      "Wireframes",
      "UI Дизайн",
      "Интерактивный кликабельный прототип",
    ],
  },
  {
    slug: "tutor-landing",
    title: "Лендинг для частного репетитора",
    shortTitle: "Лендинг для репетитора",
    category: "EdTech & Landing Page",
    year: "2023",
    role: "UI/UX & Web Design",
    cover: "/projects/tutor-cover.jpg",
    gallery: ["/projects/tutor-cover.jpg", "/projects/tutor-detail.jpg"],
    summary:
      "Конверсионный лендинг с чётким оффером, интерактивным калькулятором программы, социальными доказательствами и формой быстрой записи.",
    body: "Одностраничный промо-сайт для преподавателя и автора авторской методики подготовки.\n\nСтруктура страницы спроектирована для максимального доверия родителей и учеников: чёткий оффер с таймлайном результатов, видеовизитка, блок «как проходят онлайн-занятия», живые кейсы с результатами экзаменов и интерактивная форма записи на диагностический урок.\n\nСайт полностью оптимизирован под мобильные экраны и мессенджер-маркетинг.",
    figmaUrl: "https://www.figma.com/design/demo-tutor-landing-edtech",
    liveUrl: "/demos/tutor-landing/index.html",
    tags: ["Landing Page", "Conversion UX", "Figma", "EdTech"],
    deliverables: [
      "Прототипирование",
      "Копирайтинг & структура",
      "UI Дизайн",
      "Адаптивные экраны",
    ],
  },
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
  focus: ["UI/UX", "Web Design", "Mobile Apps", "Design Systems"],
  memberSince: "SEP 18, 2026",
  avatar: "/avatar.jpg",
  shareTitle: "Молдоисаева Алия — Product & UI/UX Designer",
  shareText: "Портфолио продуктового и UI/UX дизайнера Молдоисаевой Алии",
  projects: projects,
};

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
