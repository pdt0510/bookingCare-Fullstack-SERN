import actionTypes from './actionTypes';

export const userInfoSubmitted = (userInfo) => ({
  type: actionTypes.CREATE_USER_SUCCESS,
  userInfo,
});

export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});

export const userLoginSuccess = (userInfo) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  userInfo,
});

export const userLoginFail = () => ({
  type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

export const activeMenu = () => ({
  type: actionTypes.ACTIVE_MENU,
});
