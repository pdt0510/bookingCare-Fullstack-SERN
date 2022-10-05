//src17,
import actionTypes from './actionTypes';
import { userService } from '../../services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// v70xx2
export const updateAnUser = (newData) => {
  return async (dispatch) => {
    try {
      const data = await userService.updateUser(newData);
      if (data.errCode === 0) {
        dispatch(updateAnUserSuccess(newData));
        toast.success('Successfully updated');
      } else {
        dispatch(updateAnUserFailed());
        toast.error(data.message, { autoClose: 5000 }); //57ms07ss
      }
      return data;
    } catch (error) {
      console.log('updateAnUser error - ', error);
    }
  };
};

// 58ms08ss
export const delAnUser = (id) => {
  return async (dispatch) => {
    try {
      const data = await userService.deleteUser(id);
      if (data.errCode === 0) {
        dispatch(delAnUserSuccess(id));
        toast.success('Successfully deleted');
      } else {
        dispatch(fetchUserListfailed());
        toast.error(data.message, { autoClose: 5000 }); //57ms07ss
      }
      return data;
    } catch (error) {
      console.log('fetchUserList error - ', error);
    }
  };
};

// 14ms24ss
export const fetchUserList = () => {
  return async (dispatch) => {
    try {
      const data = await userService.userList();
      if (data.errCode === 0) {
        dispatch(fetchUserListSuccess(data.users));
      } else dispatch(fetchUserListfailed());
      return data;
    } catch (error) {
      console.log('fetchUserList error - ', error);
    }
  };
};

export const createUserInfo = (newUser) => {
  return async (dispatch) => {
    try {
      const data = await userService.createNewUser(newUser);
      if (data.errCode === 0) {
        dispatch(createUserSuccess());
        toast.success('Successfully created'); //50ms51ss
      } else {
        toast.error(data.message, { autoClose: 5000 }); //57ms07ss
        dispatch(createUserFailed());
      }
      return data;
    } catch (error) {
      // toast.error('Failed created'); //50ms51ss
      toast.error('Failed created', { autoClose: 5000 }); //57ms07ss
      console.log('createUserInfo error - ', error);
    }
  };
};

export const fetchAttrsOfAllcodeApi = () => {
  const genderList = [];
  const roleList = [];
  const posList = [];

  return async (dispatch) => {
    try {
      const data = await userService.allCodeUser();
      if (data.errCode === 0) {
        data.allCodes.forEach((item) => {
          if (item.type === 'GENDER') {
            genderList.push(item);
          } else if (item.type === 'ROLE') {
            roleList.push(item);
          } else if (item.type === 'POSITION') {
            posList.push(item);
          }
        });
      }

      const payloadData = { genderList, roleList, posList };
      return dispatch(fetchGenderApiSuccessed(payloadData));
    } catch (error) {
      fetchGenderApiFailed();
      console.log('fetchAttrsOfAllcodeApi error', error);
    }
  };
};

export const fetchGenderApiSuccessed = (payload) => ({
  type: actionTypes.FETCH_GENDER_ROLE_POS_API_SUCCESSED,
  payload,
});

export const fetchGenderApiFailed = () => ({
  type: actionTypes.FETCH_GENDER_ROLE_POS_API_FAILED,
});

export const isLoadingFromFetch = () => ({
  type: actionTypes.FETCHING_API,
});

export const createUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const createUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchUserListSuccess = (userList) => ({
  type: actionTypes.FETCH_USER_LIST_SUCCESS,
  userList,
});

export const fetchUserListfailed = () => ({
  type: actionTypes.FETCH_USER_LIST_FAILED,
});

// 32ms12ss
export const updateUserListRedux = (newList) => ({
  type: actionTypes.UPDATE_USER_LIST_REDUX,
  newList,
});

export const delAnUserSuccess = (id) => ({
  type: actionTypes.DEL_USER_SUCCESS,
  id,
});

export const delUserListFailed = () => ({
  type: actionTypes.DEL_USER_FAILED,
});

export const updateAnUserSuccess = (newData) => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
  newData,
});

export const updateAnUserFailed = () => ({
  type: actionTypes.UPDATE_USER_FAILED,
});
