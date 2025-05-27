export interface ReqUserBody {
  name: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  imageUrl?: string;
}

export interface UserModelInterface {
  id: string;
  name: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  imageUrl?: string | null;
}
