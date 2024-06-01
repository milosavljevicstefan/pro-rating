import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { reviewTemplate } from "./templates/review";

export async function sendMail({
  to,
  name,
  subject,
  body,
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
}) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    host: "mail.pro-rating.com",
    port: 465,
    secure: true,
    auth: {
      user: "pro-rating@pro-rating.com", 
      pass: SMTP_PASSWORD,
    },
  });

  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.error({ error });
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: "pro-rating@pro-rating.co",
      to,
      subject,
      html: body,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
}

export function compileWReviewTemplate(name: string, url: string) {
  const template = handlebars.compile(reviewTemplate);
  const htmlBody = template({
    name: name,
    url: url,
  });
  return htmlBody;
}
