import nodemailer from 'nodemailer';
import moment from 'moment'

require('dotenv').config();

let buildUrlVerifyEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
    return result
}

let sendSimpleEmail = async (data, token) => {
    let urlVerifyEmail = buildUrlVerifyEmail(data.doctorId, token);
    // console.log('check run send email')
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.APP_USER_EMAIL,
            pass: process.env.APP_PASSWORD_EMAIL
        }
    });

    const info = await transporter.sendMail({
        from: '"Booking care 👻" <hoaroihuutinh101296@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: `Thông tin dặt lịch khám bệnh`, // Subject line
        html: `<p>Bạn nhận được email này vì bạn đã đặt lịch khám online từ booking care</p>
            <p>Thông tin đặt lịch kams bệnh</p>
            <div><b>Thời gian: ${data.dateHtml}  &nbsp; ${data.time.timeData.valueEn}</b></div>
            <div><b>Bacs sĩ: ${data.firstNameDoctor}&nbsp;${data.lastNameDoctor}</b></div>
            <p>Nếu các thông tin trên là đúng, vui lòng nhấn vào link bên dưới để xác nhận đăt lịch khám</p>
            <a href=${urlVerifyEmail} target="_blank">Link</a>
            <div> Xin chân thành cảm ơn </div>
        `, // html body
    });
}

module.exports = {
    sendSimpleEmail
}