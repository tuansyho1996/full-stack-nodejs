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
let getUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({ raw: true });
            resolve(users);
        }
        catch (e) {
            reject(e);
        }
    })
}
let findUserEdit = (id) => {
    return new Promise(async (resovle, reject) => {
        try {

            const user = db.User.findOne({ where: { id: id } });
            if (user) {
                resovle(user);
            }
            else {
                resovle({});
            }
        }
        catch (e) {
            reject(e)
        }
    })
}
let handleEditUSer = (user) => {
    return new Promise(async (resovle, reject) => {
        try {
            await db.User.update(
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    address: user.address
                },
                {
                    where: {
                        id: user.id
                    }
                }
            )
            resovle('update user succeed');
        }
        catch (e) {
            reject(e)
        }
    })
}
let handleDeleteUser = (id) => {
    return new Promise(async (resovle, reject) => {
        try {
            await db.User.destroy({ where: { id: id } });
            resovle('Delete user succeed');
        }
        catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createNewUser,
    getUsers,
    findUserEdit,
    handleEditUSer,
    handleDeleteUser
}