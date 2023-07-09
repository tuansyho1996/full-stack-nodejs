import db from '../models/index.js'
require('dotenv').config();
import _ from 'lodash'


let handlebulkCreateScheduleService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.arrSchedule && data.arrSchedule.length !== 0) {
                let maxNumber = process.env.MAXNUMBER;
                data.arrSchedule = data.arrSchedule.map(item => {
                    item.maxNumber = parseInt(maxNumber);
                    item.date = item.date.toString();
                    return item
                })

                let existArrSchedule = await db.Schedule.findAll({
                    where: {
                        doctorId: data.arrSchedule[0].doctorId,
                        date: data.arrSchedule[0].date
                    },
                    attributes: ['doctorId', 'date', 'timeType', 'maxNumber'],
                    raw: true
                });


                let toCreate = _.differenceWith(data.arrSchedule, existArrSchedule, (a, b) => {
                    return a.timeType === b.timeType && a.date === b.date
                });

                let res = await db.Schedule.bulkCreate(toCreate);
                resolve({
                    errorCode: 0,
                    message: 'ok',
                    res
                })
            }
            else {
                resolve({
                    errorCode: 0,
                    message: 'Missing parameter',
                })
            }
        }
        catch (e) {
            reject(e)
        }
    })
}
let handleFetchScheduleDoctorService = (doctorId, date) => {
    return new Promise(async (resovle, reject) => {
        try {
            let res = await db.Schedule.findAll({
                where: {
                    doctorId: doctorId,
                    date: date
                },
                include: [
                    { model: db.Allcode, as: 'timeData' },
                ],
                raw: true,
                nest: true
            })
            resovle({
                errorCode: 0,
                message: 'ok',
                data: res
            })
        }
        catch (e) {
            reject(e)
        }
    })
}
let createInfoDoctorService = (data) => {
    return new Promise(async (resovle, reject) => {
        try {
            let res = await db.InfoDoctor.create({
                doctorId: data.doctorId,
                priceId: data.priceId,
                provinceId: data.provinceId,
                paymentId: data.paymentId,
                nameClinic: data.nameClinic,
                addressClinic: data.addressClinic,
                note: data.note
            })
            resovle({
                errorCode: 0,
                message: 'ok',
                data: res
            })
        }
        catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handlebulkCreateScheduleService, handleFetchScheduleDoctorService
}