import db from '../models/index.js';
import { sendSimpleEmail } from './emailService.js';
import { v4 as uuidv4 } from 'uuid';


let handlebookAppointmentSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.firstName || !data.lastName || !data.phonenumber) {
                resolve({
                    errorCode: 1,
                    message: "Missing required"
                })
            }
            else {
                let token = uuidv4();
                await sendSimpleEmail(data, token)
                let [user, create] = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        firstName: data.firstName,
                        lastName: data.lastName,
                        phonenumber: data.phonenumber,
                        gender: data.gender
                    },
                })
                await db.Booking.findOrCreate({
                    where: {
                        patientId: create ? user.dataValues.id : user.id,
                        date: data.time.date
                    },
                    defaults: {
                        statusId: 'S1',
                        doctorId: data.doctorId,
                        patientId: create ? user.dataValues.id : user.id,
                        date: data.time.date,
                        timeType: data.time.timeData.keyMap,
                        reason: data.reason,
                        token: token
                    }
                })
                resolve({
                    errorCode: 0,
                    message: 'ok',
                })
            }

        }
        catch (e) {
            reject(e)
        }
    })
}
let handleVerifyEmailBookAppointmentSchedule = (token, doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!token || !doctorId) {
                resolve({
                    errorCode: 1,
                    message: "Xác nhận email thất bại"
                })
            }
            else {
                let isbooking = await db.Booking.findOne({
                    where: {
                        doctorId: doctorId,
                        token: token
                    }
                })
                // console.log('check is booking', isbooking)
                if (isbooking !== null) {
                    let res = await db.Booking.update(
                        { statusId: 'S2' },
                        {
                            where: {
                                doctorId: doctorId,
                                token: token
                            }
                        }
                    )
                    resolve({
                        errorCode: 0,
                        message: 'ok'
                    })
                }
                else {
                    resolve({
                        errorCode: 1,
                        message: "Xác nhận email thất bại"
                    })
                }
            }
        }
        catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handlebookAppointmentSchedule,
    handleVerifyEmailBookAppointmentSchedule
}