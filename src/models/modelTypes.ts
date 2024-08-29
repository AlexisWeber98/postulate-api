export interface PostulationsModelInterface {
  id: Number;
  userId: String;
  position: String;
  company: String;
  date: String;
  through: String;
  status: String;
  description: String;
  sendCv: String;
  sendEmail: String;
  recruiterContact: String;
}

export interface UserModelInterface {
  id: String;
  name: String;
  userName: String;
  lastName: String;
  email: String;
  password: String;
}





