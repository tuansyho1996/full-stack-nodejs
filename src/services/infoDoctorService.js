import db from '../models/index.js'
import _ from 'lodash'

let handleCreateInfoDoctorService = (data) => {
    return new Promise(async (resovle, reject) => {
        try {
            let isInfo = await db.InfoDoctor.findOne({
                where: { doctorId: data.doctorId }
            })
            if (!isInfo) {
                let res = await db.InfoDoctor.create({
                    doctorId: data.doctorId,
                    priceId: data.priceId,
                    provinceId: data.provinceId,
                    paymentId: data.paymentId,
                    nameClinic: data.nameClinic,
                    addressClinic: data.addressClinic,
                    note: data.note,
                    specialtyId: data.specialtyId
                })
                resovle({
                    errorCode: 0,
                    message: 'ok',
                    data: res
                })
            }
            else {
                let res = await db.InfoDoctor.update({
                    priceId: data.priceId,
                    provinceId: data.provinceId,
                    paymentId: data.paymentId,
                    nameClinic: data.nameClinic,
                    addressClinic: data.addressClinic,
                    note: data.note,
                    specialtyId: data.specialtyId
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
        }
        catch (e) {
            reject(e)
        }
    })
}
let handleFetchInfoDoctorService = (id) => {
    return new Promise(async (resovle, reject) => {
        try {
            let res = await db.InfoDoctor.findOne({
                where: { doctorId: id },
                include: [
                    { model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true
            });
            resovle({
                errorCode: 0,
                message: 'ok',
                user: res
            })
        }
        catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    handleCreateInfoDoctorService, handleFetchInfoDoctorService
}