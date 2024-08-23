export function validationPostUser(
  name: string,
  lastName: string,
  userName: string,
  email: string,
  password: string
) {
  if (!name) return { message: "name is required" };
  if (!lastName) return { message: "lastName is required" };
  if (!userName) return { message: "userName is required" };
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