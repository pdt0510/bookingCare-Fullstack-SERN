//src16
import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
  isOpen: false,
  messageId: '',
  handleFunc: null,
  dataFunc: null,
};

const initialState = {
  started: true,
  language: 'vi',
  systemMenuPath: '/system/user-manage',
  previewImgUrl: '',
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

    // v68xx1
    case actionTypes.SAVING_PREVIEW_URL:
      return { ...state, previewImgUrl: action.previewUrl };

    //v68xx1
    case actionTypes.REMOVING_PREVIEW_URL:
      return { ...state, previewImgUrl: '' };

    default:
      return state;
  }
};

export default appReducer;