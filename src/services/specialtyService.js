import db from '../models/index.js';



let handlecreateSpecialtyService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await db.Specialty.create({
                name: data.name,
                descriptionHTML: data.descriptionHTML,
                descriptionMarkdown: data.descriptionMarkdown,
                image: data.image
            })
            resolve({
                errorCode: 0,
                message: 'ok',
            })
        }
        catch (e) {
            reject(e)
        }
    })
}
let handleFetchSpecialty = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id === 'ALL') {
                let res = await db.Specialty.findAll();
                resolve({
                    errorCode: 0,
                    message: 'ok',
                    data: res
                })
            }
            else {
                let res = await db.Specialty.findOne({
                    where: { id: id }
                })
                // console.log('check data', res)
                resolve({
                    errorCode: 0,
                    message: 'ok',
                    data: res
                })
            }
        }
        catch (e) {
            reject(e)
        }
    })
}
let handleFetchSpecialtySelect = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await db.Specialty.findAll(
                {
                    attributes: ['name', 'id']
                }
            )
            // console.log('check data', res)
            resolve({
                errorCode: 0,
                message: 'ok',
                data: res
            })
        }
        catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handlecreateSpecialtyService,
    handleFetchSpecialty,
    handleFetchSpecialtySelect
}