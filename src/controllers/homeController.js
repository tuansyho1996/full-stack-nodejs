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
module.exports = {
    getHomePage,
    getCrudPage,
    postCrud
}