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
                    console.log('check isPassword', isPassword);
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

module.exports = {
    handleLoginUser
}