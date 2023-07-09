import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import allcodeController from "../controllers/allcodeController";
import doctorController from "../controllers/doctorController";
import scheduleController from "../controllers/scheduleController";
import infoDoctorController from "../controllers/infoDoctorController"


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
    router.get('/api/get-user', userController.getUser);
    router.post('/api/create-new-user', userController.createNewUser);
    router.put('/api/edit-user', userController.editUser);
    router.delete('/api/delete-user', userController.deleteUser);

    router.get('/api/get-allcode', allcodeController.getAllcode);
    router.get('/api/get-top-doctor-homepage', doctorController.getTopDoctorHomepage);
    router.get('/api/get-doctor-select', doctorController.getDoctorSelect);
    router.get('/api/fetch-key-info-doctor-allcode-select', allcodeController.getAllcode);
    router.post('/api/create-doctor-markdown', doctorController.createDortorMarkdown);
    router.get('/api/fetch-a-user/:id', doctorController.getDetailDoctor);
    router.post('/api/bulk-create-schedule', scheduleController.bulkCreateSchedule);
    router.get('/api/fetch-schedule-doctor', scheduleController.fetchScheduleDoctor);
    router.post('/api/create-info-doctor', infoDoctorController.createInfoDoctor);


    return app.use('/', router)
}

export default initWebRoutes;