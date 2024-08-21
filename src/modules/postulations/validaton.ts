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

export function validationPostUser(
  name: string,
  last_name: string,
  user_name: string,
  email: string,
  password: string
) {
  if (!name) return { message: "name is required" };
  if (!last_name) return { message: "last_name is required" };
  if (!user_name) return { message: "user_name is required" };
  if (!email) return { message: "email is required" };
  if (!password) return { mesage: "password is required" };
  else {
    return ;
  }
}

export function validationLogin(email: string, password: string) {
  if (!email) return { message: "email is required" };
  if (!password) return { message: "password is required" };
  else {
    return ;
  }
}
