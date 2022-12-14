const actionTypes = Object.freeze({
  PROCESS_LOGOUT: 'PROCESS_LOGOUT',

  //app
  APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
  SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
  CHANGE_LANGUAE: 'CHANGE_LANGUAE',
  SAVING_IMG_URL: 'SAVING_IMG_URL',
  REMOVING_IMG_URL: 'REMOVING_IMG_URL',

  //user,
  ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
  USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
  ACTIVE_MENU: 'ACTIVE_MENU',
  TOP_DOCTOR_HOME_SUCCESS: 'TOP_DOCTOR_HOME_SUCCESS',
  TOP_DOCTOR_HOME_FAILED: 'TOP_DOCTOR_HOME_FAILED',

  //admin
  FETCHING_API: 'FETCHING_API',
  FETCH_GENDER_ROLE_POS_API_SUCCESSED: 'FETCH_GENDER_ROLE_POS_API_SUCCESSED',
  FETCH_GENDER_ROLE_POS_API_FAILED: 'FETCH_GENDER_ROLE_POS_API_FAILED',

  FETCH_DOCTOR_INFO_ALLCODE_SUCCESSED: 'FETCH_DOCTOR_INFO_ALLCODE_SUCCESSED',
  FETCH_DOCTOR_INFO_ALLCODE_FAILED: 'FETCH_DOCTOR_INFO_ALLCODE_FAILED',

  CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
  CREATE_USER_FAILED: 'CREATE_USER_FAILED',

  FETCH_USER_LIST_SUCCESS: 'FETCH_USER_LIST_SUCCESS',
  FETCH_USER_LIST_FAILED: 'FETCH_USER_LIST_FAILED',
  USER_LIST_REDUX: 'USER_LIST_REDUX',
  UPDATE_USER_LIST_REDUX: 'UPDATE_USER_LIST_REDUX',

  DEL_USER_SUCCESS: 'DEL_USER_SUCCESS',
  DEL_USER_FAILED: 'DEL_USER_FAILED',

  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILED: 'UPDATE_USER_FAILED',

  GET_ALL_DOCTORS_SUCCESS: 'GET_ALL_DOCTORS_SUCCESS',
  GET_ALL_DOCTORS_FAILED: 'GET_ALL_DOCTORS_FAILED',

  UPDATE_DOCTOR_DETAILS_SUCCESS: 'UPDATE_DOCTOR_DETAILS_SUCCESS',
  UPDATE_DOCTOR_DETAILS_FAILED: 'UPDATE_DOCTOR_DETAILS_FAILED',

  UPDATE_DOCTOR_INFO_SUCCESS: 'UPDATE_DOCTOR_INFO_SUCCESS',
  UPDATE_DOCTOR_INFO_FAILED: 'UPDATE_DOCTOR_INFO_FAILED',

  GET_DOCTOR_CONTENT_HTML_SUCCESS: 'GET_DOCTOR_CONTENT_HTML_SUCCESS',
  GET_DOCTOR_CONTENT_HTML_FAILED: 'GET_DOCTOR_CONTENT_HTML_FAILED',

  EDITING_DOCTOR_DETAIL_SUCCESS: 'EDITING_DOCTOR_DETAIL_SUCCESS',
  EDITING_DOCTOR_DETAIL_FAILED: 'EDITING_DOCTOR_DETAIL_FAILED',

  EDITING_DOCTOR_INFO_SUCCESS: 'EDITING_DOCTOR_INFO_SUCCESS',
  EDITING_DOCTOR_INFO_FAILED: 'EDITING_DOCTOR_INFO_FAILED',

  GETTING_DOCTOR_SCHEDULE_SUCCESS: 'GETTING_DOCTOR_SCHEDULE_SUCCESS',
  GETTING_DOCTOR_SCHEDULE_FAILED: 'GETTING_DOCTOR_SCHEDULE_FAILED',

  UPLOAD_DOCTOR_SCHEDULE_SUCCESS: 'UPLOAD_DOCTOR_SCHEDULE_SUCCESS',
  UPLOAD_DOCTOR_SCHEDULE_FAILED: 'UPLOAD_DOCTOR_SCHEDULE_FAILED',

  FETCH_DOCTOR_SCHEDULE_BY_ID_SUCCESS: 'FETCH_DOCTOR_SCHEDULE_BY_ID_SUCCESS',
  FETCH_DOCTOR_SCHEDULE_BY_ID_FAILED: 'FETCH_DOCTOR_SCHEDULE_BY_ID_FAILED',
});

export default actionTypes;
