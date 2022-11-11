import express from 'express';
import * as webSupplies from '../connectSupply/webSupplies';
import * as homeCtrl from '../controller/homeController';
import * as apiSupplies from '../connectSupply/apiSupplies';
import * as apiCtrl from '../controller/apiController';
import * as doctorCtrls from '../controller/doctorController';

const appRouters = express.Router();
const initWebRoutes = (app) => {
  const {
    idParam,
    homeUrl,
    userFormUrl,
    userPostedUrl,
    userListedUrl,
    userEditedUrl,
    userUpdatedUrl,
    userDeletedUrl,
  } = webSupplies.urls;

  const {
    getHomePage,
    getCRUD,
    postCRUD,
    userList,
    editUser,
    updateUser,
    delUser,
  } = homeCtrl;

  appRouters.get(homeUrl, getHomePage);
  appRouters.get(userFormUrl, getCRUD);
  appRouters.post(userPostedUrl, postCRUD);
  appRouters.get(userListedUrl, userList);
  appRouters.get(`${userEditedUrl}/${idParam}`, editUser);
  appRouters.post(`${userUpdatedUrl}/${idParam}`, updateUser);
  appRouters.get(`${userDeletedUrl}/${idParam}`, delUser);

  const {
    apiUrl,
    loginApi,
    userListedApi,
    userCreatedApi,
    userUpdatedApi,
    userDeletedApi,
    allCodeApi,
    topDoctorHomeApi,
    getAllDoctorsApi,
    updateDoctorDetailsApi,
    getDoctorDetailsByIdApi,
    editDoctorDetailsByIdApi,
    getDoctorScheduleApi,
  } = apiSupplies.apiUrls;

  const {
    loginFn,
    userListFn,
    userCreatedFn,
    userUpdatedFn,
    userDeletedFn,
    getUserAllcodeFn,
  } = apiCtrl;

  const {
    topDoctorHomeCtrl,
    getAllDoctorsCtrl,
    postDoctorInfoCtrl,
    getDoctorDetailsByIdCtrl,
    editDoctorDetailCtrl,
    getDoctorScheduleKeysCtrl,
  } = doctorCtrls;

  appRouters.post(apiUrl + loginApi, loginFn);
  appRouters.get(apiUrl + userListedApi, userListFn);
  appRouters.post(apiUrl + userCreatedApi, userCreatedFn);
  appRouters.delete(apiUrl + userDeletedApi, userDeletedFn);
  appRouters.patch(apiUrl + userUpdatedApi, userUpdatedFn);
  appRouters.get(apiUrl + allCodeApi, getUserAllcodeFn);
  appRouters.get(apiUrl + topDoctorHomeApi, topDoctorHomeCtrl);
  appRouters.get(apiUrl + getAllDoctorsApi, getAllDoctorsCtrl);
  appRouters.post(apiUrl + updateDoctorDetailsApi, postDoctorInfoCtrl);
  appRouters.get(apiUrl + getDoctorDetailsByIdApi, getDoctorDetailsByIdCtrl);
  appRouters.get(apiUrl + editDoctorDetailsByIdApi, editDoctorDetailCtrl);
  appRouters.get(apiUrl + getDoctorScheduleApi, getDoctorScheduleKeysCtrl); // 42ms30ss

  return app.use(homeUrl, appRouters);
};

export default initWebRoutes;
