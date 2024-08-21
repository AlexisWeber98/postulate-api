
export interface ReqPostBody {
  date: string;
  position: string;
  company: string;
  trough: string;
  status: string;
  userId: string;
  description?:string;
  send_email?:boolean;
  send_cv:boolean;
  recruiter_contact: string;
}