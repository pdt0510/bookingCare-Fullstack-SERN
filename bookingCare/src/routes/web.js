import express from 'express';
import * as webSupplies from '../connectSupply/webSupplies';
import * as homeCtrl from '../controller/homeController';
import * as apiSupplies from '../connectSupply/apiSupplies';
import * as apiCtrl from '../controller/apiController';
import * as doctorCtrls from '../controller/doctorController';
import * as patientCtrls from './../controller/patientController';

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
    editDoctorDetailsByIdApi,
    getDoctorScheduleApi,
    uploadDoctorScheduleApi,
    getDoctorScheduleByIdApi,
    editDoctorInfoByIdApi,
    updateDoctorInfoApi,
    getDoctorExtraInfoByIdApi,
    getDoctorContentHtmlApi,
    getDoctorIntroApi,
    createUserBookingApi,
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
    postDoctorDetailsCtrl,
    editDoctorDetailCtrl,
    getDoctorScheduleKeysCtrl,
    uploadDoctorScheduleCtrl,
    getDoctorScheduleByIdCtrl,
    editDoctorInfoCtrl,
    postDoctorInfoCtrl,
    getDoctorExtraInfoCtrl,
    getDoctorContentHtmlCtrl,
    getDoctorIntroCtrl,
  } = doctorCtrls;

  const { postUserBookingCtrl } = patientCtrls;

  appRouters.post(apiUrl + loginApi, loginFn);
  appRouters.get(apiUrl + userListedApi, userListFn);
  appRouters.post(apiUrl + userCreatedApi, userCreatedFn);
  appRouters.delete(apiUrl + userDeletedApi, userDeletedFn);
  appRouters.patch(apiUrl + userUpdatedApi, userUpdatedFn);
  appRouters.get(apiUrl + allCodeApi, getUserAllcodeFn);
  appRouters.get(apiUrl + topDoctorHomeApi, topDoctorHomeCtrl);
  appRouters.get(apiUrl + getAllDoctorsApi, getAllDoctorsCtrl);
  appRouters.post(apiUrl + updateDoctorDetailsApi, postDoctorDetailsCtrl);
  appRouters.get(apiUrl + editDoctorDetailsByIdApi, editDoctorDetailCtrl);
  appRouters.get(apiUrl + getDoctorScheduleApi, getDoctorScheduleKeysCtrl);
  appRouters.post(apiUrl + uploadDoctorScheduleApi, uploadDoctorScheduleCtrl);
  appRouters.get(apiUrl + getDoctorScheduleByIdApi, getDoctorScheduleByIdCtrl);
  appRouters.get(apiUrl + editDoctorInfoByIdApi, editDoctorInfoCtrl);
  appRouters.post(apiUrl + updateDoctorInfoApi, postDoctorInfoCtrl);
  appRouters.get(apiUrl + getDoctorExtraInfoByIdApi, getDoctorExtraInfoCtrl); //3ms03ss

  appRouters.get(apiUrl + getDoctorContentHtmlApi, getDoctorContentHtmlCtrl); //v92xx1

  appRouters.get(apiUrl + getDoctorIntroApi, getDoctorIntroCtrl); //v92xx2

  appRouters.post(apiUrl + createUserBookingApi, postUserBookingCtrl); //30ms20ss

  return app.use(homeUrl, appRouters);
};

export default initWebRoutes;
