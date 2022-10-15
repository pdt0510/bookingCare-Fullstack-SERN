import express from 'express';
import * as webSupplies from '../connectSupply/webSupplies';
import * as homeCtrl from '../controller/homeController';
import * as apiSupplies from '../connectSupply/apiSupplies';
import * as apiCtrl from '../controller/apiController';
import * as doctorCtrls from '../controller/doctorController';

const appRouters = express.Router();
const initWebRoutes = (app) => {
  // web server
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

  // api
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
    updateDoctorInfoApi,
    getDoctorInfoByIdApi,
  } = apiSupplies.apiUrls;

  const {
    loginFn,
    userListFn,
    userCreatedFn,
    userUpdatedFn,
    userDeletedFn,
    allcodeFn,
  } = apiCtrl;

  const {
    topDoctorHomeCtrl,
    getAllDoctorsCtrl,
    postDoctorInfoCtrl,
    getDoctorInfoByIdCtrl,
  } = doctorCtrls;

  appRouters.post(apiUrl + loginApi, loginFn);
  appRouters.get(apiUrl + userListedApi, userListFn);
  appRouters.post(apiUrl + userCreatedApi, userCreatedFn);
  appRouters.delete(apiUrl + userDeletedApi, userDeletedFn);
  appRouters.patch(apiUrl + userUpdatedApi, userUpdatedFn);
  appRouters.get(apiUrl + allCodeApi, allcodeFn);
  appRouters.get(apiUrl + topDoctorHomeApi, topDoctorHomeCtrl);
  appRouters.get(apiUrl + getAllDoctorsApi, getAllDoctorsCtrl); //3ms15ss
  appRouters.post(apiUrl + updateDoctorInfoApi, postDoctorInfoCtrl); //31ms55ss
  appRouters.get(apiUrl + getDoctorInfoByIdApi, getDoctorInfoByIdCtrl); //36ms18ss
  return app.use(homeUrl, appRouters);
};

export default initWebRoutes;
