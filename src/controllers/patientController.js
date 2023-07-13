import { handlebookAppointmentSchedule } from '../services/patientService'

let bookAppointmentSchedule = async (req, res) => {
    try {
        let responsive = await handlebookAppointmentSchedule(req.body);
        return res.status(200).json(responsive)
    }
    catch (e) {
        console.log(e)
    }
}
module.exports = {
    bookAppointmentSchedule
}