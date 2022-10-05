import actionTypes from './actionTypes';
import { userService } from '../../services';

//src16, 45ms42ss
export const createUserInfo = (newUser) => {
  return async (dispatch) => {
    try {
      const data = await userService.createNewUser(newUser); //48ms18ss
      const { message } = data;

      if (data.errCode === 0) {
        return dispatch(createUserSuccess(message));
      }
      return dispatch(createUserFailed(message));
    } catch (error) {
      fetchGenderApiFailed();
      console.log('fetchAttrsOfAllcodeApi error', error);
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

export const createUserSuccess = (message) => ({
  type: actionTypes.CREATE_USER_SUCCESS,
  message,
});

export const createUserFailed = (message) => ({
  type: actionTypes.CREATE_USER_FAILED,
  message,
});
