import { handlebulkCreateScheduleService } from '../services/scheduleService'

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
module.exports = {
    bulkCreateSchedule
}