export interface ReqPostBody {
  applicationDate: string;
  position: string;
  company: string;
  link: string;
  status: string;
  userId: string;
  description?: string;
  sendEmail?: boolean;
  sendCv: boolean;
  recruiterContact: string;
}

