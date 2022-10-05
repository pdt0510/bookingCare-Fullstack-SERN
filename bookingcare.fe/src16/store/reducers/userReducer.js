import actionTypes from '../actions/actionTypes';

const initialState = {
  isLoggedIn: false,
  userInfo: null,
};

//src16
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };

    case actionTypes.USER_LOGIN_FAIL:
      return { ...state };

    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };

    case actionTypes.CREATE_USER_SUCCESS: //43ms02ss
      return {
        ...state,
        userInfo: action.userInfo,
      };

    default:
      return state;
  }
};

export default userReducer;
