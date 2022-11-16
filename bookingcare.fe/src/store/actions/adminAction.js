//src25
import actionTypes from './actionTypes';
import { userService } from '../../services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastMes = {
  toastSuccess: () => toast.success('Successfully requested'),
  toastError: (message) => toast.error(message, { autoClose: 5000 }),
};

export const postUserBookingFn = (newData) => {
  return async (dispatch) => {
    try {
      const data = await userService.postUserBookingServ(newData);

      if (data.errCode === 0) {
        toastMes.toastSuccess();
      } else {
        toastMes.toastError(data.message);
      }
      return data;
    } catch (error) {
      console.log('postUserBookingFn error - ', error);
    }
  };
};

// v92xx2
export const getDoctorIntroFn = (doctorId) => {
  return async (dispatch) => {
    try {
      const data = await userService.getDoctorIntroServ(doctorId);

      if (data.errCode === 0) {
        dispatch(getDoctorContentHtmlSuccess());
      } else {
        dispatch(getDoctorContentHtmlFailed());
        toastMes.toastError(data.message);
      }
      return data;
    } catch (error) {
      console.log('getDoctorContentHtmlFn error - ', error);
    }
  };
};

//v92xx1
export const getDoctorContentHtmlFn = (doctorId) => {
  return async (dispatch) => {
    try {
      const data = await userService.getDoctorContentHtmlServ(doctorId);

      if (data.errCode === 0) {
        dispatch(getDoctorContentHtmlSuccess());
      } else {
        dispatch(getDoctorContentHtmlFailed());
        toastMes.toastError(data.message);
      }
      return data;
    } catch (error) {
      console.log('getDoctorContentHtmlFn error - ', error);
    }
  };
};

// 3ms03ss
export const getDoctorExtraInfoFn = (doctorId) => {
  return async (dispatch) => {
    try {
      const result = await userService.getDoctorExtraInfoServ(doctorId);
      if (result.errCode === 0) {
        //success dispatch
      } else {
        toastMes.toastError(result.message);
      }
      return result;
    } catch (error) {
      console.log('fetchDoctorScheduleByIdFn error - ', error);
    }
  };
};

export const updateDoctorInfoFn = (updatedData) => {
  return async (dispatch) => {
    try {
      const data = await userService.updateDoctorInfoServ(updatedData);
      if (data.errCode === 0) {
        dispatch(updateDoctorInfoSuccess());
        toastMes.toastSuccess();
      } else {
        dispatch(updateDoctorInfoFailed());
        toastMes.toastError(data.message);
      }
      return data;
    } catch (error) {
      console.log('updateDoctorInfoFn error - ', error);
    }
  };
};

export const editDoctorInfoFn = (doctorId) => {
  return async (dispatch) => {
    try {
      const data = await userService.editDoctorInfoServ(doctorId);

      if (data.errCode === 0) {
        dispatch(editDoctorInfoSuccess(data.user));
      } else {
        dispatch(editDoctorInfoFailed());
        toastMes.toastError(data.message);
      }
      return data;
    } catch (error) {
      console.log('editDoctorInfoFn error - ', error);
    }
  };
};

export const fetchDoctorInfoAllcodeFn = () => {
  const priceList = [];
  const paymentList = [];
  const provinceList = [];

  return async (dispatch) => {
    try {
      const data = await userService.getUserAllCodeServ();
      if (data.errCode === 0) {
        data.allCodes.forEach((item) => {
          if (item.type === 'PRICE') {
            priceList.push(item);
          } else if (item.type === 'PAYMENT') {
            paymentList.push(item);
          } else if (item.type === 'PROVINCE') {
            provinceList.push(item);
          }
        });
        const payloadData = { priceList, paymentList, provinceList };
        dispatch(fetchDoctorInfoAllcodeSuccess(payloadData));
      } else {
        dispatch(fetchDoctorInfoAllcodeFailed());
        toastMes.toastError(data.message);
      }
      return data.errCode;
    } catch (error) {
      console.log('fetchDoctorInfoAllcodeFn error', error);
    }
  };
};

