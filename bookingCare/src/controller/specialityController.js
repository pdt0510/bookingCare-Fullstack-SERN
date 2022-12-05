import * as specialityServ from '../services/specialityServices';
import * as apiSupplies from '../connectSupply/apiSupplies';

export const getDoctorBySpecialityIdCtrl = async (req, res) => {
  const { serverError, incorrectInfo } = apiSupplies.errStates;
  const id = +req.query.id;
  let data = null;

  if (id && typeof id === 'number') {
    try {
      data = await specialityServ.getDoctorBySpecialityIdServ(id);
    } catch (error) {
      data = serverError;
      console.log('getDoctorBySpecialityIdCtrl error ---', error);
    }
  } else {
    data = {
      errCode: incorrectInfo.errCode,
      status: incorrectInfo.status,
      message: incorrectInfo.idMes,
    };
  }

  return res.status(data.status).json(data);
};

export const getAllSpecialitiesCtrl = async (req, res) => {
  let data = null;
  try {
    data = await specialityServ.getAllSpecialitiesServ();
  } catch (error) {
    data = apiSupplies.errStates.serverError;
    console.log('getAllSpecialitiesCtrl error ---', error);
  }

  return res.status(data.status).json(data);
};

export const createSpecialityCtrl = async (req, res) => {
  let isEmpty = false;
  let data = null;
  const newData = req.body;

  for (const key in newData) {
    if (newData[key] === '') {
      isEmpty = true;
      break;
    }
  }

  if (isEmpty === true) {
    data = apiSupplies.errStates.fieldRequired;
  } else {
    try {
      data = await specialityServ.createSpecialityServ(newData);
    } catch (error) {
      data = apiSupplies.errStates.serverError;
      console.log('createSpecialityCtrl error ---', error);
    }
  }
  return res.status(data.status).json(data);
};
