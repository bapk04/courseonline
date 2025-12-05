// components/Utils/PriceUtils.ts
export function parsePrice(price: string): number {
  // price like '$19.99'
  const n = Number(price.replace(/[^0-9.-]+/g, ''));
  return Number.isNaN(n) ? 0 : n;
}

export function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`;
}