export const fetchDoctorScheduleByIdFn = (doctorId) => {
  return async (dispatch) => {
    try {
      const data = await userService.getDoctorScheduleByIdServ(doctorId);
      if (data.errCode === 0) {
        dispatch(fetchDoctorScheduleByIdSuccess());
      } else {
        dispatch(fetchDoctorScheduleByIdFailed());
        toastMes.toastError(data.message);
      }
      return data;
    } catch (error) {
      console.log('fetchDoctorScheduleByIdFn error - ', error);
    }
  };
};

export const uploadDoctorScheduleFn = (dataArr) => {
  return async (dispatch) => {
    try {
      const data = await userService.uploadDoctorScheduleServ(dataArr);
      if (data.errCode === 0) {
        dispatch(uploadDoctorScheduleSuccess());
        toastMes.toastSuccess();
      } else {
        dispatch(uploadDoctorScheduleFailed());
        toastMes.toastError(data.message);
      }
      return data;
    } catch (error) {
      console.log('fetchDoctorScheduleFn error - ', error);
    }
  };
};

export const fetchDoctorScheduleFn = () => {
  return async (dispatch) => {
    try {
      const data = await userService.fetchDoctorScheduleServ();
      if (data.errCode === 0) {
        dispatch(getDoctorScheduleSuccess(data.doctorSchedule));
      } else {
        dispatch(getDoctorScheduleFailed());
        toastMes.toastError(data.message);
      }
      return data;
    } catch (error) {
      console.log('fetchDoctorScheduleFn error - ', error);
    }
  };
};

export const editDoctorDetailsFn = (doctorId) => {
  return async (dispatch) => {
    try {
      const data = await userService.editDoctorDetailsServ(doctorId);
      if (data.errCode === 0) {
        dispatch(editingDoctorDetailssSuccess(data.user));
      } else {
        dispatch(editingDoctorDetailsFailed());
        toastMes.toastError(data.message);
      }
      return data;
    } catch (error) {
      console.log('editDoctorDetailsFn error - ', error);
    }
  };
};

export const updateDoctorDetailsFn = (updatedData) => {
  return async (dispatch) => {
    try {
      const data = await userService.updateDoctorDetailsServ(updatedData);
      if (data.errCode === 0) {
        dispatch(updateDoctorDetailsSuccess());
        toastMes.toastSuccess();
      } else {
        dispatch(updateDoctorDetailsFailed());
        toastMes.toastError(data.message);
      }
      return data;
    } catch (error) {
      console.log('getAllDoctorsFn error - ', error);
    }
  };
};

export const fetchAllDoctorsFn = () => {
  return async (dispatch) => {
    try {
      const data = await userService.getAllDoctorsServ();
      if (data.errCode === 0) {
        dispatch(getAllDoctorsSuccess(data.users));
      } else {
        dispatch(getAllDoctorsfailed());
      }
      return data;
    } catch (error) {
      console.log('getAllDoctorsFn error - ', error);
    }
  };
};

export const fetchTopDoctorHomeFn = (limit) => {
  return async (dispatch) => {
    try {
      const data = await userService.topDoctorHomeServ(limit);
      if (data.errCode === 0) {
        dispatch(topDoctorHomeSuccess(data.users));
      } else {
        dispatch(topDoctorHomefailed());
      }
      return data;
    } catch (error) {
      console.log('fetchTopDoctorHomeFn error - ', error);
    }
  };
};

export const updateAnUser = (newData) => {
  return async (dispatch) => {
    try {
      const data = await userService.updateUser(newData);
      if (data.errCode === 0) {
        dispatch(updateAnUserSuccess(newData));
        toastMes.toastSuccess();
      } else {
        dispatch(updateAnUserFailed());
        toastMes.toastError(data.message);
      }
      return data;
    } catch (error) {
      console.log('updateAnUser error - ', error);
    }
  };
};

export const delAnUser = (id) => {
  return async (dispatch) => {
    try {
      const data = await userService.deleteUser(id);
      if (data.errCode === 0) {
        dispatch(delAnUserSuccess(id));
        toastMes.toastSuccess();
      } else {
        dispatch(fetchUserListfailed());
        toastMes.toastError(data.message);
      }
      return data;
    } catch (error) {
      console.log('fetchUserList error - ', error);
    }
  };
};

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
        toastMes.toastSuccess();
      } else {
        toastMes.toastError(data.message);
        dispatch(createUserFailed());
      }
      return data;
    } catch (error) {
      console.log('createUserInfo error - ', error);
    }
  };
};

