import bcrypt from 'bcryptjs'
import db from '../models/index.js'

const salt = bcrypt.genSaltSync(10);



let createNewUser = (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await hashPasswordFromBcryt(data.password)
            db.User.create({
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender,
                roleId: data.role,
                phonenumber: data.phonenumber,
                password: hashPassword
            })
            resolve('create user succeed');
        }
        catch (e) {
            reject(e)
        }
    })
}
let hashPasswordFromBcryt = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }
        catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createNewUser
}