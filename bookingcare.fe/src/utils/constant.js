export const path = {
  idParam: ':id',
  HOME: '/',
  LOGIN: '/login',
  LOG_OUT: '/logout',
  SYSTEM: '/system',
  HOMEPAGE: '/home',
  DOCTOR: '/doctor',
  doctorDetailPage: '/users/',
  VERIFY_EMAIL_BOOKING: '/verify-booking/token=:token/doctorId=:idDoctor', //4ms49ss
};

export const LANGUAGES = {
  VI: 'vi',
  EN: 'en',
};

export const manageActions = {
  ADD: 'ADD',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
};

export const dateFormat = {
  DMY: 'DD/MM/YYYY',
  dDM: 'dddd, DD/MM',
  weekdaysVI: `C.Nhật_Thứ 2_Thứ 3_Thứ 4_Thứ 5_Thứ 6_Thứ 7`.split('_'),
  weekdaysEN: `Sun_Mon_Tue_Wed_Thu_Fri_Sat`.split('_'),
};

export const YesNoObj = {
  YES: 'Y',
  NO: 'N',
};

export const USER_ROLES = {
  ADMIN: 'R1',
  DOCTOR: 'R2',
  PATIENT: 'R3',
};

export const CURRENCY = {
  dataType: 'PRICE',
  vnd: 'VNĐ',
  dollar: 'USD',
};

export const DOCTOR_DEFAULTS = {
  doctorDetail: {
    contentHTML: 'No content',
    contentMarkdown: 'No content',
    description: 'No description',
  },
  doctorInfo: {
    clinicName: '',
    clinicAddress: '',
    note: '',
    paymentId: 'PAY1',
    priceId: 'PRI1',
    provinceId: 'PRO1',
  },
};

export const ALLCODE_DEFAULTS = {
  PRIcol: 'PRI',
  PAYcol: 'PAY',
  PROcol: 'PRO',
};

export const DOCTORSCHEDULE_DEFAULTS = {
  today: 'Today',
  homNay: 'Hôm nay',
  fulltime: 'fulltime',
};
