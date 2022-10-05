import bcrypt from 'bcryptjs';
import db from '../models/index';

const hashingPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      resolve(hashedPassword);
    } catch (error) {
      reject(error);
    }
  });
};

export const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    let hashedPassword = null;
    try {
      hashedPassword = await hashingPassword(data.password);
      await db.users.create({
        email: data.email,
        password: hashedPassword,
        firstName: data.firstname,
        lastName: data.lastname,
        gender: data.gender,
        address: data.address,
        phoneNumber: data.phoneNumber,
        roleId: data.roleId,
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const getUserList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataArr = await db.users.findAll({
        raw: false,
      });

      resolve(dataArr);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAnUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.users.findOne({
        where: { id },
        raw: true,
      });

      if (user) {
        resolve(user);
      }
      resolve(null);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateAnUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.users.update(
        {
          ...data,
          firstName: data.firstname,
          lastName: data.lastname,
        },
        {
          where: { id: data.id },
        },
      );

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteAnUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.users.destroy({ where: { id } });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
