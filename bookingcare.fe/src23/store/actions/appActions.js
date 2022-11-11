import actionTypes from './actionTypes';

export const savingImgUrl = (imgUrl) => ({
  type: actionTypes.SAVING_IMG_URL,
  imgUrl,
});

export const removingImgUrl = () => ({
  type: actionTypes.REMOVING_IMG_URL,
});

export const appStartUpComplete = () => ({
  type: actionTypes.APP_START_UP_COMPLETE,
});

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
  type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
  contentOfConfirmModal: contentOfConfirmModal,
});

export const changeLangsApp = (lang) => ({
  type: actionTypes.CHANGE_LANGUAE,
  lang,
});
