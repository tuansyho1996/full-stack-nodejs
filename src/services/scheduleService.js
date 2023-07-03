import db from '../models/index.js'
require('dotenv').config();
import _ from 'lodash'


let handlebulkCreateScheduleService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.arrSchedule && data.arrSchedule.length !== 0) {
                let maxNumber = process.env.MAXNUMBER;
                data.arrSchedule = data.arrSchedule.map(item => {
                    item.maxNumber = maxNumber;
                    return item
                })
                let existArrSchedule = await db.Schedule.findAll({
                    where: {
                        doctorId: data.arrSchedule[0].doctorId,
                    },
                    attributes: ['doctorId', 'date', 'timeType', 'maxNumber'],
                    raw: true
                });
                existArrSchedule = existArrSchedule.map(item => {
                    item.date = Date.parse(item.date);
                    return item
                })

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
module.exports = {
    handlebulkCreateScheduleService,
}