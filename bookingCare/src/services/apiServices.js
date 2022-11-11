import * as apiSupplies from '../connectSupply/apiSupplies';
import db from '../models/index';
import bcrypt from 'bcryptjs';
import moment from 'moment';

const checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.users.findOne({
        where: { email },
      });

      if (user) {
        resolve(true);
      }
      resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};

const checkUserPassword = (dbPassword, clientPassword) => {
  return new Promise((resolve, reject) => {
    try {
      const isChecked = bcrypt.compareSync(clientPassword, dbPassword);
      resolve(isChecked);
    } catch (error) {
      reject(error);
    }
  });
};

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

export const getUserAllCodeServ = (typeVal, keymapVal) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      let allCodes = null;
      const { noErrors, notFound } = apiSupplies.errStates;

      if (typeVal === 'ALL' && keymapVal === 'ALL') {
        allCodes = await db.allcodes.findAll({
          attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        });
      } else if (typeVal && keymapVal === '') {
        allCodes = await db.allcodes.findAll({
          where: { type: typeVal },
        });
      } else {
        allCodes = await db.allcodes.findAll({
          where: { type: typeVal, keymap: keymapVal },
        });
      }

      if (allCodes.length) {
        data = {
          ...noErrors,
          allCodes,
        };
      } else {
        data = {
          ...notFound,
          allCodes: [],
        };
      }
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const userDeletedApi = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { notFound, noErrors } = apiSupplies.errStates;
      let data = notFound;

      const isSuccess = await db.users.destroy({ where: { id } });
      if (isSuccess) {
        data = noErrors;
      }

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const userUpdatedApi = (clientData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { noErrors, notFound } = apiSupplies.errStates;
      let data = { ...notFound, user: {} };
      const isUpdated = await db.users
        .update({ ...clientData }, { where: { id: clientData.id } })
        .then((res) => {
          const isSuccessed = 1;
          return res[0] === isSuccessed ? true : false;
        });

      if (isUpdated) {
        const user = await db.users.findOne({
          where: { id: clientData.id },
          attributes: { exclude: ['password'] },
        });
        data = {
          ...noErrors,
          user,
        };
      }

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const userCreatedApi = (clientData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { noErrors, notCreated } = apiSupplies.errStates;
      let now = null;
      let data = {
        errCode: notCreated.errCode,
        status: notCreated.status,
        message: notCreated.emailMes,
        user: {},
      };

      const isExisted = await checkUserEmail(clientData.email);
      if (!isExisted) {
        const hashedPassword = await hashingPassword(clientData.password);
        const anNewUser = await db.users
          .findOrCreate({
            where: { email: clientData.email },
            attributes: { exclude: ['passwordConfirmed'] },

            defaults: {
              ...clientData,
              password: hashedPassword,
            },
          })
          .then((res) => {
            const [userData, isNewUser] = res;
            if (isNewUser) {
              now = moment().format('YYYY-MM-DD HH:mm:ss');
              return userData.get({ plain: true });
            } else {
              return false;
            }
          });

        if (anNewUser) {
          data = {
            ...noErrors,
            user: {
              ...anNewUser,
              password: undefined,
              createdAt: now,
              updatedAt: now,
            },
          };
        }
      }

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const userListApi = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      let users = null;
      const { noErrors, notFound } = apiSupplies.errStates;

      if (userId === 'ALL') {
        users = await db.users.findAll({
          attributes: { exclude: ['password'] },
        });
      } else {
        users = await db.users.findAll({
          where: { userId },
          attributes: { exclude: ['password'] },
        });
      }

      if (users) {
        data = {
          ...noErrors,
          users,
        };
      } else {
        data = {
          ...notFound,
          users: [],
        };
      }
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { noErrors, incorrectInfo } = apiSupplies.errStates;
      const isExist = await checkUserEmail(email);
      let data = {
        errCode: incorrectInfo.errCode,
        message: incorrectInfo.accMes,
        status: incorrectInfo.status,
        user: {},
      };

      if (isExist) {
        const userDb = await db.users.findOne({
          where: { email },
          attributes: ['email', 'password', 'roleId', 'firstName'],
        });

        if (userDb) {
          const isPassword = await checkUserPassword(userDb.password, password);

          if (isPassword) {
            data = {
              ...noErrors,
              user: {
                ...userDb,
                password: undefined,
              },
            };
          }
        }
      }
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
