import { handleLoginUser, handleGetUser, handleCreateNewUser, handleEditUser, handleDeleteUser } from '../services/userService';

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
let createNewUser = async (req, res) => {
    let data = req.body;
    let dataCreate = await handleCreateNewUser(data);
    return res.status(200).json({
        errorCode: dataCreate.errorCode,
        message: dataCreate.message
    })

}
let editUser = async (req, res) => {
    let data = req.body;
    console.log(data)
    if (!data.id) {
        return res.status(200).json({
            errorCode: 1,
            message: 'Missing requied parameter id'
        })
    }
    let dataEdit = await handleEditUser(data);
    return res.status(200).json({
        errorCode: dataEdit.errorCode,
        message: dataEdit.message
    })

}
let deleteUser = async (req, res) => {
    let id = req.body.id;
    if (!id) {
        return res.status(200).json({
            errorCode: 1,
            message: 'Missing requied parameter id'
        })
    }
    let dataDelete = await handleDeleteUser(id);
    return res.status(200).json({
        errorCode: dataDelete.errorCode,
        message: dataDelete.message
    })
}
module.exports = {
    handleLogin,
    getUser,
    createNewUser,
    editUser,
    deleteUser
}