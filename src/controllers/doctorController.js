import {
    handleGetTopDoctorHomepage, handleFetchDoctorSelect,
    handleCreateDoctorMarkdown, handleGetDetailDoctor,
    handlefetchListDoctorSpecialty
} from '../services/doctorService';
let getTopDoctorHomepage = async (req, res) => {
    try {
        let limit = req.query.limit;
        if (limit) {
            let data = await handleGetTopDoctorHomepage(+limit);
            return res.status(200).json(data)
        }
        else {
            let data = await handleGetTopDoctorHomepage();
            return res.status(200).json(data)
        }
    }
    catch (e) {
        console.log(e)
    }
}
let getDoctorSelect = async (req, res) => {
    try {
        let responsive = await handleFetchDoctorSelect();
        return res.status(200).json(responsive)
    }
    catch (e) {
        console.log(e)
    }
}
let createDortorMarkdown = async (req, res) => {
    try {
        let responsive = await handleCreateDoctorMarkdown(req.body);
        return res.status(200).json(responsive)
    }
    catch (e) {
        console.log(e)
    }
}
let getDetailDoctor = async (req, res) => {
    try {
        let responsive = await handleGetDetailDoctor(req.params.id);
        return res.status(200).json(responsive);
    }
    catch (e) {
        console.log(e)
    }
}
let fetchListDoctorSpecialty = async (req, res) => {
    try {
        let responsive = await handlefetchListDoctorSpecialty(req.query.specialtyId);
        return res.status(200).json(responsive);
    }
    catch (e) {
        console.log(e)
    }
}

let fetchPriceDoctorSelect =

    module.exports = {
        getTopDoctorHomepage, getDoctorSelect, createDortorMarkdown, getDetailDoctor,
        fetchListDoctorSpecialty
    }