import actionTypes from '../actions/actionTypes';

const initialState = {
  genderList: [],
  roleList: [],
  posList: [],
  userList: [],
  isLoading: false,
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

    default:
      return state;
  }
};

export default adminReducer;
