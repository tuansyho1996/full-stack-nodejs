import {
    handlecreateSpecialtyService, handleFetchSpecialty,
    handleFetchSpecialtySelect
} from '../services/specialtyService'

let createSpecialty = async (req, res) => {
    // console.log('check data specialty controller', req.body)
    if (req.body.name || req.body.image || req.body.descriptionHTML || req.body.descriptionMarkdown) {
        try {
            let responsive = await handlecreateSpecialtyService(req.body);
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
let fetchSpecialty = async (req, res) => {
    try {
        if (req.query.id) {

            let responsive = await handleFetchSpecialty(req.query.id);
            return res.status(200).json(responsive)
        }
        else {
            return res.status(200).json({
                errorCode: -1,
                message: 'Missing id'
            })
        }
    }
    catch (e) {
        console.log(e)
    }
}
let fetchSpecialtySelect = async (req, res) => {
    try {
        let responsive = await handleFetchSpecialtySelect();
        return res.status(200).json(responsive)
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = {
    createSpecialty,
    fetchSpecialty,
    fetchSpecialtySelect
}