import db from '../models/index';
import * as apiSupplies from '../connectSupply/apiSupplies';

// 42ms30ss
export const getDoctorScheduleKeysServ = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = null;
      let doctorSchedule = await db.allcodes.findAll({
        where: { type: 'TIME' },
        attributes: ['keymap', 'valueEN', 'valueVI'],
      });

      if (doctorSchedule.length > 0) {
        result = {
          ...apiSupplies.errStates.noErrors,
          doctorSchedule,
        };
      } else {
        result = {
          ...apiSupplies.errStates.notFound,
          doctorSchedule: [],
        };
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const editDoctorDetailsServ = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = null;
      let user = await db.markdowns.findOne({
        where: { doctorId },
        attributes: ['contentHTML', 'contentMarkdown', 'description'],
      });

      if (user === null) {
        user = {
          contentHTML: '',
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

export const getDoctorDetailsByIdServ = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = null;
      const user = await db.users.findOne({
        where: { id },
        attributes: ['firstName', 'lastName', 'avatar'],
        include: [
          {
            model: db.markdowns,
            as: 'doctorDetails',
            attributes: ['contentHTML', 'contentMarkdown', 'description'],
          },
          {
            model: db.allcodes,
            as: 'positionData',
            attributes: ['valueEN', 'valueVI'],
          },
        ],
        raw: true,
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

export const postDoctorDetailsServ = (newData) => {
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

      if (isCreated[1] === false) {
        const isUpdated = await db.markdowns.update(
          { ...newData },
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
