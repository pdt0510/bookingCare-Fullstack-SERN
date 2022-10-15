import { routeLinks } from '../../connectSupplyFE/otherSupplies';

const {
  userManagerLink,
  userReduxLink,
  doctorManagerLink,
  userAdminLink,
  clinicManagerLink,
  specialityManagerLink,
  handbookManagerLink,
} = routeLinks;

export const adminMenu = [
  //quan ly user
  {
    name: 'menu.admin.user-manager',
    menus: [
      {
        name: 'menu.admin.crud',
        link: userManagerLink,
      },
      {
        name: 'menu.admin.crud-redux',
        link: userReduxLink,
      },
      {
        name: 'menu.admin.doctor-manager',
        link: doctorManagerLink,
      },
      {
        name: 'menu.admin.admin-manager',
        link: userAdminLink,
      },
    ],
  },

  //quan ly phong kham,
  {
    name: 'menu.admin.clinic',
    menus: [
      {
        name: 'menu.admin.clinic-manager',
        link: clinicManagerLink,
      },
    ],
  },

  //chuyen khoa,
  {
    name: 'menu.admin.speciality',
    menus: [
      {
        name: 'menu.admin.speciality-manager',
        link: specialityManagerLink,
      },
    ],
  },

  //cam nang,
  {
    name: 'menu.admin.handbook',
    menus: [
      {
        name: 'menu.admin.handbook-manager',
        link: handbookManagerLink,
      },
    ],
  },
];
