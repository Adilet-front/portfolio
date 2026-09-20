import type { Metadata, Viewport } from "next";
import { FoodZoneApp } from "@/components/food-zone/FoodZoneApp";
import "./food-zone.css";

export const metadata: Metadata = {
  title: "Food Zone — вкусное рядом",
  description:
    "Интерактивный концепт доставки еды. Выберите любимые блюда и пройдите путь от заказа до доставки.",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#faf8f4",
  colorScheme: "light",
};

export default function FoodZonePage() {
  return <FoodZoneApp />;
}
