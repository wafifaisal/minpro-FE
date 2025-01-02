export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(dateTime: string) {
  const time = new Date(dateTime);
  let result = "";
  if (time.getHours() < 10) result += `0${time.getHours()}`;
  else result += `${time.getHours()}`;
  if (time.getMinutes() < 10) result += `:0${time.getMinutes()}`;
  else result += `:${time.getMinutes()}`;
  return result;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}
