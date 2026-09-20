export type Food = {
  id: string;
  name: string;
  category: string;
  price: number;
  weight: string;
  rating: string;
  image: string;
  description: string;
  ingredients: string;
  available: boolean;
};

// Temporary editorial photos until original Figma assets are available.
export const foods: Food[] = [
  {
    id: "biryani",
    name: "Куриный бирьяни",
    category: "Горячее",
    price: 249,
    weight: "350 г",
    rating: "4.9",
    image: "/food-zone/biryani.jpg",
    description:
      "Пряный рис басмати, нежная курица и согревающие специи. Маленькое путешествие в каждом кусочке.",
    ingredients:
      "Рис басмати, курица, томаты, лук, йогурт, специи. Содержит молоко.",
    available: true,
  },
  {
    id: "pizza",
    name: "Пицца Пепперони",
    category: "Пицца",
    price: 329,
    weight: "30 см · 480 г",
    rating: "4.8",
    image: "/food-zone/pizza.jpg",
    description:
      "Тонкое тесто, томатный соус, тягучая моцарелла и пикантная пепперони.",
    ingredients:
      "Пшеничная мука, моцарелла, томаты, пепперони. Содержит глютен и молоко.",
    available: true,
  },
  {
    id: "burger",
    name: "Бургер Экспресс",
    category: "Бургеры",
    price: 289,
    weight: "320 г",
    rating: "4.9",
    image: "/food-zone/burger.jpg",
    description:
      "Сочная говяжья котлета, чеддер и свежие овощи в мягкой булочке бриошь.",
    ingredients:
      "Говядина, булочка, сыр, томат, салат, фирменный соус. Содержит глютен, молоко и яйцо.",
    available: true,
  },
  {
    id: "pasta",
    name: "Паста Помодоро",
    category: "Горячее",
    price: 259,
    weight: "300 г",
    rating: "4.7",
    image: "/food-zone/pasta.jpg",
    description:
      "Итальянская паста с насыщенным томатным соусом, базиликом и пармезаном.",
    ingredients:
      "Паста из твёрдой пшеницы, томаты, базилик, пармезан. Содержит глютен и молоко.",
    available: true,
  },
  {
    id: "cake",
    name: "Ягодный чизкейк",
    category: "Десерты",
    price: 179,
    weight: "150 г",
    rating: "4.9",
    image: "/food-zone/cake.jpg",
    description:
      "Нежный сливочный чизкейк с ягодами на хрустящей песочной основе.",
    ingredients:
      "Сливочный сыр, печенье, ягоды, яйцо. Содержит молоко, глютен и яйцо.",
    available: true,
  },
  {
    id: "salad",
    name: "Зелёный боул",
    category: "Боулы",
    price: 219,
    weight: "280 г",
    rating: "4.8",
    image: "/food-zone/salad.jpg",
    description:
      "Свежие овощи, зелень и лёгкая заправка. Когда хочется чего-то лёгкого.",
    ingredients:
      "Сезонные овощи, салат, оливковое масло, лимон, кунжут. Содержит кунжут.",
    available: true,
  },
  {
    id: "noodles",
    name: "Лапша Якисоба",
    category: "Горячее",
    price: 279,
    weight: "330 г",
    rating: "4.8",
    image: "/food-zone/noodles.jpg",
    description:
      "Лапша с овощами в ароматном соусе, приготовленная на раскалённом воке.",
    ingredients:
      "Лапша, морковь, перец, капуста, соевый соус. Содержит глютен и сою.",
    available: true,
  },
  {
    id: "dessert",
    name: "Шоколадный торт",
    category: "Десерты",
    price: 189,
    weight: "160 г",
    rating: "4.9",
    image: "/food-zone/dessert.jpg",
    description:
      "Тёмный шоколад и воздушный бисквит — для самого приятного завершения обеда.",
    ingredients: "Какао, мука, сливки, яйцо. Содержит глютен, молоко и яйцо.",
    available: false,
  },
];

export const categories = [
  "Всё",
  "Горячее",
  "Пицца",
  "Бургеры",
  "Десерты",
  "Боулы",
];
export const orderSteps = [
  "Заказ принят",
  "Готовим ваш заказ",
  "Курьер в пути",
  "Заказ доставлен",
];
export const money = (value: number) =>
  `${new Intl.NumberFormat("ru-RU").format(value)} сом`;

