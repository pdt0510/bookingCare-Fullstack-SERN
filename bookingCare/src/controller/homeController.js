import * as webSupplies from '../connectSupply/webSupplies';
import * as CRUD from '../services/CRUDServices';
import db from '../models/index';

let isUpdated = false;
let isPosted = false;
let isDeleted = false;

export const getHomePage = async (req, res) => {
  try {
    const data = await db.users.findAll();
    const { homePage } = webSupplies.filesPath;
    return res.render(homePage, {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log('error at getHomePage: ', error);
  }
};

export const getCRUD = async (req, res) => {
  try {
    const data = await db.users.findAll();
    const { userFormPage } = webSupplies.filesPath;
    const { userPostedUrl } = webSupplies.urls;

    return res.render(userFormPage, {
      data,
      userPostedUrl,
    });
  } catch (error) {
    console.log('error at getCRUD: ', error);
  }
};

export const postCRUD = async (req, res) => {
  const { userListedUrl } = webSupplies.urls;
  await CRUD.createNewUser(req.body);
  isPosted = true;
  return res.redirect(userListedUrl);
};

export const userList = async (req, res) => {
  const { userListPage } = webSupplies.filesPath;
  const { userEditedUrl, userDeletedUrl } = webSupplies.urls;
  const data = await CRUD.getUserList();

  res.render(userListPage, {
    data,
    userDeletedUrl,
    userEditedUrl,
    isPosted,
    isDeleted,
    isUpdated,
  });

  isUpdated = false;
  isPosted = false;
  isDeleted = false;
  return res.end();
};

export const editUser = async (req, res) => {
  const id = req.params.id;
  const { userEditPage } = webSupplies.filesPath;
  const { userListedUrl, userUpdatedUrl } = webSupplies.urls;

  const user = await CRUD.getAnUser(id);
  if (user) {
    return res.render(userEditPage, { user, userListedUrl, userUpdatedUrl });
  }
  return res.send('<h1>Not Found!<h1>');
};

export const updateUser = async (req, res) => {
  const { userListedUrl } = webSupplies.urls;
  const newBody = {
    id: req.params.id,
    ...req.body,
  };

  isUpdated = true;
  await CRUD.updateAnUser(newBody);
  return res.redirect(userListedUrl);
};

export const delUser = async (req, res) => {
  const id = req.params.id;
  if (id) {
    const { userListedUrl } = webSupplies.urls;
    await CRUD.deleteAnUser(id);
    isDeleted = true;
    return res.redirect(userListedUrl);
  }
  return res.send('Not Found!');
};
