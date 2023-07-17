import { handlebookAppointmentSchedule, handleVerifyEmailBookAppointmentSchedule } from '../services/patientService'

let bookAppointmentSchedule = async (req, res) => {
    try {
        let responsive = await handlebookAppointmentSchedule(req.body);
        return res.status(200).json(responsive)
    }
    catch (e) {
        console.log(e)
    }
}
let verifyEmailBookAppointmentSchedule = async (req, res) => {
    try {
        let responsive = await handleVerifyEmailBookAppointmentSchedule(req.query.token, req.query.doctorId);
        return res.status(200).json(responsive);
    }
    catch (e) {
        console.log(e)
    }
}
module.exports = {
    bookAppointmentSchedule, verifyEmailBookAppointmentSchedule
}