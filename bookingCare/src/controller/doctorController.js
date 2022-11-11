//src24
import * as doctorServ from '../services/doctorServices';
import * as apiSupplies from '../connectSupply/apiSupplies';

//v87xx5
export const postDoctorInfoCtrl = async (req, res) => {
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

  if (typeof +newData.doctorId !== 'number' || isEmpty === true) {
    data = apiSupplies.errStates.fieldRequired;
  } else {
    try {
      data = await doctorServ.postDoctorInfoServ(newData);
    } catch (error) {
      data = apiSupplies.errStates.serverError;
      console.log('postDoctorDetailsCtrl error ---', error);
    }
  }
  return res.status(data.status).json(data);
};

export const getDoctorScheduleByIdCtrl = async (req, res) => {
  let data = null;
  const doctorId = +req.query.doctorId;
  const { fieldRequired, serverError } = apiSupplies.errStates;

  if (!doctorId || typeof doctorId !== 'number') {
    data = fieldRequired;
  } else {
    try {
      data = await doctorServ.getDoctorScheduleByIdServ(doctorId);
    } catch (error) {
      data = serverError;
      console.log('getDoctorScheduleByIdCtrl error ---', error);
    }
  }
  return res.status(data.status).json(data);
};

export const uploadDoctorScheduleCtrl = async (req, res) => {
  let data = null;
  let newSchedule = req.body;
  const { fieldRequired, serverError } = apiSupplies.errStates;

  if (newSchedule && newSchedule.length === 0) {
    data = fieldRequired;
  } else {
    try {
      if (!Array.isArray(newSchedule)) {
        newSchedule = [newSchedule];
      }
      data = await doctorServ.uploadDoctorScheduleServ(newSchedule);
    } catch (error) {
      data = serverError;
      console.log('uploadDoctorScheduleCtrl error ---', error);
    }
  }
  return res.status(data.status).json(data);
};

export const getDoctorScheduleKeysCtrl = async (req, res) => {
  let data = null;
  try {
    data = await doctorServ.getDoctorScheduleKeysServ();
  } catch (error) {
    data = apiSupplies.errStates.serverError;
    console.log('getDoctorScheduleKeysCtrl error ---', error);
  }

  return res.status(data.status).json(data);
};

export const editDoctorInfoCtrl = async (req, res) => {
  const doctorId = +req.query.doctorId;
  let data = null;

  if (!doctorId || typeof doctorId !== 'number') {
    const { missingParams } = apiSupplies.errStates;
    data = {
      errCode: 4,
      status: 406,
      message: missingParams.idMes,
    };
  } else {
    try {
      data = await doctorServ.editDoctorInfoServ(doctorId);
    } catch (error) {
      data = apiSupplies.errStates.serverError;
      console.log('editDoctorInfoCtrl error ---', error);
    }
  }
  return res.status(data.status).json(data);
};

export const editDoctorDetailCtrl = async (req, res) => {
  const doctorId = +req.query.doctorId;
  let data = null;

  if (!doctorId || typeof doctorId !== 'number') {
    const { missingParams } = apiSupplies.errStates;
    data = {
      errCode: 4,
      status: 406,
      message: missingParams.idMes,
    };
  } else {
    try {
      data = await doctorServ.editDoctorDetailsServ(doctorId);
    } catch (error) {
      data = apiSupplies.errStates.serverError;
      console.log('editDoctorDetailCtrl error ---', error);
    }
  }
  return res.status(data.status).json(data);
};

export const getDoctorDetailsByIdCtrl = async (req, res) => {
  const id = +req.query.id;
  let data = null;

  if (!id || typeof id !== 'number') {
    const { incorrectInfo } = apiSupplies.errStates;
    data = {
      errCode: 4,
      status: 406,
      message: incorrectInfo.idMes,
    };
  } else {
    try {
      data = await doctorServ.getDoctorDetailsByIdServ(id);
    } catch (error) {
      data = apiSupplies.errStates.serverError;
      console.log('getDoctorDetailsByIdServ error ---', error);
    }
  }
  return res.status(data.status).json(data);
};

export const postDoctorDetailsCtrl = async (req, res) => {
  const newData = req.body;
  let isEmpty = false;
  let data = null;

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
      data = await doctorServ.postDoctorDetailsServ(newData);
    } catch (error) {
      data = apiSupplies.errStates.serverError;
      console.log('postDoctorDetailsCtrl error ---', error);
    }
  }
  return res.status(data.status).json(data);
};

export const getAllDoctorsCtrl = async (req, res) => {
  let data = null;
  try {
    data = await doctorServ.getAllDoctorsServ();
  } catch (error) {
    data = apiSupplies.errStates.serverError;
    console.log('getAllDoctorsCtrl error ---', error);
  }
  return res.status(data.status).json(data);
};

export const topDoctorHomeCtrl = async (req, res) => {
  const { serverError } = apiSupplies.errStates;
  let limit = +req.query.limit;
  let data = null;

  if (!limit) {
    limit = 10;
  }

  try {
    data = await doctorServ.topDoctorHomeServ(limit);
  } catch (error) {
    data = serverError;
    console.log('topDoctorHomeCtrl error ---', error);
  }
  return res.status(data.status).json(data);
};
