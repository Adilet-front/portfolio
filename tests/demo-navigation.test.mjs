import test from "node:test";
import assert from "node:assert/strict";
import { portfolioReturnPath, demoReturnDelta } from "../content/demo-navigation.ts";

test("return accepts only same-origin portfolio pages", () => {
  const origin = "https://portfolio.example";
  assert.equal(portfolioReturnPath(`${origin}/`, origin), "/");
  assert.equal(portfolioReturnPath(`${origin}/work/food-zone#preview`, origin), "/work/food-zone#preview");
  for (const url of ["", "https://other.example/", `${origin}/demos/food-zone`, "javascript:alert(1)", `${origin}/unknown`]) {
    assert.equal(portfolioReturnPath(url, origin), null);
  }
});

test("return skips demo screen entries, including after Back and branching", () => {
  assert.equal(demoReturnDelta(0), -1);
  assert.equal(demoReturnDelta(3), -4);
  assert.equal(demoReturnDelta(1), -2);
});
