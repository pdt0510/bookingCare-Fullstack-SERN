//src25
import db from '../models/index';
import * as apiSupplies from '../connectSupply/apiSupplies';
import _ from 'lodash';

//30ms20ss
export const postUserBookingServ = (newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isCreated = true;
      const { noErrors, notCreated } = apiSupplies.errStates;

      let result = {
        ...notCreated,
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

      //1. tạo acc sơ bộ
      const isNewUser = await db.users.findOrCreate({
        where: { email: newUser.email },
        defaults: {
          ...newUser,
        },
      });

      // 2. post to bookings db
      if (isNewUser[1] === isCreated) {
        const newBooking = {
          doctorId: newData.doctorId,
          date: newData.date,
          timeType: newData.timeType,
          statusId: 'S1',
          patientId: isNewUser[0].dataValues.id,
          birthday: newData.birthday,
        };
        console.log('newBooking ---', newBooking);

        const isNewBooking = await db.bookings.create({ ...newBooking });
        if (isNewBooking._options.isNewRecord === isCreated) {
          result = {
            ...noErrors,
          };
        }
      }
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
