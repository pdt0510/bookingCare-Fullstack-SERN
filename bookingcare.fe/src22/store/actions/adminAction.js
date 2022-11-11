import actionTypes from './actionTypes';
import { userService } from '../../services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//src22
const toastMes = {
  toastSuccess: () => toast.success('Successfully requested'),
  toastError: (message) => toast.error(message, { autoClose: 5000 }),
};

//42ms30ss
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

export const loadingDoctorInfoFn = (doctorId) => {
  return async (dispatch) => {
    try {
      const data = await userService.getDoctorDetailsByIdServ(doctorId);
      if (data.errCode === 0) {
        dispatch(fetchDoctorInfoByIdSuccess(data.user));
      } else {
        dispatch(fetchDoctorInfoByIdFailed());
        toastMes.toastError(data.message);
      }
      return data;
    } catch (error) {
      console.log('loadingDoctorInfoFn error - ', error);
    }
  };
};

export const fetchDoctorDetailByIdFn = (doctorId) => {
  return async (dispatch) => {
    try {
      const data = await userService.getDoctorDetailsByIdServ(doctorId);
      if (data.errCode === 0) {
        dispatch(fetchDoctorInfoByIdSuccess(data.user));
      } else {
        dispatch(fetchDoctorInfoByIdFailed());
        toastMes.toastError(data.message);
      }
      return data;
    } catch (error) {
      console.log('getAllDoctorsFn error - ', error);
    }
  };
};

export const updateDoctorDetailsFn = (updatedData) => {
  return async (dispatch) => {
    try {
      const data = await userService.updateDoctorDetailsServ(updatedData);
      if (data.errCode === 0) {
        dispatch(updateDoctorInfoSuccess());
        toastMes.toastSuccess();
      } else {
        dispatch(updateDoctorInfoFailed());
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

export const updateDoctorInfoSuccess = () => ({
  type: actionTypes.UPDATE_DOCTOR_DETAILS_SUCCESS,
});

export const updateDoctorInfoFailed = () => ({
  type: actionTypes.UPDATE_DOCTOR_DETAILS_FAILED,
});

export const fetchDoctorInfoByIdSuccess = (doctorDetails) => ({
  type: actionTypes.FETCH_DOCTOR_DETAILS_BY_ID_SUCCESS,
  doctorDetails,
});

export const fetchDoctorInfoByIdFailed = () => ({
  type: actionTypes.FETCH_DOCTOR_DETAILS_BY_ID_FAILED,
});

export const editingDoctorDetailssSuccess = () => ({
  type: actionTypes.EDITING_DOCTOR_DETAIL_SUCCESS,
});

export const editingDoctorDetailsFailed = () => ({
  type: actionTypes.EDITING_DOCTOR_DETAIL_FAILED,
});

export const getDoctorScheduleSuccess = (doctorSchedule) => ({
  type: actionTypes.GETTING_DOCTOR_SCHEDULE_SUCCESS,
  doctorSchedule
});

export const getDoctorScheduleFailed = () => ({
  type: actionTypes.GETTING_DOCTOR_SCHEDULE_FAILED,
});
