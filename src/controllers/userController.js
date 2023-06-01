import { handleLoginUser } from '../services/userService';

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
module.exports = {
    handleLogin
}