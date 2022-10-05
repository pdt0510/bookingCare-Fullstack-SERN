const actionTypes = Object.freeze({
  PROCESS_LOGOUT: 'PROCESS_LOGOUT',

  //app
  APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
  SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
  CHANGE_LANGUAE: 'CHANGE_LANGUAE',
  SAVING_PREVIEW_URL: 'SAVING_PREVIEW_URL',
  REMOVING_PREVIEW_URL: 'REMOVING_PREVIEW_URL',

  //user,
  ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
  USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
  ACTIVE_MENU: 'ACTIVE_MENU',

  //admin
  FETCHING_API: 'FETCHING_API',
  FETCH_GENDER_ROLE_POS_API_SUCCESSED: 'FETCH_GENDER_ROLE_POS_API_SUCCESSED',
  FETCH_GENDER_ROLE_POS_API_FAILED: 'FETCH_GENDER_ROLE_POS_API_FAILED',

  CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS', //43ms02ss
  CREATE_USER_FAILED: 'CREATE_USER_FAILED', 
});

export default actionTypes;
