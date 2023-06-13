import db from '../models/index.js'

let handleGetAllcode = (type) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (type === 'all') {
                let res = await db.Allcode.findAll()
                resolve({
                    errorCode: 0,
                    message: 'ok',
                    data: res
                });
            }
            else {
                let res = await db.Allcode.findAll({ where: { type: type } })
                if (res.length !== 0) {
                    resolve({
                        errorCode: 0,
                        message: 'ok',
                        data: res
                    });
                }
                else {
                    resolve({
                        errorCode: 1,
                        message: 'type not exist'
                    })
                }
            }
        }
        catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handleGetAllcode,
}