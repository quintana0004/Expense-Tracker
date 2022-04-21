export function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}
//`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
