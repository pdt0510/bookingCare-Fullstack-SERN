//src25
import * as patientServ from '../services/patientServices';
import * as apiSupplies from '../connectSupply/apiSupplies';

// 30ms20ss
export const postUserBookingCtrl = async (req, res) => {
  let isEmpty = false;
  let data = null;

  const newData = {
    ...req.body,
    doctorId: +req.body.doctorId,
  };

  for (const key in newData) {
    if (newData[key] === '') {
      isEmpty = true;
      break;
    }
  }

  if (typeof newData.doctorId !== 'number' || isEmpty === true) {
    data = apiSupplies.errStates.fieldRequired;
  } else {
    try {
      console.log('newData ------', newData);
      data = await patientServ.postUserBookingServ(newData);
    } catch (error) {
      data = apiSupplies.errStates.serverError;
      console.log('postUserBookingCtrl error ---', error);
    }
  }
  return res.status(data.status).json(data);
};
