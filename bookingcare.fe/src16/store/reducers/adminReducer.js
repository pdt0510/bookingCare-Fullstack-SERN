import actionTypes from '../actions/actionTypes';

const initialState = {
  genderList: [],
  roleList: [],
  posList: [],
  isLoading: false,
  message: '',
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCHING_API:
      return {
        ...state,
        isLoading: true,
        message: '',
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

    case actionTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        message: action.message,
      };

    case actionTypes.CREATE_USER_FAILED:
      return {
        ...state,
        message: action.message,
      };

    default:
      return state;
  }
};

export default adminReducer;
