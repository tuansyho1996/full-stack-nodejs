import db from '../models/index.js'
import CRUDServices from '../services/CRUDService.js'

let getHomePage = async (req, res) => {
    try {
        const data = await db.User.findAll();
        return res.render('homepage.ejs', { data: JSON.stringify(data) })
    } catch (e) {
        console.log(e)
    }

}
let getCrudPage = async (req, res) => {
    return res.render('crudpage.ejs');
}
let postCrud = async (req, res) => {
    const message = await CRUDServices.createNewUser(req.body);
    console.log(message)
    return res.redirect('/')
}
let displayGetCRUD = async (req, res) => {
    let users = await CRUDServices.getUsers();
    res.render('displayUsers.ejs', { data: users });
}
let getEditUserCRUD = async (req, res) => {
    const user = await CRUDServices.findUserEdit(req.query.id);
    res.render('editUserPage.ejs', { user: user })
}
let putEditUserCRUD = async (req, res) => {
    const user = req.body;
    let statusUdateUser = await CRUDServices.handleEditUSer(user);
    return res.redirect('/display-crud')
}
module.exports = {
    getHomePage,
    getCrudPage,
    postCrud,
    displayGetCRUD,
    getEditUserCRUD,
    putEditUserCRUD
}