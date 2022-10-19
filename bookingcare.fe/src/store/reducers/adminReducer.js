import actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  genderList: [],
  roleList: [],
  posList: [],
  userList: [],
  topDoctorList: [],
  allDoctors: [],
  doctorInfo: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCHING_API:
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.FETCH_GENDER_ROLE_POS_API_SUCCESSED:
      const { genderList, roleList, posList } = action.payload;
      return {
        ...state,
        genderList,
        roleList,
        posList,
        isLoading: false,
      };

    case actionTypes.FETCH_GENDER_ROLE_POS_API_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.FETCH_USER_LIST_SUCCESS:
      return {
        ...state,

        userList: action.userList.reverse(),
        isLoading: false,
      };

    case actionTypes.FETCH_USER_LIST_FAILED:
      return {
        ...state,
        userList: [],
        isLoading: false,
      };

    case actionTypes.UPDATE_USER_LIST_REDUX:
      return {
        ...state,
        userList: action.newList,
        isLoading: false,
      };

    case actionTypes.DEL_USER_SUCCESS:
      const { id } = action;
      return {
        ...state,
        userList: state.userList.filter((item) => item.id !== id),
      };

    case actionTypes.UPDATE_USER_SUCCESS:
      const { id: idNewData } = action.newData;

      const newList = state.userList.map((item) => {
        if (item.id === idNewData) {
          item = { ...action.newData };
        }
        return item;
      });

      return {
        ...state,
        userList: newList,
        isLoading: false,
      };

    case actionTypes.TOP_DOCTOR_HOME_SUCCESS:
      return {
        ...state,
        topDoctorList: action.topDoctorList,
        isLoading: false,
      };

    case actionTypes.TOP_DOCTOR_HOME_FAILED:
      return {
        ...state,
        topDoctorList: [],
        isLoading: false,
      };

    case actionTypes.GET_ALL_DOCTORS_SUCCESS:
      return {
        ...state,
        allDoctors: action.allDoctors,
        isLoading: false,
      };

    case actionTypes.GET_ALL_DOCTORS_FAILED:
      return {
        ...state,
        allDoctors: [],
        isLoading: false,
      };

    case actionTypes.UPDATE_DOCTOR_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.UPDATE_DOCTOR_INFO_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    case actionTypes.FETCH_DOCTOR_INFO_BY_ID_SUCCESS: //42ms59ss
      return {
        ...state,
        doctorInfo: action.doctorInfo,
        isLoading: false,
      };

    case actionTypes.FETCH_DOCTOR_INFO_BY_ID_FAILED: //42ms59ss
      return {
        ...state,
        doctorInfo: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default adminReducer;
