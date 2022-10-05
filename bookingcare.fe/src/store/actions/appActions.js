import actionTypes from './actionTypes';

export const savingPreviewUrl = (previewUrl) => ({
  type: actionTypes.SAVING_PREVIEW_URL,
  previewUrl,
});

export const removingPreviewUrl = () => ({
  type: actionTypes.REMOVING_PREVIEW_URL,
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
