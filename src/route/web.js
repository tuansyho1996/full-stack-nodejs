import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";


let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCrudPage);
    router.post('/crud', homeController.postCrud);
    router.get('/display-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditUserCRUD);
    router.post('/put-edit-user', homeController.putEditUserCRUD);
    router.get('/delete-crud', homeController.getDeleteUserCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-user', userController.getUser)
    return app.use('/', router)
}

export default initWebRoutes;