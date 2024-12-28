// export function formatDate(dateString: string) {
//   const date = new Date(dateString);
//   return date.toLocaleDateString("id-ID", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// }

export function formatTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}
