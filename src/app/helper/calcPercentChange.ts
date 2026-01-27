export const calcPercentChange = (
  current: number,
  previous: number,
): string => {
  if (!previous || previous === 0) return "0%";

  const percent = ((current - previous) / previous) * 100;

  return `${percent > 0 ? "+" : ""}${percent.toFixed(1)}%`;
};
