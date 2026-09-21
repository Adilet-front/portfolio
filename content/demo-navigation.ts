export type DemoNavigation = {
  depth: number;
  returnTo: string;
  canGoBack: boolean;
};

// Only portfolio pages are valid return destinations, never another demo.
export function portfolioReturnPath(referrer: string, origin: string): string | null {
  try {
    const url = new URL(referrer);
    if (url.origin !== origin) return null;
    if (url.pathname !== "/" && url.pathname !== "/work/food-zone") return null;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return null;
  }
}

export function demoReturnDelta(depth: number): number {
  return -(Math.max(0, Math.trunc(depth)) + 1);
}
