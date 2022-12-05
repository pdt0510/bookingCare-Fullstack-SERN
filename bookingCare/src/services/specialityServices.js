import db from '../models/index';
import * as apiSupplies from '../connectSupply/apiSupplies';

export const getDoctorBySpecialityIdServ = (id, provinceId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { noErrors, notFound } = apiSupplies.errStates;
      let result = { ...notFound };

      const records = await db.specialities.findAll({
        where: { id },
        attributes: ['image', 'htmlDesc'],

        include: [
          {
            model: db.doctor_infors,
            as: 'specialityData',
            attributes: ['doctorId', 'provinceId'],
          },
        ],
        raw: true,
        nest: true,
      });

      if (records) {
        result = {
          ...noErrors,
          records,
        };
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllSpecialitiesServ = (newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { noErrors, serverError } = apiSupplies.errStates;
      let result = { ...serverError };

      const users = await db.specialities.findAll({
        attributes: { exclude: ['textDesc', 'createdAt', 'updatedAt'] },
      });
      if (users) {
        result = {
          ...noErrors,
          users,
        };
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const createSpecialityServ = (newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { noErrors, notCreated } = apiSupplies.errStates;
      let result = {
        ...notCreated,
      };

      const isCreate = await db.specialities.findOrCreate({
        where: { name: newData.name },
        defaults: {
          ...newData,
        },
      });

      const isCreated = true;
      if (isCreate[1] === isCreated) {
        result = {
          ...noErrors,
        };
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
