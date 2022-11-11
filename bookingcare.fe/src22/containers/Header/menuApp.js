//src22
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

const { doctorScheduleL } = doctorLangs;

export const adminMenu = [
  //quan ly user
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
        name: doctorScheduleL, //quan ly ke hoach kham benh, 3ms06ss
        link: doctorScheduleManagerLink,
      },
    ],
  },

  //quan ly phong kham,
  {
    name: clinicL,
    menus: [
      {
        name: clinicManagerL,
        link: clinicManagerLink,
      },
    ],
  },

  //chuyen khoa,
  {
    name: specialityL,
    menus: [
      {
        name: specialityManagerL,
        link: specialityManagerLink,
      },
    ],
  },

  //cam nang,
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

export const doctorMenu = [
  {
    name: userManagerL,
    menus: [
      {
        name: doctorScheduleL, //quan ly ke hoach kham benh, 3ms06ss
        link: doctorScheduleManagerLink,
      },
    ],
  },
];
