"use client";

import Image from "next/image";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Bell,
  Bike,
  Check,
  CheckCircle2,
  ChefHat,
  ChevronDown,
  Clock3,
  CreditCard,
  Heart,
  Home,
  MapPin,
  MessageCircle,
  Navigation,
  ReceiptText,
  Search,
  Send,
  Settings,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  Tag,
  Trash2,
  UserRound,
  UtensilsCrossed,
  Wallet,
  WifiOff,
  X,
} from "lucide-react";
import {
  calculateTotals,
  cartItems,
  categories,
  changeQuantity,
  foods,
  initialFoodState,
  money,
  orderSteps,
  restoreFoodState,
  type Address,
  type FoodState,
  type Order,
} from "@/content/food-zone";
import { DemoMap, Empty, FoodCard, Header, Quantity, Row, Sheet } from "./ui";

const STORAGE_KEY = "food-zone:v1";
const screens = [
  "home",
  "menu",
  "restaurant",
  "dish",
  "cart",
  "checkout",
  "address",
  "orders",
  "order",
  "tracking",
  "chat",
  "review",
  "profile",
  "favorites",
  "notifications",
  "settings",
  "help",
  "ui-kit",
];
type SheetName =
  | "filters"
  | "payment"
  | "clear"
  | "cancel"
  | "reorder"
  | "edit-profile"
  | null;
const locations = ["ул. Фрунзе, 54", "пр. Чуй, 120", "ул. Панфилова, 89"];

