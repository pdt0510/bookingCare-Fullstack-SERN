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
  getDoctorDetailsByIdApi: '/get-doctor-details',
  editDoctorDetailsByIdApi: '/edit-doctor-details',
  fetchDoctorScheduleApi: '/fetch-doctor-schedule',
  uploadDoctorScheduleApi: '/upload-doctor-schedule',
  getDoctorScheduleByIdApi: '/get-doctor-schedule',
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
  },
  missingParams: {
    errCode: 4,
    status: 406, // Not Acceptable
    idMes: 'Missing required id',
  },
  notCreated: {
    errCode: 5,
    status: 501, //Not Implemented
    emailMes: 'Email is already existed',
  },
  serverError: {
    errCode: -1,
    status: 500, //OK
    message: 'Internal Server Error',
  },
};
