import { routeLinks } from '../../connectSupplyFE/otherSupplies';

const {
  userManageLink,
  userReduxLink,
  userDoctorLink,
  userAdminLink,
  userClinicLink,
  userSpecialityLink,
  userHandbookLink,
} = routeLinks;

export const adminMenu = [
  //quan ly user
  {
    name: 'menu.admin.user-manager',
    menus: [
      {
        name: 'menu.admin.crud',
        link: userManageLink,
      },
      {
        name: 'menu.admin.crud-redux',
        link: userReduxLink,
      },
      {
        name: 'menu.admin.doctor-manager',
        link: userDoctorLink,
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
        link: userClinicLink,
      },
    ],
  },

  //chuyen khoa,
  {
    name: 'menu.admin.speciality',
    menus: [
      {
        name: 'menu.admin.speciality-manager',
        link: userSpecialityLink,
      },
    ],
  },

  //cam nang,
  {
    name: 'menu.admin.handbook',
    menus: [
      {
        name: 'menu.admin.handbook-manager',
        link: userHandbookLink,
      },
    ],
  },
];
