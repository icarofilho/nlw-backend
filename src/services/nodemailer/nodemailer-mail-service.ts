import  nodemailer  from 'nodemailer';
import { MailService, SendMailData } from "./../mail-service";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a806913fb7d5c6",
    pass: "471377795b1f22",
  },
});

export class nodemailerMailerService implements MailService {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: "Equipe feedGet <oi@feedget.com>",
      to: "Icaro Ferreira <icaro.ferreira.filho@gmail.com>",
      subject,
      html: body,
    });
  }
}
