import { handleLoginUser, handleGetUser } from '../services/userService';

let handleLogin = async (req, res) => {
    let { email, password } = req.body
    if (!email || !password) {
        return res.status(500).json({
            errorCode: 1,
            message: 'Missing requied parameter'
        })
    }
    let userData = await handleLoginUser(email, password);
    return res.status(200).json({
        errorCode: userData.errorCode,
        message: userData.message,
        user: userData.user
    })
}
let getUser = async (req, res) => {
    let id = req.query.id;
    let user = await handleGetUser(id);
    console.log("check user", user)
    if (!id) {
        return res.status(500).json({
            errorCode: 1,
            message: 'Missing requied parameter',
        })
    }
    return res.status(200).json({
        errorCode: 0,
        message: 'ok',
        user
    })

}
module.exports = {
    handleLogin,
    getUser
}