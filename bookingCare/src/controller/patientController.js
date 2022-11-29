import * as patientServ from '../services/patientServices';
import * as apiSupplies from '../connectSupply/apiSupplies';

export const verifyEmailByTokenCtrl = async (req, res) => {
  let isEmpty = false;
  let data = null;

  const newData = {
    ...req.query,
    doctorId: +req.query.doctorId,
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
      data = await patientServ.verifyEmailByTokenServ(newData);
    } catch (error) {
      data = apiSupplies.errStates.serverError;
      console.log('verifyEmailByTokenCtrl error ---', error);
    }
  }
  return res.status(data.status).json(data);
};

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
      data = await patientServ.postUserBookingServ(newData);
    } catch (error) {
      data = apiSupplies.errStates.serverError;
      console.log('postUserBookingCtrl error ---', error);
    }
  }
  return res.status(data.status).json(data);
};
