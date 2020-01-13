import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Any } from 'typeorm';
@Injectable()
export class MailService {
  constructor() { }

  sendMail() {
    const mailOptions = {
      from: 'chamayou.guilhem13@gmail.com',
      to: 'chamayou.guilhem13@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!',
    };

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: false,
      auth: {
        user: 'chamayou.guilhem13@gmail.com',
        pass: 'Wzeb829zebd!',
      },
      tls: { rejectUnauthorized: false },
    });


    console.log(mailOptions);

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return error;
      } else {
        console.log('yes');
        return 'E-mail enviado com sucesso!';
      }
    });
  }

}
