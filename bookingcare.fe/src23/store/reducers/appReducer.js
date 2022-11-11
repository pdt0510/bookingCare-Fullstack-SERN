import actionTypes from '../actions/actionTypes';
import { routeLinks } from '../../connectSupplyFE/otherSupplies';

const initContentOfConfirmModal = {
  isOpen: false,
  messageId: '',
  handleFunc: null,
  dataFunc: null,
};

const initialState = {
  started: true,
  language: 'vi',
  systemMenuPath: routeLinks.userManagerLink,
  imgUrl: '',
  contentOfConfirmModal: {
    ...initContentOfConfirmModal,
  },
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APP_START_UP_COMPLETE:
      return {
        ...state,
        started: true,
      };

    case actionTypes.SET_CONTENT_OF_CONFIRM_MODAL:
      return {
        ...state,
        contentOfConfirmModal: {
          ...state.contentOfConfirmModal,
          ...action.contentOfConfirmModal,
        },
      };

    case actionTypes.CHANGE_LANGUAE:
      return {
        ...state,
        language: action.lang,
      };

    case actionTypes.SAVING_IMG_URL:
      return { ...state, imgUrl: action.imgUrl };

    case actionTypes.REMOVING_IMG_URL:
      return { ...state, imgUrl: '' };

    default:
      return state;
  }
};

export default appReducer;
