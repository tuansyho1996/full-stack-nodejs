import { handleGetTopDoctorHomepage } from '../services/doctorService';

let getTopDoctorHomepage = async (req, res) => {
    try {
        let limit = req.query.limit
        let data = await handleGetTopDoctorHomepage(+limit);
        return res.status(200).json(data)
    }
    catch (e) {
        console.log(e)
    }
}
module.exports = {
    getTopDoctorHomepage
}