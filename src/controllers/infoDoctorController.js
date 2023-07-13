import { handleCreateInfoDoctorService, handleFetchInfoDoctorService } from '../services/infoDoctorService'

let createInfoDoctor = async (req, res) => {
    try {
        let responsive = await handleCreateInfoDoctorService(req.body);
        res.status(200).json(responsive)
    }
    catch (e) {
        console.log(e)
    }
}
let fetchInfoDoctor = async (req, res) => {
    try {
        let responsive = await handleFetchInfoDoctorService(req.query.id);
        res.status(200).json(responsive)
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = {
    createInfoDoctor, fetchInfoDoctor
}