export type Cart = Record<string, number>;
export type Address = {
  street: string;
  apartment: string;
  entrance: string;
  note: string;
};
export type Payment = "cash" | "card";
export type Order = {
  id: string;
  createdAt: number;
  items: { id: string; name: string; price: number; quantity: number }[];
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
  address: Address;
  payment: Payment;
  step: number;
  cancelled: boolean;
  rating: number;
  review: string;
};
export type Message = { id: string; text: string; from: "user" | "courier" };
export type FoodState = {
  version: 1;
  cart: Cart;
  favorites: string[];
  address: Address;
  payment: Payment;
  promo: string;
  orders: Order[];
  name: string;
  notificationsEnabled: boolean;
  readNotifications: string[];
  messages: Record<string, Message[]>;
};
export const initialFoodState: FoodState = {
  version: 1,
  cart: {},
  favorites: [],
  address: { street: "", apartment: "", entrance: "", note: "" },
  payment: "cash",
  promo: "",
  orders: [],
  name: "Марк",
  notificationsEnabled: true,
  readNotifications: [],
  messages: {},
};

export function cartItems(cart: Cart) {
  return foods
    .filter(
      (food) =>
        food.available && Number.isInteger(cart[food.id]) && cart[food.id] > 0,
    )
    .map((food) => ({ ...food, quantity: Math.min(cart[food.id], 20) }));
}

export function calculateTotals(cart: Cart, promo: string) {
  const items = cartItems(cart);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const delivery = subtotal === 0 || subtotal >= 1000 ? 0 : 49;
  const discount =
    promo.toUpperCase() === "FOOD30" ? Math.round(subtotal * 0.3) : 0;
  return {
    subtotal,
    delivery,
    discount,
    total: subtotal + delivery - discount,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
  };
}

export function changeQuantity(cart: Cart, id: string, delta: number): Cart {
  if (
    !foods.some((food) => food.id === id && food.available) ||
    !Number.isInteger(delta)
  )
    return cart;
  const quantity = Math.max(0, Math.min(20, (cart[id] || 0) + delta));
  const next = { ...cart };
  if (quantity) next[id] = quantity;
  else delete next[id];
  return next;
}

export function restoreFoodState(raw: string | null): FoodState {
  if (!raw) return initialFoodState;
  try {
    const saved = JSON.parse(raw);
    if (saved.version !== 1) return initialFoodState;
    const ids = new Set(foods.map((food) => food.id));
    const strings = (value: unknown): value is string[] =>
      Array.isArray(value) && value.every((item) => typeof item === "string");
    const validAddress = (value: unknown): value is Address =>
      !!value &&
      typeof value === "object" &&
      ["street", "apartment", "entrance", "note"].every(
        (key) => typeof (value as Record<string, unknown>)[key] === "string",
      );
    const validOrder = (order: Order) =>
      order &&
      typeof order.id === "string" &&
      Number.isFinite(order.createdAt) &&
      validAddress(order.address) &&
      ["cash", "card"].includes(order.payment) &&
      [order.subtotal, order.delivery, order.discount, order.total].every(
        (n) => Number.isFinite(n) && n >= 0,
      ) &&
      Number.isInteger(order.step) &&
      order.step >= 0 &&
      order.step <= 3 &&
      typeof order.cancelled === "boolean" &&
      Number.isInteger(order.rating) &&
      order.rating >= 0 &&
      order.rating <= 5 &&
      typeof order.review === "string" &&
      Array.isArray(order.items) &&
      order.items.length > 0 &&
      order.items.every(
        (item) =>
          ids.has(item.id) &&
          typeof item.name === "string" &&
          Number.isFinite(item.price) &&
          item.price >= 0 &&
          Number.isInteger(item.quantity) &&
          item.quantity > 0 &&
          item.quantity <= 20,
      );
    const messages: Record<string, Message[]> = {};
    if (saved.messages && typeof saved.messages === "object") {
      for (const [key, value] of Object.entries(saved.messages)) {
        if (Array.isArray(value))
          messages[key] = value
            .filter(
              (m) =>
                m &&
                typeof m.id === "string" &&
                typeof m.text === "string" &&
                ["user", "courier"].includes(m.from),
            )
            .slice(-100);
      }
    }
    return {
      ...initialFoodState,
      cart:
        saved.cart && typeof saved.cart === "object"
          ? Object.fromEntries(
              cartItems(saved.cart).map((item) => [item.id, item.quantity]),
            )
          : {},
      favorites: strings(saved.favorites)
        ? saved.favorites.filter((id: string) => ids.has(id))
        : [],
      address: validAddress(saved.address)
        ? saved.address
        : initialFoodState.address,
      payment: saved.payment === "card" ? "card" : "cash",
      promo: saved.promo === "FOOD30" ? "FOOD30" : "",
      orders: Array.isArray(saved.orders)
        ? saved.orders.filter(validOrder).slice(0, 30)
        : [],
      name:
        typeof saved.name === "string" && saved.name.trim()
          ? saved.name.slice(0, 40)
          : "Марк",
      notificationsEnabled: saved.notificationsEnabled !== false,
      readNotifications: strings(saved.readNotifications)
        ? saved.readNotifications
        : [],
      messages,
    };
  } catch {
    return initialFoodState;
  }
}
