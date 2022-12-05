import db from '../models/index';
import * as apiSupplies from '../connectSupply/apiSupplies';
import { sendSimpleEmail } from './emailService';
import 'dotenv/config';

export const verifyEmailByTokenServ = (newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const confirmed = 'S2';
      const { doctorId, token } = newData;
      const { noErrors, notFound, incorrectInfo } = apiSupplies.errStates;
      let result = {
        ...notFound,
      };

      const user = await db.bookings.findOne({
        where: {
          doctorId: doctorId,
          token: token,
        },
      });

      if (user) {
        if (user.statusId === confirmed) {
          result = {
            errCode: incorrectInfo.errCode,
            status: incorrectInfo.status,
            message: incorrectInfo.confirmed,
          };
        } else {
          const newStatus = 'S1';
          const isUpdate = await db.bookings.update(
            { statusId: confirmed },
            {
              where: {
                doctorId: doctorId,
                statusId: newStatus,
                token: token,
              },
            },
          );

          if (isUpdate[0]) {
            result = {
              ...noErrors,
            };
          }
        }
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const postUserBookingServ = (newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { noErrors, incorrectInfo } = apiSupplies.errStates;
      let result = {
        errCode: incorrectInfo.errCode,
        status: incorrectInfo.status,
        message: incorrectInfo.emailMes,
      };

      const patientRole = 'R3';
      const newUser = {
        email: newData.email,
        firstName: newData.fullname,
        lastName: newData.fullname,
        gender: newData.gender,
        address: newData.address,
        phoneNumber: newData.phoneNumber,
        roleId: patientRole,
      };

      const isNewUser = await db.users.findOrCreate({
        where: { email: newUser.email },
        defaults: {
          ...newUser,
        },
      });

      const isCreated = true;
      const newStatus = 'S1';
      if (isNewUser[1] !== isCreated) {
        const newBooking = {
          doctorId: newData.doctorId,
          date: newData.date,
          timeType: newData.timeType,
          statusId: newStatus,
          patientId: 26,

          birthday: newData.birthday,
          token: newData.token,
        };

        const isNewBooking = await db.bookings.create({ ...newBooking });
        if (isNewBooking._options.isNewRecord === isCreated) {
          result = {
            ...noErrors,
          };

          const clientInfo = {
            clientEmail: newUser.email,
            clientSubject: `Booking for ${newData.fullname}`,
            htmlText: newData.emailContent,
          };

          sendSimpleEmail({ ...clientInfo });
        }
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
