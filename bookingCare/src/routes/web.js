import express from 'express';
import * as webSupplies from '../connectSupply/webSupplies';
import * as homeCtrl from '../controller/homeController';
import * as apiSupplies from '../connectSupply/apiSupplies';
import * as apiCtrl from '../controller/apiController';
import * as doctorCtrls from '../controller/doctorController';
import * as patientCtrls from './../controller/patientController';
import * as specialityCtrls from '../controller/specialityController';
import * as clinicCtrls from '../controller/clinicController';

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
    getDoctorPatientByIdApi,
    sendBillToPatientApi,
    createUserBookingApi,
    verifyEmailByTokenApi,
    createSpecialityApi,
    getAllSpecialitiesApi,
    getDoctorBySpecialityIdApi,
    createClinicApi,
    getAllClinicsApi,
    getClinicByIdApi,
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
    getDoctorPatientsByIdCtrl,
    sendBillToPatientCtrl,
  } = doctorCtrls;

  const { postUserBookingCtrl, verifyEmailByTokenCtrl } = patientCtrls;

  const {
    createSpecialityCtrl,
    getAllSpecialitiesCtrl,
    getDoctorBySpecialityIdCtrl,
  } = specialityCtrls;

  const { createClinicCtrl, getAllClinicsCtrl, getClinicByIdCtrl } =
    clinicCtrls;

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
  appRouters.get(apiUrl + getDoctorExtraInfoByIdApi, getDoctorExtraInfoCtrl);
  appRouters.get(apiUrl + getDoctorContentHtmlApi, getDoctorContentHtmlCtrl);
  appRouters.get(apiUrl + getDoctorIntroApi, getDoctorIntroCtrl);
  appRouters.post(apiUrl + createUserBookingApi, postUserBookingCtrl);
  appRouters.get(apiUrl + verifyEmailByTokenApi, verifyEmailByTokenCtrl);
  appRouters.post(apiUrl + createSpecialityApi, createSpecialityCtrl);
  appRouters.get(apiUrl + getAllSpecialitiesApi, getAllSpecialitiesCtrl);
  appRouters.get(
    apiUrl + getDoctorBySpecialityIdApi,
    getDoctorBySpecialityIdCtrl,
  );
  appRouters.get(apiUrl + getDoctorPatientByIdApi, getDoctorPatientsByIdCtrl); //v107xx2
  appRouters.patch(apiUrl + sendBillToPatientApi, sendBillToPatientCtrl); //36ms31ss

  appRouters.post(apiUrl + createClinicApi, createClinicCtrl); //17ms58ss
  appRouters.get(apiUrl + getAllClinicsApi, getAllClinicsCtrl); //2ms15ss
  appRouters.get(apiUrl + getClinicByIdApi, getClinicByIdCtrl); //2ms15ss

  return app.use(homeUrl, appRouters);
};

export default initWebRoutes;