export function FoodZoneApp() {
  const [state, setState] = useState<FoodState>(initialFoodState);
  const [ready, setReady] = useState(false);
  const [route, setRoute] = useState("home");
  const [sheet, setSheet] = useState<SheetName>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Всё");
  const [sort, setSort] = useState("popular");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [toast, setToast] = useState("");
  const [offline, setOffline] = useState(false);
  const [storageFailed, setStorageFailed] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const [formError, setFormError] = useState("");
  const [addressDraft, setAddressDraft] = useState<Address>(
    initialFoodState.address,
  );
  const [point, setPoint] = useState(0);
  const [orderBusy, setOrderBusy] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [ratingDraft, setRating] = useState<number | null>(null);
  const [reviewDraft, setReview] = useState<string | null>(null);
  const [nameDraft, setNameDraft] = useState("");
  const [notificationTab, setNotificationTab] = useState("Все");
  const scroller = useRef<HTMLElement>(null);
  const chatEnd = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const orderTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const replyTimers = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const [screen, argument] = route.split("/");
  const closeSheet = useCallback(() => setSheet(null), []);
  const totals = calculateTotals(state.cart, state.promo);
  const items = cartItems(state.cart);
  const order = state.orders.find((item) => item.id === argument);
  const rating = ratingDraft ?? order?.rating ?? 0;
  const review = reviewDraft ?? order?.review ?? "";
  const food = foods.find((item) => item.id === argument);
  const navScreen = ["menu", "restaurant", "dish"].includes(screen)
    ? "menu"
    : ["orders", "order", "tracking", "chat", "review"].includes(screen)
      ? "orders"
      : ["profile", "favorites", "settings", "help"].includes(screen)
        ? "profile"
        : "home";

  useEffect(() => {
    const readRoute = () => {
      setRoute(window.location.hash.slice(1) || "home");
      setSheet(null);
      setFormError("");
      setRating(null);
      setReview(null);
    };
    const timer = setTimeout(() => {
      try {
        const restored = restoreFoodState(localStorage.getItem(STORAGE_KEY));
        setState(restored);
        setAddressDraft(restored.address);
        setPoint(Math.max(0, locations.indexOf(restored.address.street)));
      } catch {
        setStorageFailed(true);
      }
      setOffline(!navigator.onLine);
      readRoute();
      setReady(true);
    }, 650);
    const online = () => setOffline(false),
      offlineEvent = () => setOffline(true);
    window.addEventListener("hashchange", readRoute);
    window.addEventListener("popstate", readRoute);
    window.addEventListener("online", online);
    window.addEventListener("offline", offlineEvent);
    const timers = replyTimers.current;
    return () => {
      clearTimeout(timer);
      if (orderTimer.current) clearTimeout(orderTimer.current);
      timers.forEach(clearTimeout);
      window.removeEventListener("hashchange", readRoute);
      window.removeEventListener("popstate", readRoute);
      window.removeEventListener("online", online);
      window.removeEventListener("offline", offlineEvent);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      const timer = setTimeout(() => setStorageFailed(true), 0);
      return () => clearTimeout(timer);
    }
  }, [state, ready]);
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
    scroller.current
      ?.querySelector<HTMLElement>("h1")
      ?.focus({ preventScroll: true });
  }, [route, ready]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    if (screen === "chat")
      chatEnd.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [screen, state.messages]);

  function go(next: string) {
    if (next === route) {
      scroller.current?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.history.pushState(null, "", `#${next}`);
    setRoute(next);
    setSheet(null);
    setFormError("");
    setRating(null);
    setReview(null);
  }
  function quantity(id: string, delta: number) {
    setState((current) => ({
      ...current,
      cart: changeQuantity(current.cart, id, delta),
    }));
  }
  function add(id: string) {
    if ((state.cart[id] || 0) >= 20) {
      setToast("Можно добавить не больше 20 порций одного блюда");
      return;
    }
    quantity(id, 1);
    setToast("Добавлено в корзину");
  }
  function favorite(id: string) {
    setState((current) => ({
      ...current,
      favorites: current.favorites.includes(id)
        ? current.favorites.filter((item) => item !== id)
        : [...current.favorites, id],
    }));
  }
  function editAddress(returnTo = "checkout") {
    setAddressDraft(state.address);
    setPoint(Math.max(0, locations.indexOf(state.address.street)));
    setFormError("");
    go(`address/${returnTo}`);
  }
  function saveAddress(event: React.FormEvent) {
    event.preventDefault();
    if (addressDraft.street.trim().length < 5) {
      setFormError("Укажите улицу и номер дома.");
      return;
    }
    setState((current) => ({
      ...current,
      address: { ...addressDraft, street: addressDraft.street.trim() },
    }));
    go(
      argument === "checkout"
        ? "checkout"
        : argument === "profile"
          ? "profile"
          : "home",
    );
    setToast("Адрес сохранён");
  }
  function applyPromo(event: React.FormEvent) {
    event.preventDefault();
    if (promoInput.trim().toUpperCase() !== "FOOD30") {
      setPromoError("Промокод не найден. Попробуйте FOOD30.");
      return;
    }
    setState((current) => ({ ...current, promo: "FOOD30" }));
    setPromoError("");
    setToast("Скидка 30% применена");
  }
  function placeOrder(timestamp: number) {
    if (busy.current || !items.length) return;
    if (!state.address.street.trim()) {
      setFormError("Добавьте адрес доставки.");
      return;
    }
    busy.current = true;
    setOrderBusy(true);
    setFormError("");
    const created: Order = {
      id: `FZ-${timestamp.toString(36).toUpperCase()}`,
      createdAt: timestamp,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      subtotal: totals.subtotal,
      delivery: totals.delivery,
      discount: totals.discount,
      total: totals.total,
      address: { ...state.address },
      payment: state.payment,
      step: 0,
      cancelled: false,
      rating: 0,
      review: "",
    };
    orderTimer.current = setTimeout(() => {
      setState((current) => ({
        ...current,
        orders: [created, ...current.orders].slice(0, 30),
        cart: {},
        promo: "",
      }));
      busy.current = false;
      setOrderBusy(false);
      setPromoInput("");
      go(`order/${created.id}`);
    }, 700);
  }
  function updateOrder(patch: Partial<Order>) {
    if (order)
      setState((current) => ({
        ...current,
        orders: current.orders.map((item) =>
          item.id === order.id ? { ...item, ...patch } : item,
        ),
      }));
  }
  function repeatOrder(item: Order, confirmed = false) {
    if (items.length && !confirmed) {
      setSheet("reorder");
      return;
    }
    setState((current) => ({
      ...current,
      cart: Object.fromEntries(
        item.items
          .filter((line) => foods.some((f) => f.id === line.id && f.available))
          .map((line) => [line.id, line.quantity]),
      ),
      promo: "",
    }));
    go("cart");
    setToast("Заказ добавлен в корзину по текущим ценам");
  }
  function sendMessage(event: React.FormEvent) {
    event.preventDefault();
    if (!order || !chatInput.trim() || order.cancelled || order.step !== 2)
      return;
    const id = order.id;
    const message = {
      id: crypto.randomUUID(),
      text: chatInput.trim(),
      from: "user" as const,
    };
    setState((current) => ({
      ...current,
      messages: {
        ...current.messages,
        [id]: [...(current.messages[id] || []), message],
      },
    }));
    setChatInput("");
    const timer = setTimeout(() => {
      setState((current) => {
        const currentOrder = current.orders.find((item) => item.id === id);
        if (!currentOrder || currentOrder.cancelled || currentOrder.step !== 2)
          return current;
        return {
          ...current,
          messages: {
            ...current.messages,
            [id]: [
              ...(current.messages[id] || []),
              {
                id: crypto.randomUUID(),
                text: "Я уже рядом! Буду у вас примерно через 10 минут. Спасибо за ожидание 😊",
                from: "courier",
              },
            ],
          },
        };
      });
      replyTimers.current.delete(timer);
    }, 1100);
    replyTimers.current.add(timer);
  }

  function productGrid(list = foods) {
    const filtered = list
      .filter(
        (item) =>
          (category === "Всё" || item.category === category) &&
          `${item.name} ${item.category}`
            .toLowerCase()
            .includes(query.toLowerCase().trim()) &&
          (!availableOnly || item.available),
      )
      .sort((a, b) =>
        sort === "price-up"
          ? a.price - b.price
          : sort === "price-down"
            ? b.price - a.price
            : Number(b.rating) - Number(a.rating),
      );
    return filtered.length ? (
      <div className="fz-food-grid">
        {filtered.map((item) => (
          <FoodCard
            key={item.id}
            food={item}
            favorite={state.favorites.includes(item.id)}
            quantity={state.cart[item.id] || 0}
            open={() => go(`dish/${item.id}`)}
            toggleFavorite={() => favorite(item.id)}
            add={() => add(item.id)}
          />
        ))}
      </div>
    ) : (
      <Empty
        title="Ничего не нашлось"
        text="Попробуйте другое название или уберите фильтры."
        action={
          <button
            className="fz-btn fz-btn-light"
            onClick={() => {
              setQuery("");
              setCategory("Всё");
              setAvailableOnly(false);
            }}
          >
            Сбросить поиск
          </button>
        }
      />
    );
  }
  function searchBar() {
    return (
      <div className="fz-search-row">
        <label className="fz-search">
          <Search size={18} />
          <input
            aria-label="Поиск блюд"
            placeholder="Что хочется сегодня?"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query && (
            <button aria-label="Очистить поиск" onClick={() => setQuery("")}>
              <X size={16} />
            </button>
          )}
        </label>
        <button
          className={`fz-icon fz-filter${sort !== "popular" || availableOnly ? " is-active" : ""}`}
          aria-label="Фильтры и сортировка"
          onClick={() => setSheet("filters")}
        >
          <SlidersHorizontal size={18} />
        </button>
      </div>
    );
  }
  function categoryTabs() {
    return (
      <div className="fz-chips" aria-label="Категории блюд">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "selected" : ""}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
    );
  }
  function summary(
    value: Pick<Order, "subtotal" | "delivery" | "discount" | "total"> = totals,
  ) {
    return (
      <div className="fz-summary">
        <div>
          <span>Блюда</span>
          <span>{money(value.subtotal)}</span>
        </div>
        <div>
          <span>Доставка</span>
          <span>{value.delivery ? money(value.delivery) : "Бесплатно"}</span>
        </div>
        {value.discount > 0 && (
          <div className="fz-success">
            <span>Скидка FOOD30</span>
            <span>−{money(value.discount)}</span>
          </div>
        )}
        <div className="fz-summary-total">
          <strong>Итого</strong>
          <strong>{money(value.total)}</strong>
        </div>
      </div>
    );
  }
  function orderLines(item: Order) {
    return (
      <div className="fz-order-lines">
        {item.items.map((line) => (
          <div key={line.id}>
            <span>
              {line.quantity} × {line.name}
            </span>
            <strong>{money(line.price * line.quantity)}</strong>
          </div>
        ))}
      </div>
    );
  }

  function renderScreen() {
    if (screen === "home" || screen === "menu" || screen === "restaurant")
      return (
        <>
          {screen === "home" ? (
            <header className="fz-home-header">
              <button
                className="fz-delivery-address"
                onClick={() => editAddress("home")}
              >
                <span className="fz-address-icon">
                  <MapPin size={19} />
                </span>
                <span>
                  <small>Доставим по адресу</small>
                  <strong>
                    {state.address.street || "Выберите адрес"}
                    <ChevronDown size={14} />
                  </strong>
                </span>
              </button>
              <button
                className="fz-icon fz-notification-button"
                aria-label="Уведомления"
                onClick={() => go("notifications")}
              >
                <Bell size={21} />
                {!state.readNotifications.includes("welcome") && <i />}
              </button>
            </header>
          ) : (
            <Header
              title={screen === "restaurant" ? "Food Zone Kitchen" : "Меню"}
              back={screen === "restaurant" ? () => go("home") : undefined}
              action={
                <button
                  className="fz-icon"
                  aria-label="Корзина"
                  onClick={() => go("cart")}
                >
                  <ShoppingBag size={20} />
                </button>
              }
            />
          )}
          <div className="fz-content">
            {screen === "home" && (
              <div className="fz-greeting">
                <p>Хороший день начинается вкусно</p>
                <h1 tabIndex={-1}>
                  Что будем <span>есть?</span>
                </h1>
              </div>
            )}
            {screen === "restaurant" && (
              <div className="fz-restaurant-hero">
                <Image
                  src="/food-zone/noodles.jpg"
                  alt="Лапша с овощами"
                  width="400"
                  height="200"
                />
                <div>
                  <span className="fz-tag">Авторская кухня</span>
                  <h2>Food Zone Kitchen</h2>
                  <p>
                    <Star size={14} fill="currentColor" /> 4.9 · 128 отзывов{" "}
                    <span>· 25–35 мин</span>
                  </p>
                </div>
              </div>
            )}
            {searchBar()}
            {screen === "home" && !query && (
              <div className="fz-category-tiles">
                {[
                  { name: "Горячее", image: "biryani" },
                  { name: "Пицца", image: "pizza" },
                  { name: "Бургеры", image: "burger" },
                  { name: "Десерты", image: "cake" },
                ].map((item) => (
                  <button
                    key={item.name}
                    className={category === item.name ? "selected" : ""}
                    aria-pressed={category === item.name}
                    onClick={() =>
                      setCategory(category === item.name ? "Всё" : item.name)
                    }
                  >
                    <span>
                      <Image
                        src={`/food-zone/${item.image}.jpg`}
                        alt=""
                        width="54"
                        height="48"
                      />
                    </span>
                    {item.name}
                  </button>
                ))}
              </div>
            )}
            {screen !== "home" && categoryTabs()}
            {!query && screen !== "restaurant" && (
              <button
                className="fz-promo-banner"
                onClick={() => {
                  setState((current) => ({ ...current, promo: "FOOD30" }));
                  setToast("FOOD30 применён: скидка 30% на блюда");
                }}
              >
                <span className="fz-promo-text">
                  <small>ВАШ МАЛЕНЬКИЙ ПРАЗДНИК</small>
                  <strong>
                    Вкуснее со
                    <br />
                    скидкой 30%
                  </strong>
                  <span>
                    С промокодом <b>FOOD30</b>
                    <ArrowRight size={14} />
                  </span>
                </span>
                <Image
                  src="/food-zone/biryani.jpg"
                  alt="Куриный бирьяни"
                  width="164"
                  height="164"
                />
                <span className="fz-promo-spark">✳</span>
              </button>
            )}
            <div className="fz-section-title">
              <h2>
                {query
                  ? "Результаты поиска"
                  : category !== "Всё"
                    ? category
                    : screen === "home"
                      ? "Попробуйте сегодня"
                      : "Наши популярные блюда"}
              </h2>
              {screen === "home" && (
                <button
                  onClick={() => {
                    setCategory("Всё");
                    go("menu");
                  }}
                >
                  Всё меню <ArrowRight size={13} />
                </button>
              )}
            </div>
            {productGrid()}
            {screen === "home" && !query && (
              <button
                className="fz-restaurant-link"
                onClick={() => go("restaurant")}
              >
                <span className="fz-row-icon">
                  <ChefHat size={25} />
                </span>
                <span>
                  <strong>Знакомьтесь: наша кухня</strong>
                  <small>Готовим с заботой, доставляем с любовью</small>
                </span>
                <ArrowRight size={20} />
              </button>
            )}
            <p className="fz-footnote">
              Приготовлено с любовью. Доставлено с заботой.
            </p>
          </div>
        </>
      );

    if (screen === "dish")
      return food ? (
        <>
          <Header
            title="О блюде"
            back={() => go("menu")}
            action={
              <button
                className="fz-icon"
                aria-label="Избранное"
                aria-pressed={state.favorites.includes(food.id)}
                onClick={() => favorite(food.id)}
              >
                <Heart
                  size={20}
                  fill={
                    state.favorites.includes(food.id) ? "currentColor" : "none"
                  }
                />
              </button>
            }
          />
          <div className="fz-dish-photo">
            <Image src={food.image} alt={food.name} width="420" height="310" />
          </div>
          <div className="fz-content">
            <span className="fz-tag">{food.category}</span>
            <h2 className="fz-large-heading">{food.name}</h2>
            <p className="fz-meta">
              <Star size={14} fill="currentColor" /> {food.rating}{" "}
              <span>·</span>
              {food.weight}
              <span>·</span>25–35 мин
            </p>
            <p className="fz-description">{food.description}</p>
            <h3>Состав и аллергены</h3>
            <p className="fz-description fz-muted">{food.ingredients}</p>
            <div className="fz-note">
              <ChefHat size={21} />
              <span>
                Приготовим после заказа.
                <br />
                <small>Свежо, горячо и специально для вас.</small>
              </span>
            </div>
            <div className="fz-dish-action">
              <strong>{money(food.price)}</strong>
              {state.cart[food.id] ? (
                <Quantity
                  name={food.name}
                  quantity={state.cart[food.id]}
                  onChange={(delta) => quantity(food.id, delta)}
                />
              ) : null}
            </div>
            <button
              className="fz-btn"
              disabled={!food.available}
              onClick={() => add(food.id)}
            >
              {food.available
                ? "Добавить в корзину"
                : "Закончилось — будет завтра"}
              <ShoppingBag size={18} />
            </button>
            {totals.count > 0 && (
              <button className="fz-text-button" onClick={() => go("cart")}>
                Перейти в корзину · {money(totals.total)}
              </button>
            )}
          </div>
        </>
      ) : (
        missing()
      );

    if (screen === "cart")
      return (
        <>
          <Header
            title="Моя корзина"
            back={() => go("home")}
            action={
              items.length ? (
                <button
                  className="fz-icon"
                  aria-label="Очистить корзину"
                  onClick={() => setSheet("clear")}
                >
                  <Trash2 size={19} />
                </button>
              ) : undefined
            }
          />
          {items.length ? (
            <div className="fz-content">
              <p className="fz-eyebrow">FOOD ZONE KITCHEN · 25–35 МИН</p>
              <div className="fz-panel fz-cart-items">
                {items.map((item) => (
                  <div key={item.id} className="fz-cart-item">
                    <button
                      className="fz-cart-image"
                      onClick={() => go(`dish/${item.id}`)}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width="84"
                        height="84"
                      />
                    </button>
                    <div>
                      <strong>{item.name}</strong>
                      <small>{item.weight}</small>
                      <div className="fz-cart-item-bottom">
                        <b>{money(item.price * item.quantity)}</b>
                        <Quantity
                          name={item.name}
                          quantity={item.quantity}
                          onChange={(delta) => quantity(item.id, delta)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="fz-note">
                <Bike size={23} />
                <span>
                  {totals.subtotal >= 1000
                    ? "Доставка за наш счёт!"
                    : `До бесплатной доставки — ${money(1000 - totals.subtotal)}`}
                  <small>Бесплатно при заказе от 1 000 сом</small>
                </span>
              </div>
              <form className="fz-promo-form" onSubmit={applyPromo}>
                <label className="fz-input-with-icon">
                  <Tag size={18} />
                  <input
                    aria-label="Промокод"
                    placeholder="Промокод"
                    value={promoInput}
                    onChange={(event) => {
                      setPromoInput(event.target.value);
                      setPromoError("");
                    }}
                  />
                </label>
                <button className="fz-small-button">Применить</button>
              </form>
              {promoError && (
                <p className="fz-error" role="alert">
                  {promoError}
                </p>
              )}
              {state.promo && (
                <div className="fz-promo-applied">
                  <Check size={16} /> FOOD30 — скидка 30%
                  <button
                    aria-label="Убрать промокод"
                    onClick={() =>
                      setState((current) => ({ ...current, promo: "" }))
                    }
                  >
                    <X size={17} />
                  </button>
                </div>
              )}
              {summary()}
              <button className="fz-btn" onClick={() => go("checkout")}>
                К оформлению <ArrowRight size={19} />
              </button>
              <div className="fz-section-title">
                <h2>И что-нибудь к чаю</h2>
              </div>
              <div className="fz-food-grid">
                {foods
                  .filter((item) => ["cake", "salad"].includes(item.id))
                  .map((item) => (
                    <FoodCard
                      key={item.id}
                      food={item}
                      favorite={state.favorites.includes(item.id)}
                      quantity={state.cart[item.id] || 0}
                      open={() => go(`dish/${item.id}`)}
                      toggleFavorite={() => favorite(item.id)}
                      add={() => add(item.id)}
                    />
                  ))}
              </div>
            </div>
          ) : (
            <Empty
              icon={<ShoppingBag size={34} />}
              title="Здесь пока пусто"
              text="Самое время найти что-нибудь вкусное. Мы уже приготовили меню."
              action={
                <button className="fz-btn" onClick={() => go("menu")}>
                  Выбрать блюда <ArrowRight size={18} />
                </button>
              }
            />
          )}
        </>
      );

    if (screen === "checkout")
      return (
        <>
          <Header title="Оформление заказа" back={() => go("cart")} />
          <div className="fz-content">
            {!items.length ? (
              <Empty
                title="Корзина пуста"
                text="Добавьте блюда, чтобы оформить заказ."
                action={
                  <button className="fz-btn" onClick={() => go("menu")}>
                    Открыть меню
                  </button>
                }
              />
            ) : (
              <>
                <div className="fz-checkout-map">
                  <DemoMap />
                  <button onClick={() => editAddress()} className="fz-map-edit">
                    Указать адрес <MapPin size={14} />
                  </button>
                </div>
                <div className="fz-panel">
                  <Row
                    icon={<MapPin size={20} />}
                    title={state.address.street || "Добавить адрес доставки"}
                    subtitle={
                      state.address.apartment
                        ? `Квартира ${state.address.apartment}`
                        : "Бишкек"
                    }
                    onClick={() => editAddress()}
                  />
                  <Row
                    icon={<Wallet size={20} />}
                    title={
                      state.payment === "cash"
                        ? "Наличными при получении"
                        : "Картой при получении"
                    }
                    subtitle="Выберите удобный способ"
                    onClick={() => setSheet("payment")}
                  />
                  <Row
                    icon={<Clock3 size={20} />}
                    title="Через 25–35 минут"
                    subtitle="Приготовим и сразу отправим"
                    end={<Check size={17} />}
                  />
                </div>
                <label className="fz-label">
                  Комментарий к доставке
                  <textarea
                    maxLength={250}
                    placeholder="Например: не звонить в дверь"
                    value={state.address.note}
                    onChange={(event) =>
                      setState((current) => ({
                        ...current,
                        address: {
                          ...current.address,
                          note: event.target.value,
                        },
                      }))
                    }
                  />
                </label>
                {summary()}
                {formError && (
                  <p className="fz-error" role="alert">
                    {formError}
                  </p>
                )}
                <div className="fz-demo-note">
                  <ShieldCheck size={19} />
                  <span>
                    Демонстрационный заказ. Деньги не списываются, настоящая
                    доставка не оформляется.
                  </span>
                </div>
                <button
                  className="fz-btn"
                  disabled={orderBusy}
                  onClick={() => placeOrder(Date.now())}
                >
                  {orderBusy ? (
                    <>
                      <span className="fz-spinner" /> Оформляем…
                    </>
                  ) : (
                    <>
                      Заказать · {money(totals.total)} <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </>
      );

    if (screen === "address")
      return (
        <>
          <Header
            title="Адрес доставки"
            back={() =>
              go(
                argument === "checkout"
                  ? "checkout"
                  : argument === "profile"
                    ? "profile"
                    : "home",
              )
            }
          />
          <DemoMap
            point={point}
            onSelect={(i) => {
              setPoint(i);
              setAddressDraft((current) => ({
                ...current,
                street: locations[i],
              }));
            }}
          />
          <form className="fz-content" onSubmit={saveAddress}>
            <div className="fz-section-title">
              <h2>Куда привезти вкусное?</h2>
            </div>
            <p className="fz-muted fz-body-small">
              Выберите точку на схеме или введите адрес в Бишкеке.
            </p>
            <label className="fz-label">
              Улица и дом
              <input
                required
                minLength={5}
                maxLength={100}
                autoComplete="street-address"
                placeholder="ул. Фрунзе, 54"
                value={addressDraft.street}
                onChange={(event) =>
                  setAddressDraft((current) => ({
                    ...current,
                    street: event.target.value,
                  }))
                }
              />
            </label>
            <div className="fz-form-grid">
              <label className="fz-label">
                Квартира
                <input
                  maxLength={10}
                  inputMode="numeric"
                  placeholder="Например, 12"
                  value={addressDraft.apartment}
                  onChange={(event) =>
                    setAddressDraft((current) => ({
                      ...current,
                      apartment: event.target.value,
                    }))
                  }
                />
              </label>
              <label className="fz-label">
                Подъезд
                <input
                  maxLength={10}
                  placeholder="Например, 2"
                  value={addressDraft.entrance}
                  onChange={(event) =>
                    setAddressDraft((current) => ({
                      ...current,
                      entrance: event.target.value,
                    }))
                  }
                />
              </label>
            </div>
            <button
              type="button"
              className="fz-text-button"
              onClick={() =>
                setToast(
                  "В демоверсии выберите точку на карте или введите адрес вручную.",
                )
              }
            >
              <Navigation size={16} /> Моё местоположение
            </button>
            {formError && (
              <p role="alert" className="fz-error">
                {formError}
              </p>
            )}
            <button className="fz-btn" type="submit">
              Доставить сюда <Check size={18} />
            </button>
          </form>
        </>
      );

    if (screen === "orders")
      return (
        <>
          <Header title="Мои заказы" />
          <div className="fz-content">
            {state.orders.length ? (
              state.orders.map((item) => (
                <button
                  className="fz-order-card"
                  key={item.id}
                  onClick={() => go(`order/${item.id}`)}
                >
                  <span className="fz-order-card-top">
                    <span
                      className={`fz-status${item.cancelled ? " cancelled" : ""}`}
                    >
                      {item.cancelled ? "Отменён" : orderSteps[item.step]}
                    </span>
                    <small>
                      {new Date(item.createdAt).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "short",
                      })}
                    </small>
                  </span>
                  <strong>
                    {item.items.map((line) => line.name).join(", ")}
                  </strong>
                  <span className="fz-order-card-bottom">
                    <span>
                      {money(item.total)} <small>· {item.id}</small>
                    </span>
                    <ArrowRight size={18} />
                  </span>
                </button>
              ))
            ) : (
              <Empty
                icon={<ReceiptText size={34} />}
                title="Здесь будут ваши заказы"
                text="Выберите любимые блюда — а мы позаботимся обо всём остальном."
                action={
                  <button className="fz-btn" onClick={() => go("menu")}>
                    Перейти в меню
                  </button>
                }
              />
            )}
          </div>
        </>
      );

    if (["order", "tracking"].includes(screen))
      return order ? (
        <>
          <Header
            title={screen === "tracking" && order.step === 2 && !order.cancelled ? "Курьер в пути" : "Ваш заказ"}
            back={() =>
              go(screen === "tracking" ? `order/${order.id}` : "orders")
            }
          />
          {screen === "tracking" && order.step === 2 && !order.cancelled && <DemoMap tracking step={order.step} />}
          <div className="fz-content">
            <div
              className={`fz-order-hero${order.cancelled ? " cancelled" : ""}`}
            >
              <div className="fz-order-symbol">
                {order.cancelled ? (
                  <X size={34} />
                ) : order.step === 3 ? (
                  <CheckCircle2 size={38} />
                ) : order.step === 2 ? (
                  <Bike size={38} />
                ) : (
                  <ChefHat size={38} />
                )}
              </div>
              <span className="fz-eyebrow">{order.id}</span>
              <h2>
                {order.cancelled ? "Заказ отменён" : orderSteps[order.step]}
              </h2>
              <p>
                {order.cancelled
                  ? "Ничего страшного. Будем рады приготовить для вас в другой раз."
                  : [
                      "Уже передали ваш заказ на кухню",
                      "Пока повара творят, можно немного помечтать об обеде",
                      "Всё самое вкусное уже едет к вам",
                      "Приятного аппетита! Надеемся, вам было вкусно.",
                    ][order.step]}
              </p>
              {!order.cancelled && order.step < 3 && (
                <strong className="fz-eta">
                  {order.step === 2 ? "10–15" : "25–35"}
                  <small>минут до встречи</small>
                </strong>
              )}
            </div>
            {!order.cancelled && (
              <ol className="fz-progress" aria-label="Этапы заказа">
                {orderSteps.map((step, index) => (
                  <li
                    key={step}
                    className={index <= order.step ? "done" : ""}
                    aria-current={index === order.step ? "step" : undefined}
                  >
                    <span>
                      {index <= order.step ? <Check size={13} /> : index + 1}
                    </span>
                    <small>{step}</small>
                  </li>
                ))}
              </ol>
            )}
            {!order.cancelled && order.step === 2 && (
              <div className="fz-panel">
                <Row
                  icon={<span className="fz-avatar-small">П</span>}
                  title="Пётр · ваш курьер"
                  subtitle="Рейтинг 4.9 · уже рядом"
                  onClick={() => go(`chat/${order.id}`)}
                  end={<MessageCircle size={21} />}
                />
                {screen !== "tracking" && (
                  <Row
                    icon={<MapPin size={20} />}
                    title="Отследить на карте"
                    onClick={() => go(`tracking/${order.id}`)}
                  />
                )}
              </div>
            )}
            <div className="fz-panel">
              <Row
                icon={<MapPin size={19} />}
                title={order.address.street}
                subtitle={
                  [
                    order.address.apartment && `Кв. ${order.address.apartment}`,
                    order.address.entrance &&
                      `Подъезд ${order.address.entrance}`,
                  ]
                    .filter(Boolean)
                    .join(" · ") || "Бишкек"
                }
                end={<Check size={17} />}
              />
              {order.address.note && (
                <p className="fz-order-comment">{order.address.note}</p>
              )}
            </div>
            <div className="fz-section-title">
              <h2>Состав заказа</h2>
            </div>
            {orderLines(order)}
            {summary(order)}
            <p className="fz-muted fz-body-small">
              {order.payment === "cash" ? "Наличными" : "Картой"} при получении
              · демонстрационный заказ
            </p>
            {!order.cancelled && order.step < 3 && (
              <div className="fz-demo-controls">
                <span>Попробуйте весь сценарий доставки</span>
                <button
                  className="fz-btn fz-btn-light"
                  onClick={() =>
                    updateOrder({ step: Math.min(order.step + 1, 3) })
                  }
                >
                  {
                    [
                      "Заказ готовится",
                      "Отправить курьера",
                      "Завершить доставку",
                    ][order.step]
                  }
                  <ArrowRight size={17} />
                </button>
              </div>
            )}
            {!order.cancelled && order.step === 3 && (
              <button
                className="fz-btn"
                onClick={() => {
                  setRating(order.rating);
                  setReview(order.review);
                  go(`review/${order.id}`);
                }}
              >
                {order.rating
                  ? `Ваша оценка: ${order.rating} из 5`
                  : "Оценить заказ"}
                <Star size={18} />
              </button>
            )}
            {(order.cancelled || order.step === 3) && (
              <button
                className="fz-btn fz-btn-light"
                onClick={() => repeatOrder(order)}
              >
                Повторить заказ
              </button>
            )}
            {!order.cancelled && order.step < 2 && (
              <button
                className="fz-text-button fz-muted"
                onClick={() => setSheet("cancel")}
              >
                Отменить заказ
              </button>
            )}
          </div>
        </>
      ) : (
        missing()
      );

    if (screen === "chat")
      return order ? (
        <>
          <Header
            title="Пётр · ваш курьер"
            back={() => go(`order/${order.id}`)}
          />
          <div className="fz-chat-info">
            <span className="fz-online-dot" />
            {order.step === 2 && !order.cancelled
              ? "В пути · обычно отвечает быстро"
              : "Доставка не активна"}
          </div>
          <div className="fz-chat-messages">
            <span className="fz-chat-date">Чат по заказу {order.id}</span>
            <div className="fz-message courier">
              Здравствуйте! Я ваш курьер Пётр. Здесь можно уточнить детали
              доставки.<small>Food Zone · демо</small>
            </div>
            {(state.messages[order.id] || []).map((message) => (
              <div key={message.id} className={`fz-message ${message.from}`}>
                {message.text}
                <small>
                  {message.from === "user"
                    ? "Вы · доставлено"
                    : "Пётр · демо-ответ"}
                </small>
              </div>
            ))}
            <div ref={chatEnd} />
          </div>
          {order.step === 2 && !order.cancelled ? (
            <form className="fz-chat-form" onSubmit={sendMessage}>
              <input
                aria-label="Сообщение курьеру"
                placeholder="Написать сообщение…"
                maxLength={500}
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
              />
              <button
                className="fz-send"
                disabled={!chatInput.trim()}
                aria-label="Отправить сообщение"
              >
                <Send size={20} />
              </button>
            </form>
          ) : (
            <p className="fz-footnote">Чат доступен, когда курьер в пути.</p>
          )}
        </>
      ) : (
        missing()
      );

    if (screen === "review")
      return order && order.step === 3 && !order.cancelled ? (
        <>
          <Header
            title="Как всё прошло?"
            back={() => go(`order/${order.id}`)}
          />
          <form
            className="fz-content"
            onSubmit={(event) => {
              event.preventDefault();
              if (!rating) {
                setFormError("Выберите оценку от 1 до 5.");
                return;
              }
              updateOrder({ rating, review: review.trim() });
              setToast("Спасибо! Ваш отзыв сохранён.");
              go(`order/${order.id}`);
            }}
          >
            <div className="fz-review-hero">
              <div className="fz-empty-icon">
                <Heart size={36} />
              </div>
              <h2>Вкусно было?</h2>
              <p>Ваши впечатления помогают нам становиться лучше.</p>
            </div>
            <fieldset className="fz-rating">
              <legend className="fz-sr-only">Оценка заказа</legend>
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  type="button"
                  key={value}
                  aria-label={`${value} из 5`}
                  aria-pressed={rating === value}
                  onClick={() => {
                    setRating(value);
                    setFormError("");
                  }}
                >
                  <Star
                    size={37}
                    fill={value <= rating ? "currentColor" : "none"}
                  />
                </button>
              ))}
            </fieldset>
            <p className="fz-rating-label">
              {
                [
                  "Нажмите на звёздочку",
                  "Совсем не понравилось",
                  "Могло быть лучше",
                  "Неплохо",
                  "Очень вкусно",
                  "Всё было прекрасно!",
                ][rating]
              }
            </p>
            <label className="fz-label">
              Расскажите подробнее
              <textarea
                value={review}
                onChange={(event) => setReview(event.target.value)}
                placeholder="Что понравилось? Что можно улучшить?"
                maxLength={500}
                rows={4}
              />
            </label>
            {formError && (
              <p className="fz-error" role="alert">
                {formError}
              </p>
            )}
            <button className="fz-btn">
              Отправить отзыв <Heart size={18} />
            </button>
            <button
              type="button"
              className="fz-text-button"
              onClick={() => go(`order/${order.id}`)}
            >
              Оценить позже
            </button>
          </form>
        </>
      ) : (
        missing()
      );

    if (screen === "profile")
      return (
        <>
          <Header
            title="Профиль"
            action={
              <button
                className="fz-icon"
                aria-label="Настройки"
                onClick={() => go("settings")}
              >
                <Settings size={21} />
              </button>
            }
          />
          <div className="fz-content">
            <div className="fz-profile-card">
              <div className="fz-profile-top">
                <span className="fz-avatar">
                  {state.name.slice(0, 1).toUpperCase()}
                </span>
                <div>
                  <h2>{state.name}</h2>
                  <p>Любитель вкусной еды</p>
                </div>
                <button
                  onClick={() => {
                    setNameDraft(state.name);
                    setSheet("edit-profile");
                  }}
                >
                  Изменить
                </button>
              </div>
              <div className="fz-profile-stats">
                <button onClick={() => go("orders")}>
                  <strong>{state.orders.length}</strong>
                  <span>Заказов</span>
                </button>
                <button
                  onClick={() => {
                    setQuery("");
                    setCategory("Всё");
                    go("favorites");
                  }}
                >
                  <strong>{state.favorites.length}</strong>
                  <span>В избранном</span>
                </button>
                <div>
                  <strong>
                    {state.orders.filter((item) => item.rating > 0).length}
                  </strong>
                  <span>Отзывов</span>
                </div>
              </div>
            </div>
            <div className="fz-panel">
              <Row
                icon={<ReceiptText size={21} />}
                title="Мои заказы"
                subtitle="История и текущие заказы"
                onClick={() => go("orders")}
              />
              <Row
                icon={<Heart size={21} />}
                title="Избранное"
                subtitle="Всё, что хочется попробовать"
                onClick={() => {
                  setQuery("");
                  setCategory("Всё");
                  go("favorites");
                }}
              />
              <Row
                icon={<MapPin size={21} />}
                title="Адрес доставки"
                subtitle={state.address.street || "Добавьте ваш адрес"}
                onClick={() => editAddress("profile")}
              />
              <Row
                icon={<Wallet size={21} />}
                title="Способ оплаты"
                subtitle={
                  state.payment === "cash"
                    ? "Наличными при получении"
                    : "Картой при получении"
                }
                onClick={() => setSheet("payment")}
              />
            </div>
            <div className="fz-panel">
              <Row
                icon={<MessageCircle size={21} />}
                title="Помощь и поддержка"
                subtitle="Ответы на частые вопросы"
                onClick={() => go("help")}
              />
              <Row
                icon={<Bell size={21} />}
                title="Уведомления"
                onClick={() => go("notifications")}
              />
            </div>
            <p className="fz-footnote">
              Food Zone · с заботой о вашем аппетите
              <br />
              Интерактивный концепт, версия 1.0
            </p>
          </div>
        </>
      );

    if (screen === "favorites")
      return (
        <>
          <Header title="Избранное" back={() => go("profile")} />
          <div className="fz-content">
            {state.favorites.length ? (
              <>
                {searchBar()}
                {productGrid(
                  foods.filter((item) => state.favorites.includes(item.id)),
                )}
              </>
            ) : (
              <Empty
                icon={<Heart size={34} />}
                title="Сохраните что-то вкусное"
                text="Нажимайте на сердечко рядом с блюдом — оно появится здесь."
                action={
                  <button className="fz-btn" onClick={() => go("menu")}>
                    Посмотреть меню
                  </button>
                }
              />
            )}
          </div>
        </>
      );

    if (screen === "notifications") {
      const notifications = [
        {
          id: "welcome",
          type: "Акции",
          title: "Ваш первый повод заказать",
          text: "Скидка 30% на блюда с промокодом FOOD30. Пора попробовать любимое!",
          target: "menu",
        },
        ...state.orders.map((item) => ({
          id: `${item.id}-${item.step}-${item.cancelled}`,
          type: "Заказы",
          title: item.cancelled ? "Заказ отменён" : orderSteps[item.step],
          text: `${item.id} · ${item.items.map((line) => line.name).join(", ")}`,
          target: `order/${item.id}`,
        })),
      ].filter(
        (item) =>
          (state.notificationsEnabled || item.type !== "Акции") &&
          (notificationTab === "Все" || item.type === notificationTab),
      );
      return (
        <>
          <Header title="Уведомления" back={() => go("home")} />
          <div className="fz-content">
            <div className="fz-chips">
              {["Все", "Заказы", "Акции"].map((tab) => (
                <button
                  key={tab}
                  className={notificationTab === tab ? "selected" : ""}
                  aria-pressed={notificationTab === tab}
                  onClick={() => setNotificationTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            {notifications.length ? (
              notifications.map((item) => (
                <button
                  key={item.id}
                  className={`fz-notification${state.readNotifications.includes(item.id) ? " read" : ""}`}
                  onClick={() => {
                    setState((current) => ({
                      ...current,
                      readNotifications: [
                        ...new Set([...current.readNotifications, item.id]),
                      ],
                    }));
                    go(item.target);
                  }}
                >
                  <span className="fz-row-icon">
                    {item.type === "Акции" ? (
                      <Tag size={21} />
                    ) : (
                      <ShoppingBag size={21} />
                    )}
                  </span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.text}</small>
                  </span>
                  {!state.readNotifications.includes(item.id) && <i />}
                </button>
              ))
            ) : (
              <Empty
                icon={<Bell size={30} />}
                title="Пока тихо"
                text="Здесь появятся обновления ваших заказов."
              />
            )}
          </div>
        </>
      );
    }

    if (screen === "settings")
      return (
        <>
          <Header title="Настройки" back={() => go("profile")} />
          <div className="fz-content">
            <div className="fz-panel">
              <Row
                icon={<Bell size={20} />}
                title="Уведомления об акциях"
                subtitle="Настройка для этого демо"
                end={
                  <button
                    className={`fz-switch${state.notificationsEnabled ? " on" : ""}`}
                    role="switch"
                    aria-checked={state.notificationsEnabled}
                    aria-label="Уведомления об акциях"
                    onClick={() =>
                      setState((current) => ({
                        ...current,
                        notificationsEnabled: !current.notificationsEnabled,
                      }))
                    }
                  >
                    <span />
                  </button>
                }
              />
              <Row
                icon={<UserRound size={20} />}
                title="Имя в профиле"
                subtitle={state.name}
                onClick={() => {
                  setNameDraft(state.name);
                  setSheet("edit-profile");
                }}
              />
            </div>
            <p className="fz-description">
              Данные сохраняются только в этом браузере. Настоящий аккаунт,
              банковские данные и разрешения на уведомления для демоверсии не
              нужны.
            </p>
            <button
              className="fz-btn fz-btn-light"
              onClick={() => go("ui-kit")}
            >
              Посмотреть UI Kit <ArrowRight size={18} />
            </button>
          </div>
        </>
      );

    if (screen === "help")
      return (
        <>
          <Header title="Помощь и поддержка" back={() => go("profile")} />
          <div className="fz-content">
            <div className="fz-note">
              <MessageCircle size={25} />
              <span>
                Рады помочь<small>Ответы на самые частые вопросы</small>
              </span>
            </div>
            {[
              {
                q: "Это настоящая доставка?",
                a: "Это интерактивный концепт Food Zone для портфолио. Заказы, курьер и чат демонстрируют работу сервиса. Деньги не списываются.",
              },
              {
                q: "Как пройти весь сценарий?",
                a: "Добавьте блюда, укажите адрес и оформите заказ. На странице заказа переключайте этапы доставки. Когда курьер в пути, доступны карта и демо-чат. После доставки можно оставить отзыв.",
              },
              {
                q: "Как применить скидку?",
                a: "Нажмите на баннер на главной или введите FOOD30 в корзине. Скидка 30% действует на блюда, стоимость доставки считается отдельно.",
              },
              {
                q: "Сколько стоит доставка?",
                a: "49 сом. При сумме блюд от 1 000 сом до скидки доставка бесплатна.",
              },
              {
                q: "Можно отменить заказ?",
                a: "Да, на странице заказа до передачи курьеру. Отменённый заказ останется в истории.",
              },
            ].map((item) => (
              <details className="fz-faq" key={item.q}>
                <summary>
                  {item.q}
                  <ChevronDown size={17} />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </>
      );

    if (screen === "ui-kit")
      return (
        <>
          <Header title="UI Kit / Food Zone" back={() => go("settings")} />
          <div className="fz-content">
            <p className="fz-eyebrow">FOUNDATIONS & COMPONENTS</p>
            <h2 className="fz-large-heading">
              Тёплый. Простой.
              <br />
              Аппетитный.
            </h2>
            <p className="fz-description">
              Компоненты и состояния, дополняющие исходные экраны.
            </p>
            <div className="fz-swatches">
              {["#ed9149", "#fff7de", "#faf8f4", "#292722"].map((color) => (
                <div key={color}>
                  <span style={{ background: color }} />
                  <code>{color}</code>
                </div>
              ))}
            </div>
            <div className="fz-section-title">
              <h2>Кнопки</h2>
            </div>
            <button
              className="fz-btn"
              onClick={() => setToast("Основное действие")}
            >
              Основная кнопка <ArrowRight size={18} />
            </button>
            <button
              className="fz-btn fz-btn-light"
              onClick={() => setToast("Вторичное действие")}
            >
              Вторичная кнопка
            </button>
            <button className="fz-btn" disabled>
              Недоступное действие
            </button>
            <div className="fz-section-title">
              <h2>Поля и состояния</h2>
            </div>
            <label className="fz-label">
              Адрес
              <input placeholder="Улица, номер дома" />
            </label>
            <p className="fz-error">Укажите улицу и номер дома.</p>
            <div className="fz-note">
              <CheckCircle2 size={21} /> Адрес успешно сохранён
            </div>
            <div
              className="fz-skeleton-grid"
              aria-label="Пример состояния загрузки"
            >
              <div />
              <div />
            </div>
            <Empty
              title="Пока ничего нет"
              text="Здесь появится ваш первый заказ."
            />
            <div className="fz-section-title">
              <h2>Карточка и количество</h2>
            </div>
            <div className="fz-food-grid">
              <FoodCard
                food={foods[0]}
                favorite={state.favorites.includes(foods[0].id)}
                quantity={state.cart[foods[0].id] || 0}
                open={() => go(`dish/${foods[0].id}`)}
                toggleFavorite={() => favorite(foods[0].id)}
                add={() => add(foods[0].id)}
              />
            </div>
          </div>
        </>
      );
    return missing();
  }
  function missing() {
    return (
      <>
        <Header title="Страница не найдена" back={() => go("home")} />
        <Empty
          title="Кажется, мы свернули не туда"
          text="Этого блюда или заказа здесь нет. Вернёмся за чем-нибудь вкусным?"
          action={
            <button className="fz-btn" onClick={() => go("home")}>
              На главную
            </button>
          }
        />
      </>
    );
  }

  const showCart =
    totals.count > 0 &&
    ["home", "menu", "restaurant", "favorites"].includes(screen);
  return (
    <div className="fz-stage">
      <aside className="fz-desktop-brand" aria-hidden="true">
        <span className="fz-brand-icon">
          <UtensilsCrossed size={22} />
        </span>
        <span>
          Food Zone<small>Вкусное рядом.</small>
        </span>
      </aside>
      <Link className="fz-portfolio-link" href="/">
        Портфолио <ArrowRight size={15} />
      </Link>
      <div className="fz-device">
        <div className="fz-phone-screen">
          {!ready ? (
            <div className="fz-splash">
              <span className="fz-splash-logo">
                <UtensilsCrossed size={44} />
              </span>
              <h1>
                Food Zone<span>Вкусное рядом.</span>
              </h1>
              <span className="fz-spinner" />
              <small>Готовим кое-что вкусное</small>
            </div>
          ) : (
            <>
              <div className="fz-status-bar" aria-hidden="true">
                <span>9:41</span>
                <span className="fz-island" />
                <span className="fz-status-signals">
                  ▮▮▮ <span>◔</span> ▰
                </span>
              </div>
              <div className="fz-app-body" inert={sheet !== null}>
                {offline && (
                  <div className="fz-offline" role="status">
                    <WifiOff size={15} /> Вы офлайн. Демоверсия доступна.
                  </div>
                )}
                {storageFailed && (
                  <div className="fz-offline" role="status">
                    Браузер не разрешает сохранять данные.
                  </div>
                )}
                <main
                  className={`fz-scroll${screen === "chat" ? " fz-chat-screen" : ""}`}
                  ref={scroller}
                  key={screen}
                >
                  {renderScreen()}
                </main>
                {showCart && (
                  <button className="fz-cart-dock" onClick={() => go("cart")}>
                    <span className="fz-cart-count">{totals.count}</span>
                    <strong>В корзину</strong>
                    <span>{money(totals.total)}</span>
                    <ArrowRight size={17} />
                  </button>
                )}
                {!["checkout", "address", "chat", "review", "ui-kit"].includes(
                  screen,
                ) &&
                  screens.includes(screen) && (
                    <nav
                      className="fz-bottom-nav"
                      aria-label="Основная навигация"
                    >
                      {[
                        { id: "home", title: "Главная", Icon: Home },
                        { id: "menu", title: "Меню", Icon: UtensilsCrossed },
                        { id: "orders", title: "Заказы", Icon: ReceiptText },
                        { id: "profile", title: "Профиль", Icon: UserRound },
                      ].map(({ id, title, Icon }) => (
                        <button
                          key={id}
                          aria-current={navScreen === id ? "page" : undefined}
                          className={navScreen === id ? "active" : ""}
                          onClick={() => go(id)}
                        >
                          <Icon
                            size={21}
                            strokeWidth={navScreen === id ? 2.4 : 1.7}
                          />
                          <span>{title}</span>
                        </button>
                      ))}
                    </nav>
                  )}
              </div>
              {toast && (
                <div className="fz-toast" role="status">
                  <CheckCircle2 size={17} />
                  {toast}
                </div>
              )}
              <div className="fz-home-indicator" aria-hidden="true" />
              {sheet && (
                <Sheet
                  title={
                    {
                      filters: "Найдём что-нибудь вкусное",
                      payment: "Способ оплаты",
                      clear: "Очистить корзину?",
                      cancel: "Отменить заказ?",
                      reorder: "Заменить блюда в корзине?",
                      "edit-profile": "Как вас называть?",
                    }[sheet]
                  }
                  close={closeSheet}
                >
                  {sheet === "filters" && (
                    <>
                      <label className="fz-label">
                        Сортировка
                        <select
                          value={sort}
                          onChange={(event) => setSort(event.target.value)}
                        >
                          <option value="popular">По популярности</option>
                          <option value="price-up">Сначала дешевле</option>
                          <option value="price-down">Сначала дороже</option>
                        </select>
                      </label>
                      <label className="fz-check-label">
                        <input
                          type="checkbox"
                          checked={availableOnly}
                          onChange={(event) =>
                            setAvailableOnly(event.target.checked)
                          }
                        />
                        Только доступные блюда
                      </label>
                      <button className="fz-btn" onClick={closeSheet}>
                        Показать блюда <ArrowDown size={17} />
                      </button>
                    </>
                  )}
                  {sheet === "payment" && (
                    <>
                      <p className="fz-description">
                        Оплата при получении. В демоверсии банковские данные не
                        нужны.
                      </p>
                      {[
                        {
                          id: "cash" as const,
                          title: "Наличными",
                          Icon: Wallet,
                        },
                        {
                          id: "card" as const,
                          title: "Картой курьеру",
                          Icon: CreditCard,
                        },
                      ].map(({ id, title, Icon }) => (
                        <button
                          key={id}
                          className={`fz-payment-option${state.payment === id ? " selected" : ""}`}
                          onClick={() =>
                            setState((current) => ({ ...current, payment: id }))
                          }
                          aria-pressed={state.payment === id}
                        >
                          <Icon size={22} />
                          {title}
                          <span>
                            {state.payment === id && <Check size={18} />}
                          </span>
                        </button>
                      ))}
                      <button className="fz-btn" onClick={closeSheet}>
                        Готово
                      </button>
                    </>
                  )}
                  {sheet === "clear" && (
                    <>
                      <p className="fz-description">
                        Все блюда будут удалены из корзины. Избранное останется
                        на месте.
                      </p>
                      <button
                        className="fz-btn"
                        onClick={() => {
                          setState((current) => ({
                            ...current,
                            cart: {},
                            promo: "",
                          }));
                          closeSheet();
                        }}
                      >
                        Очистить корзину
                      </button>
                      <button className="fz-text-button" onClick={closeSheet}>
                        Оставить блюда
                      </button>
                    </>
                  )}
                  {sheet === "cancel" && (
                    <>
                      <p className="fz-description">
                        Мы остановим приготовление. Заказ сохранится в истории —
                        его можно будет повторить.
                      </p>
                      <button
                        className="fz-btn"
                        onClick={() => {
                          updateOrder({ cancelled: true });
                          closeSheet();
                          setToast("Заказ отменён");
                        }}
                      >
                        Да, отменить
                      </button>
                      <button className="fz-text-button" onClick={closeSheet}>
                        Продолжить ждать
                      </button>
                    </>
                  )}
                  {sheet === "reorder" && order && (
                    <>
                      <p className="fz-description">В корзине уже есть блюда. Заменить их составом этого заказа по текущим ценам?</p>
                      <button className="fz-btn" onClick={() => repeatOrder(order, true)}>Заменить и повторить</button>
                      <button className="fz-text-button" onClick={closeSheet}>Сохранить текущую корзину</button>
                    </>
                  )}
                  {sheet === "edit-profile" && (
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        if (!nameDraft.trim()) return;
                        setState((current) => ({
                          ...current,
                          name: nameDraft.trim(),
                        }));
                        closeSheet();
                        setToast("Профиль обновлён");
                      }}
                    >
                      <label className="fz-label">
                        Ваше имя
                        <input
                          required
                          maxLength={40}
                          value={nameDraft}
                          onChange={(event) => setNameDraft(event.target.value)}
                          placeholder="Марк"
                          autoComplete="given-name"
                        />
                      </label>
                      <button className="fz-btn" disabled={!nameDraft.trim()}>
                        Сохранить
                      </button>
                    </form>
                  )}
                </Sheet>
              )}
            </>
          )}
        </div>
      </div>
      <div className="fz-desktop-caption">
        <span>МОБИЛЬНЫЙ ОПЫТ · FOOD ZONE</span>
        <p>
          Маленькая радость.
          <br />С доставкой к вам.
        </p>
        <small>
          Интерактивный концепт
          <br />
          Выбирайте, заказывайте, пробуйте.
        </small>
      </div>
      <span className="fz-desktop-footer">DESIGNED WITH CARE · 2026</span>
    </div>
  );
}
