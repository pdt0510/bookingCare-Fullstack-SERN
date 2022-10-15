// src20
import db from '../models/index';
import moment from 'moment';
import * as apiSupplies from '../connectSupply/apiSupplies';

//36ms18ss
export const getDoctorInfoByIdServ = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = null;
      const user = await db.users.findOne({
        where: { id },
        attributes: ['firstName', 'lastName', 'avatar'],

        //users jointing to markdowns table
        include: [
          {
            model: db.markdowns,
            as: 'doctorInfo',
            attributes: ['contentHTML', 'contentMarkdown', 'description'],
          },
          {
            model: db.allcodes, //58ms08ss
            as: 'positionData',
            attributes: ['valueEN', 'valueVI'],
          },
        ],
        raw: true,
        nest: true, //55ms16ss
      });

      if (user) {
        const { noErrors } = apiSupplies.errStates;
        result = {
          ...noErrors,
          users: user,
        };
      } else {
        const { notFound } = apiSupplies.errStates;
        result = notFound;
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

//31ms55ss
export const postDoctorInfoServ = (newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = null;
      const { notFound, noErrors, notCreated } = apiSupplies.errStates;
      const isCreated = await db.markdowns.findOrCreate({
        where: { doctorId: newData.doctorId },
        defaults: {
          ...newData,
        },
      });

      // false: existed
      if (isCreated[1] === false) {
        const isUpdated = await db.markdowns.update(
          { ...newData },
          { where: { doctorId: newData.doctorId } },
        );

        if (isUpdated[0] === 1) {
          result = {
            ...noErrors, //update successfully
          };
        } else {
          result = {
            ...notFound,
          };
        }
      } else {
        result = {
          ...noErrors, //create successfully
        };
      }
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

//3ms15ss
export const getAllDoctorsServ = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = null;
      const { notFound, noErrors } = apiSupplies.errStates;
      const users = await db.users.findAll({
        attributes: ['id', 'firstName', 'lastName'],
        where: { roleId: 'R2' },
      });

      if (users.length > 0) {
        result = {
          ...noErrors,
          users,
        };
      } else {
        result = notFound;
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const topDoctorHomeServ = (limitedInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = null;
      const { notFound, noErrors } = apiSupplies.errStates;
      const users = await db.users.findAll({
        limit: limitedInput,
        order: [['createdAt', 'DESC']],
        where: { roleId: 'R2' },
        attributes: { exclude: ['password'] },
        include: [
          {
            model: db.allcodes,
            as: 'positionData',
            attributes: ['valueEN', 'valueVI'],
          },
          {
            model: db.allcodes,
            as: 'genderData',
            attributes: ['valueEN', 'valueVI'],
          },
        ],
        raw: true,
        nest: true,
      });

      if (users.length > 0) {
        result = {
          ...noErrors,
          users,
        };
      } else {
        result = notFound;
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