export const fetchUserAllcodeFn = () => {
  const genderList = [];
  const roleList = [];
  const posList = [];

  return async (dispatch) => {
    try {
      const data = await userService.getUserAllCodeServ();
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
      return dispatch(fetchUserAllcodesSuccess(payloadData));
    } catch (error) {
      fetchUserAllcodesFailed();
      console.log('fetchUserAllcodeFn error', error);
    }
  };
};

export const fetchUserAllcodesSuccess = (payload) => ({
  type: actionTypes.FETCH_GENDER_ROLE_POS_API_SUCCESSED,
  payload,
});

export const fetchUserAllcodesFailed = () => ({
  type: actionTypes.FETCH_GENDER_ROLE_POS_API_FAILED,
});

export const fetchDoctorInfoAllcodeSuccess = (payload) => ({
  type: actionTypes.FETCH_DOCTOR_INFO_ALLCODE_SUCCESSED,
  payload,
});

export const fetchDoctorInfoAllcodeFailed = () => ({
  type: actionTypes.FETCH_DOCTOR_INFO_ALLCODE_FAILED,
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

export const topDoctorHomeSuccess = (topDoctorList) => ({
  type: actionTypes.TOP_DOCTOR_HOME_SUCCESS,
  topDoctorList,
});

export const topDoctorHomefailed = () => ({
  type: actionTypes.TOP_DOCTOR_HOME_FAILED,
});

export const getAllDoctorsSuccess = (allDoctors) => ({
  type: actionTypes.GET_ALL_DOCTORS_SUCCESS,
  allDoctors,
});

export const getAllDoctorsfailed = () => ({
  type: actionTypes.GET_ALL_DOCTORS_FAILED,
});

export const updateDoctorDetailsSuccess = () => ({
  type: actionTypes.UPDATE_DOCTOR_DETAILS_SUCCESS,
});

export const updateDoctorDetailsFailed = () => ({
  type: actionTypes.UPDATE_DOCTOR_DETAILS_FAILED,
});

export const getDoctorContentHtmlSuccess = () => ({
  type: actionTypes.GET_DOCTOR_CONTENT_HTML_SUCCESS,
});

export const getDoctorContentHtmlFailed = () => ({
  type: actionTypes.GET_DOCTOR_CONTENT_HTML_FAILED,
});

export const editingDoctorDetailssSuccess = () => ({
  type: actionTypes.EDITING_DOCTOR_DETAIL_SUCCESS,
});

export const editingDoctorDetailsFailed = () => ({
  type: actionTypes.EDITING_DOCTOR_DETAIL_FAILED,
});

export const getDoctorScheduleSuccess = (doctorSchedule) => ({
  type: actionTypes.GETTING_DOCTOR_SCHEDULE_SUCCESS,
  doctorSchedule,
});

export const getDoctorScheduleFailed = () => ({
  type: actionTypes.GETTING_DOCTOR_SCHEDULE_FAILED,
});

export const uploadDoctorScheduleSuccess = () => ({
  type: actionTypes.UPLOAD_DOCTOR_SCHEDULE_SUCCESS,
});

export const uploadDoctorScheduleFailed = () => ({
  type: actionTypes.UPLOAD_DOCTOR_SCHEDULE_FAILED,
});

export const fetchDoctorScheduleByIdSuccess = () => ({
  type: actionTypes.FETCH_DOCTOR_SCHEDULE_BY_ID_SUCCESS,
});

export const fetchDoctorScheduleByIdFailed = () => ({
  type: actionTypes.FETCH_DOCTOR_SCHEDULE_BY_ID_FAILED,
});

export const editDoctorInfoSuccess = (doctorInfo) => ({
  type: actionTypes.EDITING_DOCTOR_INFO_SUCCESS,
  doctorInfo,
});

export const editDoctorInfoFailed = () => ({
  type: actionTypes.EDITING_DOCTOR_INFO_FAILED,
});

export const updateDoctorInfoSuccess = () => ({
  type: actionTypes.UPDATE_DOCTOR_INFO_SUCCESS,
});

export const updateDoctorInfoFailed = () => ({
  type: actionTypes.UPDATE_DOCTOR_INFO_FAILED,
});
