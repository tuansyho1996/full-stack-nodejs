import { handleGetAllcode } from '../services/allcodeService'

let getAllcode = async (req, res) => {
    if (req.query.type === undefined) {
        return res.status(200).json({
            errorCode: -1,
            message: 'Missing requied prameter'
        })
    }
    else {
        try {
            let data = await handleGetAllcode(req.query.type);
            return res.status(200).json(data)
        }
        catch (e) {
            console.log(e)
        }
    }
}
module.exports = {
    getAllcode
}