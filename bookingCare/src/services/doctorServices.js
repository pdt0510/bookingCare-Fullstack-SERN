//src21
import db from '../models/index';
import moment from 'moment';
import * as apiSupplies from '../connectSupply/apiSupplies';

// 6ms25ss
export const editDoctorDetailServ = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = null;
      let user = await db.markdowns.findOne({
        where: { doctorId },
        attributes: ['contentHTML', 'contentMarkdown', 'description'], //v79xx1
      });

      if (user === null) {
        user = {
          contentHTML: '', //v79xx1
          contentMarkdown: '',
          description: '',
        };
      }

      result = {
        ...apiSupplies.errStates.noErrors,
        user,
      };

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getDoctorInfoByIdServ = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = null;
      const user = await db.users.findOne({
        where: { id },
        attributes: ['firstName', 'lastName', 'avatar'],
        include: [
          {
            model: db.markdowns,
            as: 'doctorInfo',
            attributes: ['contentHTML', 'contentMarkdown', 'description'],
          },
          {
            model: db.allcodes,
            as: 'positionData',
            attributes: ['valueEN', 'valueVI'],
          },
        ],
        raw: true, //50ms01ss
        nest: true,
      });

      if (user) {
        const { noErrors } = apiSupplies.errStates;
        result = {
          ...noErrors,
          user,
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

export const postDoctorInfoServ = (newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = null;
      const { notFound, noErrors, notCreated } = apiSupplies.errStates;
      const isCreated = await db.markdowns.findOrCreate({
        where: { doctorId: newData.doctorId },
        defaults: {
          ...newData, //29ms05ss
        },
      });

      if (isCreated[1] === false) {
        const isUpdated = await db.markdowns.update(
          { ...newData }, //29ms05ss
          { where: { doctorId: newData.doctorId } },
        );

        if (isUpdated[0] === 1) {
          result = {
            ...noErrors,
          };
        } else {
          result = {
            ...notFound,
          };
        }
      } else {
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
