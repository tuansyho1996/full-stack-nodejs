import db from '../models/index.js'
import _ from 'lodash'

let handleCreateInfoDoctorService = (data) => {
    return new Promise(async (resovle, reject) => {
        try {
            let isInfo = await db.InfoDoctor.findAll({
                where: { doctorId: data.doctorId }
            })
            if (isInfo) {
                let res = await db.InfoDoctor.update({
                    priceId: data.priceId,
                    provinceId: data.provinceId,
                    paymentId: data.paymentId,
                    nameClinic: data.nameClinic,
                    addressClinic: data.addressClinic,
                    note: data.note
                }, {
                    where: {
                        doctorId: data.doctorId,
                    }
                })
                resovle({
                    errorCode: 0,
                    message: 'ok',
                    data: res
                })
            }
            else {
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
        }
        catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleCreateInfoDoctorService
}