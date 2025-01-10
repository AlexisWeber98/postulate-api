export interface PostulationsModelInterface {
  id: String;
  userId: String;
  position: String;
  company: String;
  date: String;
  through: String;
  status: String;
  description: String;
  sendCv: String;
  sendEmail: Boolean;
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





