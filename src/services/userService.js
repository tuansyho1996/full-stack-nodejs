import db from '../models/index.js'
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);

let handleLoginUser = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isEmail = checkEmailUser(email);
            let userData = {};
            if (!isEmail) {
                userData.errorCode = 1;
                userData.message = 'your email not exist ours system';
                resolve(userData);
            }
            else {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'password', 'roleId', 'firstName', 'lastName'],
                    raw: true

                });
                if (!user) {
                    userData.errorCode = 1;
                    userData.message = `your's user not found`
                }
                else {
                    let isPassword = await bcrypt.compareSync(password, user.password);
                    delete user.password;
                    if (isPassword) {
                        userData.errorCode = 0;
                        userData.message = 'status OK';
                        userData.user = user;
                    }
                    else {
                        userData.errorCode = 2;
                        userData.message = 'your password not correct'
                    }
                }
                resolve(userData);
            }
        }
        catch (e) {
            reject(e)
        }
    })
}
let checkEmailUser = async (emailUser) => {
    let isEmail = await db.User.findOne({ where: { email: emailUser } });
    if (isEmail) {
        return true
    }
    else {
        return false
    }
}
let handleGetUser = (userId) => {
    return new Promise(async (resovle, reject) => {
        try {
            let user = ''
            if (userId && userId !== 'ALL') {
                user = await db.User.findOne({
                    where: { id: userId }
                })
            }
            if (userId && userId === 'ALL') {
                user = await db.User.findAll({
                })
            }
            resovle(user)
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
let handleCreateNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkEmail = await checkEmailUser(data.email);
            if (checkEmail) {
                resolve({
                    errorCode: 1,
                    message: `Your's email already exist ours system, plz try another email`
                })
            }
            else {
                let hashPassword = await hashPasswordFromBcryt(data.password)
                db.User.create({
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender,
                    roleId: data.role,
                    phonenumber: data.phonenumber,
                    positionId: data.position,
                    password: hashPassword,
                    image: data.avatar
                })
                resolve({
                    errorCode: 0,
                    message: 'ok'
                });
            }
        }
        catch (e) {
            reject(e)
        }
    })
}
let handleEditUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: data.id } });

            if (!user) {
                resolve({
                    errorCode: 1,
                    message: 'User not exist'
                })
            }
            else {
                await db.User.update(data, { where: { id: data.id } })
                resolve({
                    errorCode: 0,
                    message: 'ok'
                })
            }
        }
        catch (e) {
            reject(e)
        }
    })
}
let handleDeleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userDelete = await db.User.findOne({ where: { id } });
            if (userDelete) {
                await db.User.destroy({ where: { id } });
                resolve({
                    errorCode: 0,
                    message: 'ok'
                })
            }
            else {
                resolve({
                    errorCode: 1,
                    message: `User does not exist`
                })
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleLoginUser,
    handleGetUser,
    handleCreateNewUser,
    handleEditUser,
    handleDeleteUser,
}