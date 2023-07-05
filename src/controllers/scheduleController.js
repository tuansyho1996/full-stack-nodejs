import { handlebulkCreateScheduleService, handleFetchScheduleDoctorService } from '../services/scheduleService'

let bulkCreateSchedule = async (req, res) => {
    if (req.body) {
        try {
            let responsive = await handlebulkCreateScheduleService(req.body);
            return res.status(200).json(responsive)
        }
        catch (e) {
            console.log(e)
        }
    }
    else {
        return res.status(200).json({
            errorCode: -1,
            message: 'Missing requied prameter'
        })
    }
}
let fetchScheduleDoctor = async (req, res) => {
    if (req.query.doctorId && req.query.date) {
        try {
            let responsive = await handleFetchScheduleDoctorService(req.query.doctorId, req.query.date);
            res.status(200).json(responsive)
        }
        catch (e) {
            console.log(e)
        }
    }
    else {
        res.status(200).json({
            errorCode: 1,
            message: 'Missing parameter'
        })
    }
}
module.exports = {
    bulkCreateSchedule, fetchScheduleDoctor
}