export const apiUrls = {
  apiUrl: '/api',
  idParamApi: '/:id',
  loginApi: '/login',
  userListedApi: '/user-listed',
  userCreatedApi: '/user-created',
  userDeletedApi: '/user-deleted',
  userUpdatedApi: '/user-updated',
  allCodeApi: '/allcode',
  topDoctorHomeApi: '/top-doctor-home',
  getAllDoctorsApi: '/all-doctors',
  updateDoctorDetailsApi: '/update-doctor-details',
  editDoctorDetailsByIdApi: '/edit-doctor-details',
  fetchDoctorScheduleApi: '/fetch-doctor-schedule',
  uploadDoctorScheduleApi: '/upload-doctor-schedule',
  getDoctorScheduleByIdApi: '/get-doctor-schedule',
  editDoctorInfoByIdApi: '/edit-doctor-info',
  updateDoctorInfoApi: '/update-doctor-info',
  getDoctorExtraInfoByIdApi: '/get-doctor-extra-info',
  getDoctorContentHtmlApi: '/get-doctor-contentHTML',
  getDoctorIntroApi: '/get-doctor-intro',
  createUserBookingApi: '/create-user-booking',
  verifyBookingByTokenApi: '/verify-booking-token',
  verifyEmailByTokenApi: '/verify-email-by-token',
};

export const errStates = {
  noErrors: {
    errCode: 0,
    status: 200, //OK
    message: 'Successfully requested',
  },
  fieldRequired: {
    errCode: 1,
    status: 400, //Bad Request
    message: 'Fields required',
  },
  notFound: {
    errCode: 2,
    status: 404, //Not Found
    message: 'Not Found!',
  },
  incorrectInfo: {
    errCode: 3,
    status: 406, // Not Acceptable
    idMes: 'Incorrect id',
    emailMes: 'Incorrect email',
    accMes: 'Your account is incorrect',
    passwordConfirmedMes: 'Incorrect password',
    isActived: 'Verified booking is actived already',
  },
  missingParams: {
    errCode: 4,
    status: 406, // Not Acceptable
    idMes: 'Missing required id',
  },
  notCreated: {
    errCode: 5,
    status: 501, //Not Implemented
    message: `It's not created`,
  },
  serverError: {
    errCode: -1,
    status: 500, //OK
    message: 'Internal Server Error',
  },
};
