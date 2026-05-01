export function formatSom(amount: number, opts: { decimals?: number } = {}): string {
  const decimals = opts.decimals ?? 0;
  const fixed = Number(amount).toFixed(decimals);
  const [intPart, fracPart] = fixed.split(".");
  const withSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return fracPart ? `${withSep},${fracPart}` : withSep;
}

export function formatSomLabel(amount: number, opts: { decimals?: number } = {}): string {
  return `${formatSom(amount, opts)} so'm`;
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatDays(days: number): string {
  return `${formatSom(days, { decimals: days % 1 === 0 ? 0 : 2 })} kun`;
}

export function formatHours(hours: number): string {
  return `${formatSom(hours, { decimals: hours % 1 === 0 ? 0 : 2 })} soat`;
}
