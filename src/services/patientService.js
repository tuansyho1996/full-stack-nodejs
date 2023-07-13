import db from '../models/index.js'

let handlebookAppointmentSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
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
            await db.Booking.create({
                statusId: 'S1',
                doctorId: data.doctorId,
                patientId: create ? user.dataValues.id : user.id,
                date: data.date,
                timeType: data.timeType,
                reason: data.reason
            })
            resolve({
                errorCode: 0,
                message: 'ok',
            })
        }
        catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handlebookAppointmentSchedule,
}