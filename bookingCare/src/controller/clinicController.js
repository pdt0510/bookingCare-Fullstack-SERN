//src28
import * as clinicServ from '../services/clinicServices';
import * as apiSupplies from '../connectSupply/apiSupplies';

// 2ms15ss
export const getClinicByIdCtrl = async (req, res) => {
  const { serverError, incorrectInfo } = apiSupplies.errStates;
  const id = +req.query.id;
  let data = null;

  if (id && typeof id === 'number') {
    try {
      data = await clinicServ.getClinicByIdServ(id);
    } catch (error) {
      data = serverError;
      console.log('getClinicByIdCtrl error ---', error);
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

// 2ms15ss
export const getAllClinicsCtrl = async (req, res) => {
  let data = null;

  try {
    data = await clinicServ.getAllClinicsServ();
  } catch (error) {
    data = apiSupplies.errStates.serverError;
    console.log('getAllClinicsCtrl error ---', error);
  }

  return res.status(data.status).json(data);
};

//17ms58ss
export const createClinicCtrl = async (req, res) => {
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
      data = await clinicServ.createClinicServ(newData);
    } catch (error) {
      data = apiSupplies.errStates.serverError;
      console.log('createClinicCtrl error ---', error);
    }
  }
  return res.status(data.status).json(data);
};
