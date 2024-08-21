export interface PostulationsModelInterface {
  id: Number;
  position: String;
  company: String;
  date: String;
  through: String;
}

export interface UserModelInterface {
  id: String;
  name: String;
  user_handle: String;
  email: String;
  password: String;
}
