import { Resend } from "resend";
import { resendApiKey } from "../config/config.js";

const resend = new Resend(resendApiKey || "");

export const sendTestEmail = async () => {
  const response = await resend.emails.send({
    from: "Ale <send@postulateok.com>",
    to: ["person@email.com"],
    subject: "Hello from PostulateOK men",
    html: "<strong>It works! This is an email from PostulateOk men :), Thankyou for loging  </strong>",
  });

  console.log("esta es la response ----------- ", response);
  return response;
};
