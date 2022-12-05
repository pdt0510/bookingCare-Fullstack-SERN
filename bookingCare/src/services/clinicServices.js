import db from '../models/index';
import * as apiSupplies from '../connectSupply/apiSupplies';

// 2ms15ss
export const getClinicByIdServ = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { noErrors, notFound } = apiSupplies.errStates;
      let result = { ...notFound };

      const records = await db.clinics.findOne({
        where: { id },
        attributes: ['name', 'address', 'image', 'htmlDesc'],
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

// 2ms15ss
export const getAllClinicsServ = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { noErrors, serverError } = apiSupplies.errStates;
      let result = { ...serverError };

      const records = await db.clinics.findAll({
        attributes: ['id', 'name', 'image'],
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

//17ms58ss
export const createClinicServ = (newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { noErrors, notCreated } = apiSupplies.errStates;
      let result = {
        ...notCreated,
      };

      const isCreate = await db.clinics.create({
        ...newData,
      });

      const isCreated = true;
      if (isCreate._options.isNewRecord === isCreated) {
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
