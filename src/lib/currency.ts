const formatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export function formatCurrency(value: number): string {
  return formatter.format(value);
}

const UNIT_LABEL: Record<string, string> = {
  bag: "bag",
  piece: "piece",
  length: "length",
  sheet: "sheet",
  roll: "roll",
  box: "box",
  set: "set",
  sqm: "sqm",
  ton: "ton",
  litre: "litre",
  bucket: "bucket",
};

export function formatPriceWithUnit(price: number, unit: string): string {
  return `${formatCurrency(price)} / ${UNIT_LABEL[unit] ?? unit}`;
}
