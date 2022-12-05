import {
  adminMenuLangs,
  doctorLangs,
  routeLinks,
} from '../../connectSupplyFE/otherSupplies';

const {
  userManagerLink,
  userReduxLink,
  doctorManagerLink,
  userAdminLink,
  clinicManagerLink,
  specialityManagerLink,
  handbookManagerLink,
  doctorScheduleManagerLink,
  doctorPatientManagerLink,
} = routeLinks;

const {
  userManagerL,
  crudL,
  crudReduxL,
  doctorManagerL,
  adminManagerL,
  clinicL,
  clinicManagerL,
  specialityL,
  specialityManagerL,
  handbookL,
  handbookManagerL,
} = adminMenuLangs;

const { doctorScheduleL, patientManagerL } = doctorLangs;

export const adminMenuL = [
  {
    name: userManagerL,
    menus: [
      {
        name: crudL,
        link: userManagerLink,
      },
      {
        name: crudReduxL,
        link: userReduxLink,
      },
      {
        name: doctorManagerL,
        link: doctorManagerLink,
      },
      {
        name: adminManagerL,
        link: userAdminLink,
      },
      {
        name: doctorScheduleL,
        link: doctorScheduleManagerLink,
      },
    ],
  },

  {
    name: clinicL,
    menus: [
      {
        name: clinicManagerL,
        link: clinicManagerLink,
      },
    ],
  },

  {
    name: specialityL,
    menus: [
      {
        name: specialityManagerL,
        link: specialityManagerLink,
      },
    ],
  },

  {
    name: handbookL,
    menus: [
      {
        name: handbookManagerL,
        link: handbookManagerLink,
      },
    ],
  },
];

export const doctorMenuL = [
  {
    name: userManagerL,
    menus: [
      {
        name: doctorScheduleL,
        link: doctorScheduleManagerLink,
      },
      {
        name: patientManagerL, //v107xx1
        link: doctorPatientManagerLink,
      },
    ],
  },
];
