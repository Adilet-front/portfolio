"use client";

import Image from "next/image";

import { useEffect, useRef, type ReactNode } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Heart,
  MapPin,
  Minus,
  Plus,
  Search,
  Star,
  UtensilsCrossed,
  X,
} from "lucide-react";
import type { Food } from "@/content/food-zone";
import { money } from "@/content/food-zone";

export function Header({
  title,
  back,
  action,
}: {
  title: string;
  back?: () => void;
  action?: ReactNode;
}) {
  return (
    <header className="fz-header">
      {back ? (
        <button className="fz-icon" onClick={back} aria-label="Назад">
          <ArrowLeft size={21} />
        </button>
      ) : (
        <span className="fz-mini-logo">
          <UtensilsCrossed size={18} />
        </span>
      )}
      <h1 tabIndex={-1}>{title}</h1>
      {action || <span className="fz-header-spacer" />}
    </header>
  );
}
export function Empty({
  icon,
  title,
  text,
  action,
}: {
  icon?: ReactNode;
  title: string;
  text: string;
  action?: ReactNode;
}) {
  return (
    <div className="fz-empty">
      <div className="fz-empty-icon">{icon || <Search size={30} />}</div>
      <h2>{title}</h2>
      <p>{text}</p>
      {action}
    </div>
  );
}
export function Quantity({
  name,
  quantity,
  onChange,
}: {
  name: string;
  quantity: number;
  onChange: (delta: number) => void;
}) {
  return (
    <div className="fz-quantity">
      <button
        onClick={() => onChange(-1)}
        aria-label={`Убрать одну порцию: ${name}`}
      >
        <Minus size={16} />
      </button>
      <span aria-live="polite">{quantity}</span>
      <button
        disabled={quantity >= 20}
        onClick={() => onChange(1)}
        aria-label={`Добавить одну порцию: ${name}`}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
export function FoodCard({
  food,
  favorite,
  quantity,
  open,
  toggleFavorite,
  add,
}: {
  food: Food;
  favorite: boolean;
  quantity: number;
  open: () => void;
  toggleFavorite: () => void;
  add: () => void;
}) {
  return (
    <article
      className={`fz-food-card${food.available ? "" : " fz-unavailable"}`}
    >
      <button
        className={`fz-favorite${favorite ? " is-active" : ""}`}
        onClick={toggleFavorite}
        aria-label={`${favorite ? "Убрать из избранного" : "Добавить в избранное"}: ${food.name}`}
        aria-pressed={favorite}
      >
        <Heart size={17} fill={favorite ? "currentColor" : "none"} />
      </button>
      <button
        className="fz-food-open"
        onClick={open}
        aria-label={`Подробнее: ${food.name}`}
      >
        <Image
          src={food.image}
          alt={food.name}
          width="180"
          height="142"
          loading="lazy"
        />
        <span className="fz-food-copy">
          <span className="fz-food-name">{food.name}</span>
          <span className="fz-meta">
            <Star size={11} fill="currentColor" /> {food.rating}
            <span>·</span>
            {food.weight}
          </span>
        </span>
      </button>
      <div className="fz-food-bottom">
        <strong>{money(food.price)}</strong>
        <button
          className="fz-add"
          disabled={!food.available}
          onClick={add}
          aria-label={`Добавить в корзину: ${food.name}`}
        >
          {food.available ? (
            quantity ? (
              <span>
                {quantity}
                <Plus size={12} />
              </span>
            ) : (
              <Plus size={18} />
            )
          ) : (
            <span>Завтра</span>
          )}
        </button>
      </div>
    </article>
  );
}
export function Row({
  icon,
  title,
  subtitle,
  onClick,
  end,
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  end?: ReactNode;
}) {
  const content = (
    <>
      <span className="fz-row-icon">{icon}</span>
      <span className="fz-row-copy">
        <strong>{title}</strong>
        {subtitle && <small>{subtitle}</small>}
      </span>
      {end || <ChevronRight size={17} />}
    </>
  );
  return onClick ? (
    <button className="fz-row" onClick={onClick}>
      {content}
    </button>
  ) : (
    <div className="fz-row">{content}</div>
  );
}
export function Sheet({
  title,
  close,
  children,
}: {
  title: string;
  close: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const root = ref.current;
    const focusable = () =>
      Array.from(
        root?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input, textarea, select, a[href], [tabindex="0"]',
        ) || [],
      );
    focusable()[0]?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "Tab") {
        const elements = focusable();
        const first = elements[0],
          last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    root?.addEventListener("keydown", key);
    return () => {
      root?.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, [close]);
  return (
    <div className="fz-sheet-backdrop" onClick={close}>
      <div
        ref={ref}
        className="fz-sheet"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="fz-sheet-handle" />
        <div className="fz-sheet-heading">
          <h2>{title}</h2>
          <button className="fz-icon" onClick={close} aria-label="Закрыть">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
export function DemoMap({
  tracking = false,
  step = 0,
  point = 0,
  onSelect,
}: {
  tracking?: boolean;
  step?: number;
  point?: number;
  onSelect?: (point: number) => void;
}) {
  return (
    <div
      className={`fz-map${tracking ? " fz-map-large" : ""}`}
      aria-label="Схематичная демонстрационная карта Бишкека"
    >
      <div className="fz-map-block block-one" />
      <div className="fz-map-block block-two" />
      <div className="fz-map-block block-three" />
      <div className="fz-map-park">
        Парк
        <br />
        Панфилова
      </div>
      <div className="fz-map-street street-one">ул. Фрунзе</div>
      <div className="fz-map-street street-two">пр. Чуй</div>
      <div className="fz-map-street street-three">ул. Панфилова</div>
      <div className="fz-map-street street-four">ул. Тыныстанова</div>
      <span className="fz-map-label">БИШКЕК</span>
      {tracking && (
        <div className={`fz-map-route route-step-${step}`}>
          <span />
        </div>
      )}
      {[0, 1, 2].map((i) => (
        <button
          type="button"
          key={i}
          className={`fz-map-pin pin-${i}${point === i ? " selected" : ""}`}
          onClick={() => onSelect?.(i)}
          disabled={!onSelect}
          aria-label={`Выбрать адрес: ${["Фрунзе, 54", "Чуй, 120", "Панфилова, 89"][i]}`}
          aria-pressed={point === i}
        >
          <MapPin size={point === i ? 27 : 20} fill="currentColor" />
          <span>{point === i ? "Ваш адрес" : ""}</span>
        </button>
      ))}
      <span className="fz-map-disclaimer">Демонстрационная карта</span>
    </div>
  );
}
