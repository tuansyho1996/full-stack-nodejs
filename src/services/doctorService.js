import db from '../models/index.js'

let handleGetTopDoctorHomepage = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await db.User.findAll({
                where: { roleId: 'R2' },
                limit: limitInput,
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true
            })
            resolve({
                errorCode: 0,
                message: 'ok',
                data: res
            })
        }
        catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleGetTopDoctorHomepage,
}