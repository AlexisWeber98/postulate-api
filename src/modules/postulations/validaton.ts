export function validationPostPostulation(
  aplicationDate: string,
  position: string,
  company: string,

  userId: string,
) {
  if (!userId) return { message: "userId is required" };
  if (!aplicationDate) return { message: "date is required" };
  if (!position) return { message: "position is required" };
  if (!company) return { message: "company is required" };
  else {
    return null;
  }
}
