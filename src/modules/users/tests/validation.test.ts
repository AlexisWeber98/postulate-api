export function isToday(dateInput: string | Date): boolean {
  const inputDate = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const today = new Date();

  return (
    inputDate.getFullYear() === today.getFullYear() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getDate() === today.getDate()
  );
}
