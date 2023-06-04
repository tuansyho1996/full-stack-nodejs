import db from '../models/index.js'
import bcrypt from 'bcryptjs'

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
                    attributes: ['email', 'password', 'roleId'],
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

module.exports = {
    handleLoginUser,
    handleGetUser
}