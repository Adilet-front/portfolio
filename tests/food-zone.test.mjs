import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateTotals,
  changeQuantity,
  initialFoodState,
  restoreFoodState,
} from "../content/food-zone.ts";

test("empty cart has neither delivery nor discount", () => {
  assert.deepEqual(calculateTotals({}, "FOOD30"), {
    subtotal: 0,
    delivery: 0,
    discount: 0,
    total: 0,
    count: 0,
  });
});

test("discount applies to food only, rounded to whole som", () => {
  assert.deepEqual(calculateTotals({ biryani: 1 }, "FOOD30"), {
    subtotal: 249,
    delivery: 49,
    discount: 75,
    total: 223,
    count: 1,
  });
  assert.equal(calculateTotals({ biryani: 1 }, "INVALID").total, 298);
});

test("free delivery uses the food subtotal before discount", () => {
  assert.equal(calculateTotals({ biryani: 4 }, "FOOD30").delivery, 49);
  assert.equal(calculateTotals({ biryani: 4, cake: 1 }, "FOOD30").delivery, 0);
});

test("quantity is bounded; unavailable and unknown dishes cannot be added", () => {
  assert.deepEqual(changeQuantity({ biryani: 1 }, "biryani", -1), {});
  assert.deepEqual(changeQuantity({ biryani: 20 }, "biryani", 1), {
    biryani: 20,
  });
  assert.deepEqual(changeQuantity({}, "dessert", 1), {});
  assert.deepEqual(changeQuantity({}, "unknown", 1), {});
  assert.deepEqual(changeQuantity({}, "biryani", 0.5), {});
});

test("corrupt storage does not crash the app or inject invalid basket prices", () => {
  assert.deepEqual(restoreFoodState("{broken"), initialFoodState);
  assert.deepEqual(
    restoreFoodState(JSON.stringify({ version: 2 })),
    initialFoodState,
  );
  const result = restoreFoodState(
    JSON.stringify({
      version: 1,
      cart: { biryani: 100, pizza: -3, cake: "2", unknown: 1, dessert: 1 },
      orders: [null, {}],
      favorites: ["biryani", "unknown"],
      address: null,
    }),
  );
  assert.deepEqual(result.cart, { biryani: 20 });
  assert.deepEqual(result.favorites, ["biryani"]);
  assert.deepEqual(result.orders, []);
  assert.deepEqual(result.address, initialFoodState.address);
});

test("orders and chat survive a storage round trip", () => {
  const order = {
    id: "test",
    createdAt: 1000,
    items: [
      { id: "biryani", name: "Куриный бирьяни", price: 249, quantity: 1 },
    ],
    subtotal: 249,
    delivery: 49,
    discount: 75,
    total: 223,
    address: {
      street: "ул. Фрунзе, 54",
      apartment: "12",
      entrance: "2",
      note: "",
    },
    payment: "card",
    step: 3,
    cancelled: false,
    rating: 5,
    review: "Вкусно",
  };
  const state = {
    ...initialFoodState,
    orders: [order],
    messages: { test: [{ id: "m1", text: "Здравствуйте", from: "user" }] },
  };
  const restored = restoreFoodState(JSON.stringify(state));
  assert.deepEqual(restored.orders, [order]);
  assert.deepEqual(restored.messages, state.messages);
});
