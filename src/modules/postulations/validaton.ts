export function validationPostPostulation(
  date: string,
  position: string,
  company: string,
  trough: string,
  userId:string,
) {
if (!userId) return { message: "userId is required" };
  if (!date) return { message: "date is required" };
  if (!position) return { message: "position is required" };
  if (!company) return { message: "company is required" };
  if (!trough) return { message: "trough is required" };
  else {
    return null;
  }
}
