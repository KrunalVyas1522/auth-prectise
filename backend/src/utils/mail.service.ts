import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    secure: false,
  });
;
  // private transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   secure: false, // true for port 465, false for other ports
  //   auth: {
  //     user: "maddison53@ethereal.email",
  //     pass: "jn7jnAPss4f63QBp6D",
  //   },
  // });
  async sendVerificationEmail(email: string) {
    console.log('Recepient email: ========> ', email)
    await this.transporter.sendMail({
      from: 'no-reply@example.com',
      to: email,
      subject: 'Verify Your Email',
      text: `Click the link to verify your email: http://localhost:3001/auth/verify?email=${email}`,
    });
  }
}
