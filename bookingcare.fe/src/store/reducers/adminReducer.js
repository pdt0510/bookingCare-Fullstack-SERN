import actionTypes from '../actions/actionTypes';

const initialState = {
  genderList: [],
  roleList: [],
  posList: [],
  userList: [],
  isLoading: false,
};

//src17,
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

    case actionTypes.FETCH_USER_LIST_SUCCESS: // 14ms24ss
      return {
        ...state,
        // userList: action.userList,
        userList: action.userList.reverse(), //48ms27ss
        isLoading: false,
      };

    case actionTypes.FETCH_USER_LIST_FAILED: // 14ms24ss
      return {
        ...state,
        userList: [],
        isLoading: false,
      };

    case actionTypes.UPDATE_USER_LIST_REDUX: //32ms12ss
      return {
        ...state,
        userList: action.newList,
        isLoading: false,
      };

    case actionTypes.DEL_USER_SUCCESS: //58ms08ss
      const { id } = action; //v70xx3
      return {
        ...state,
        userList: state.userList.filter((item) => item.id !== id),
      };

    case actionTypes.UPDATE_USER_SUCCESS: //v70xx2
      const { id: idNewData } = action.newData; //v70xx3

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
