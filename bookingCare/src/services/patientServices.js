//src26
import db from '../models/index';
import * as apiSupplies from '../connectSupply/apiSupplies';
import sendSimpleEmail from './emailService';
import 'dotenv/config'; //12ms12ss

export const verifyEmailByTokenServ = (newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isActived = 'S2';
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
        if (user.statusId === isActived) {
          result = {
            errCode: incorrectInfo.errCode,
            status: incorrectInfo.status,
            message: incorrectInfo.isActived,
          };
        } else {
          const isUpdate = await db.bookings.update(
            { statusId: isActived }, //confirmed
            {
              where: {
                doctorId: doctorId,
                statusId: 'S1',
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

      const newUser = {
        email: newData.email,
        firstName: newData.fullname,
        lastName: newData.fullname,
        gender: newData.gender,
        address: newData.address,
        phoneNumber: newData.phoneNumber,
        roleId: 'R3',
      };

      const isNewUser = await db.users.findOrCreate({
        where: { email: newUser.email },
        defaults: {
          ...newUser,
        },
      });

      const isCreated = true;
      if (isNewUser[1] !== isCreated) {
        const newBooking = {
          doctorId: newData.doctorId,
          date: newData.date,
          timeType: newData.timeType,
          statusId: 'S1', //allCodes
          patientId: 26, //tintuc271@gmail...
          // patientId: isNewUser[0].dataValues.id,
          birthday: newData.birthday,
          token: newData.token, //v97xx1
        };

        const isNewBooking = await db.bookings.create({ ...newBooking });
        if (isNewBooking._options.isNewRecord === isCreated) {
          result = {
            ...noErrors,
          };

          const clientInfo = {
            clientEmail: newUser.email,
            clientSubject: `Booking for ${newData.fullname}`,
            htmlText: newData.emailContent, // 26ms50ss
          };

          sendSimpleEmail({ ...clientInfo }); //v95xx2
          // await mailServ.sendSimpleEmail({ ...clientInfo });
        }
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
