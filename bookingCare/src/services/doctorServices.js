//src24
import db from '../models/index';
import * as apiSupplies from '../connectSupply/apiSupplies';
import _ from 'lodash';

//v87xx5
export const postDoctorInfoServ = (newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { notFound, noErrors, notCreated } = apiSupplies.errStates;
      let result = {
        ...noErrors,
      };

      // create
      const isCreated = await db.doctor_infors.findOrCreate({
        where: { doctorId: newData.doctorId },
        defaults: {
          ...newData,
        },
      });

      // update
      if (isCreated[1] === false) {
        const isUpdated = 1;
        const isUpdate = await db.doctor_infors.update(
          { ...newData },
          { where: { doctorId: newData.doctorId } },
        );

        if (isUpdate[0] !== isUpdated) {
          result = {
            ...notFound,
          };
        }
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

//42ms39ss
export const editDoctorInfoServ = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = {
        ...apiSupplies.errStates.noErrors,
      };

      let doctorInfo = await db.doctor_infors.findOne({
        where: { doctorId },
        attributes: { exclude: ['id', 'doctorId', 'createdAt', 'updatedAt'] },

        include: [
          {
            model: db.allcodes,
            as: 'priceData', // 42ms39ss
            attributes: ['valueEN', 'valueVI'],
          },
          {
            model: db.allcodes,
            as: 'provinceData', // 42ms39ss
            attributes: ['valueEN', 'valueVI'],
          },
          {
            model: db.allcodes,
            as: 'paymentData', // 42ms39ss
            attributes: ['valueEN', 'valueVI'],
          },
        ],
        raw: true,
        nest: true,
      });

      result = {
        ...apiSupplies.errStates.noErrors,
        doctorInfo,
      };

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getDoctorScheduleByIdServ = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = null;
      const { noErrors, notFound } = apiSupplies.errStates;

      const doctorSchedule = await db.schedules.findAll({
        where: { doctorId },
        attributes: ['date', 'timeType'],
        include: [
          {
            model: db.allcodes,
            as: 'timeTypeData',
            attributes: ['valueEN', 'valueVI'],
          },
        ],
        raw: true,
        nest: true,
      });

      if (doctorSchedule.length > 0) {
        result = {
          ...noErrors,
          doctorSchedule,
        };
      } else {
        result = {
          ...notFound,
          doctorSchedule: [],
        };
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

const getExistingDoctorSchedule = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.schedules.findAll({
        where: { doctorId },
        attributes: ['date', 'timeType'],
      });
      if (data.length === 0) {
        data = [];
      }
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const uploadDoctorScheduleServ = (schedule) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = null;
      const doctorId = schedule[0].doctorId;
      const existing = await getExistingDoctorSchedule(doctorId);

      const dataArrForBulk = _.differenceWith(schedule, existing, (a, b) => {
        return a.timeType === b.timeType && a.date === b.date;
      });

      if (dataArrForBulk && dataArrForBulk.length > 0) {
        const data = await db.schedules.bulkCreate(dataArrForBulk);
        if (data) {
          result = {
            ...apiSupplies.errStates.noErrors,
          };
        } else {
          result = {
            ...apiSupplies.errStates.notCreated,
          };
        }
      } else {
        result = {
          ...apiSupplies.errStates.noErrors,
        };
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

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

      result = {
        ...apiSupplies.errStates.noErrors,
        user: user ? user : null,
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
        attributes: ['firstName', 'lastName', 'avatar', 'address'],
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
          {
            model: db.doctor_infors,
            as: 'doctorInfo', //v89xx1
            attributes: {
              exclude: ['id', 'doctorId', 'createdAt', 'updatedAt'],
            },
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
      const { notFound, noErrors, notCreated } = apiSupplies.errStates;
      let result = {
        ...noErrors,
      };

      // create
      const isCreated = await db.markdowns.findOrCreate({
        where: { doctorId: newData.doctorId },
        defaults: {
          ...newData,
        },
      });

      // update
      if (isCreated[1] === false) {
        const isUpdated = 1;
        const isUpdate = await db.markdowns.update(
          { ...newData },
          { where: { doctorId: newData.doctorId } },
        );

        if (isUpdate[0] !== isUpdated) {
          result = {
            ...notFound,
          };
        }
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
