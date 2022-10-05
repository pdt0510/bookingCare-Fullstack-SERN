import express from 'express';
import * as webSupplies from '../connectSupply/webSupplies';
import * as homeController from '../controller/homeController';
import * as apiSupplies from '../connectSupply/apiSupplies';
import * as apiController from '../controller/apiController';

const appRouters = express.Router();
const initWebRoutes = (app) => {
  //web
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
  } = homeController;

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
  } = apiSupplies.apiUrls;

  const {
    loginFn,
    userListFn,
    userCreatedFn,
    userUpdatedFn,
    userDeletedFn,
    allcodeFn,
  } = apiController;

  appRouters.post(apiUrl + loginApi, loginFn);
  appRouters.get(apiUrl + userListedApi, userListFn);
  appRouters.post(apiUrl + userCreatedApi, userCreatedFn);
  appRouters.delete(apiUrl + userDeletedApi, userDeletedFn);
  appRouters.patch(apiUrl + userUpdatedApi, userUpdatedFn);
  appRouters.get(apiUrl + allCodeApi, allcodeFn);
  return app.use(homeUrl, appRouters);
};

export default initWebRoutes;
