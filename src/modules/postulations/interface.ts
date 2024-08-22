
export interface ReqPostBody {
  date: string;
  position: string;
  company: string;
  trough: string;
  status: string;
  userId: string;
  description?:string;
  sendEmail?:boolean;
  sendCv:boolean;
  recruiterContact: string;
}