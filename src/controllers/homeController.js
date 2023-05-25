import db from '../models/index.js'

let getHomePage = async (req, res) => {
    try {
        const data = await db.User.findAll();
        console.log(data);
        return res.render('homepage.ejs', { data: JSON.stringify(data) })
    } catch (e) {
        console.log(e)
    }

}

module.exports = {
    getHomePage,
}