import actionTypes from '../actions/actionTypes';

const initialState = {
  isLoggedIn: false,
  userInfo: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo, //v107xx1
      };

    case actionTypes.USER_LOGIN_FAIL:
      return { ...state };

    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export default userReducer;
