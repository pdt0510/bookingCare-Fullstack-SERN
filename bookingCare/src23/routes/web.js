import express from 'express';
import * as webSupplies from '../connectSupply/webSupplies';
import * as homeCtrl from '../controller/homeController';
import * as apiSupplies from '../connectSupply/apiSupplies';
import * as apiCtrl from '../controller/apiController';
import * as doctorCtrls from '../controller/doctorController';

//src23
const appRouters = express.Router();
const initWebRoutes = (app) => {
  //BE web
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

  //BE api
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
    uploadDoctorScheduleApi,
    getDoctorScheduleByIdApi,
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
    uploadDoctorScheduleCtrl,
    getDoctorScheduleByIdCtrl,
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
  appRouters.get(apiUrl + getDoctorScheduleApi, getDoctorScheduleKeysCtrl);
  appRouters.post(apiUrl + uploadDoctorScheduleApi, uploadDoctorScheduleCtrl); //v83xx1
  appRouters.get(apiUrl + getDoctorScheduleByIdApi, getDoctorScheduleByIdCtrl); //v84xx4

  return app.use(homeUrl, appRouters);
};

export default initWebRoutes;
