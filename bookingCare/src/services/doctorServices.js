//src28
import db from '../models/index';
import * as apiSupplies from '../connectSupply/apiSupplies';
import _ from 'lodash';
import { sendEmailWithAttachment } from './emailService';

export const sendBillToPatientEmailServ = (emailData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { noErrors } = apiSupplies.errStates;
      let result = noErrors;
      await sendEmailWithAttachment(emailData); //57ms44ss

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

// 36ms31ss
export const sendBillToPatientServ = (info) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { noErrors, notFound } = apiSupplies.errStates;
      let result = { ...notFound };
      const isDone = 'S3';
      const confirmed = 'S2';
      const { id, doctorId, patientId } = info;

      const user = await db.bookings.findOne({
        where: {
          id,
          doctorId,
          patientId,
          statusId: confirmed,
        },
      });

      if (user) {
        const update = await db.bookings.update(
          { statusId: isDone },
          {
            where: {
              id: info.id,
              patientId: info.patientId,
              statusId: confirmed,
            },
          },
        );

        const isUpdate = 1;
        if (update[0] === isUpdate) {
          const emailData = {
            clientEmail: info.email,
            clientSubject: `Bill to ${info.email}`,
            htmlText: `Hello! ${info.email}`,
            attachments: [
              {
                filename: `bill of ${info.email}.jpeg`,
                path: info.img, //v109xx3
              },
            ],
          };

          sendBillToPatientEmailServ(emailData); //57ms44ss
          result = noErrors;
        }
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

// v107xx2
export const getDoctorPatientsByIdServ = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { noErrors, notFound } = apiSupplies.errStates;
      let result = { ...notFound };
      const confirmed = 'S2';

      const records = await db.users.findAll({
        where: { id: doctorId }, //doctor info
        attributes: ['id', 'email', 'firstName', 'lastName'], //36ms31ss

        include: [
          {
            model: db.bookings,
            as: 'bookingData', //doctor + patient info
            attributes: [
              'id', //36ms31ss
              'patientId', //36ms31ss
              'date',
              'birthday',
              //'timeType', //for 'timeTypeBookedData'
              //'patientId', //for 'patientInfoData'
            ],
            where: { statusId: confirmed }, //v107xx3

            include: [
              {
                model: db.users,
                as: 'patientInfoData', // v108xx2
                attributes: [
                  'email',
                  'firstName',
                  'lastName',
                  'address',
                  'phoneNumber',
                  // 'gender', //for genderData
                ],

                include: [
                  {
                    model: db.allcodes,
                    as: 'genderData', // v108xx3
                    attributes: ['valueEN', 'valueVI'],
                  },
                ],
                raw: true,
                nest: true,
              },
              {
                model: db.allcodes,
                as: 'timeTypeBookedData', // v108xx4
                attributes: ['valueEN', 'valueVI'],
              },
            ],
            raw: true,
            nest: true,
          },
        ],
        raw: true,
        nest: true,
      });

      if (records && records.length > 0) {
        const doctor = {
          id: records[0].id, //36ms31ss
          email: records[0].email,
          firstName: records[0].firstName,
          lastName: records[0].lastName,
        };

        const patientList = records.map((item) => {
          return item.bookingData;
        });

        if (patientList && patientList.length > 0) {
        }

        result = {
          ...noErrors,
          doctor,
          patientList,
        };
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getDoctorIntroServ = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = null;
      const { noErrors, notFound } = apiSupplies.errStates;

      const user = await db.users.findOne({
        where: { id: doctorId },
        attributes: ['firstName', 'lastName', 'avatar'],
        include: [
          {
            model: db.markdowns,
            as: 'doctorMarkdown',
            attributes: ['description'],
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

      result = user ? { ...noErrors, user } : { ...notFound, user: null };
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getDoctorContentHtmlServ = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = null;
      const { noErrors, notFound } = apiSupplies.errStates;

      const user = await db.markdowns.findOne({
        where: { doctorId },
        attributes: ['contentHTML'],
      });

      result = user ? { ...noErrors, user } : { ...notFound, user: null };
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getDoctorExtraInfoServ = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = null;
      const { noErrors, notFound } = apiSupplies.errStates;

      const data = await db.doctor_infors.findOne({
        where: { doctorId },
        attributes: ['priceId', 'clinicAddress', 'clinicName', 'note'],
      });

      if (data) {
        result = {
          ...noErrors,
          data,
        };
      } else {
        result = {
          ...notFound,
          data: null,
        };
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateDoctorInfoServ = (newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { notFound, noErrors, notCreated } = apiSupplies.errStates;
      let result = {
        ...noErrors,
      };

      const isCreated = await db.doctor_infors.findOrCreate({
        where: { doctorId: newData.doctorId },
        defaults: {
          ...newData,
        },
      });

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
            as: 'priceData',
            attributes: ['valueEN', 'valueVI'],
          },
          {
            model: db.allcodes,
            as: 'provinceData',
            attributes: ['valueEN', 'valueVI'],
          },
          {
            model: db.allcodes,
            as: 'paymentData',
            attributes: ['valueEN', 'valueVI'],
          },
          {
            model: db.specialities,
            as: 'specialityData',
            attributes: ['id', 'name'],
          },
          {
            model: db.clinics,
            as: 'clinicData', //v106xx1
            attributes: ['id', 'name'],
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

export const postDoctorDetailsServ = (newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { notFound, noErrors, notCreated } = apiSupplies.errStates;
      let result = {
        ...noErrors,
      };

      const isCreated = await db.markdowns.findOrCreate({
        where: { doctorId: newData.doctorId },
        defaults: {
          ...newData,
        },
      });

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
