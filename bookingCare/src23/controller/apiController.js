import * as apiServices from '../services/apiServices';
import * as apiSupplies from '../connectSupply/apiSupplies';

export const getUserAllcodeFn = async (req, res) => {
  const objParam = req.body;
  let data, typeVal, keymapVal;

  if (Object.keys(objParam).length === 0) {
    typeVal = keymapVal = 'ALL';
  } else {
    for (const key in objParam) {
      typeVal = key;
      keymapVal = objParam[key];
    }
  }

  data = await apiServices.getUserAllCodeServ(typeVal, keymapVal);
  return res.status(data.status).json(data);
};

export const userUpdatedFn = async (req, res) => {
  let data = null;
  const id = +req.body.id;
  const { fieldRequired, incorrectInfo } = apiSupplies.errStates;

  if (!id || typeof id !== 'number') {
    data = {
      errCode: incorrectInfo.errCode,
      status: incorrectInfo.status,
      message: incorrectInfo.idMes,
    };
  } else {
    let isEmpty = false;
    const clientData = req.body;

    for (const key in clientData) {
      if (clientData[key] === null || clientData[key] === '') {
        isEmpty = true;
        break;
      }
    }

    if (isEmpty) {
      data = fieldRequired;
    } else {
      data = await apiServices.userUpdatedApi(clientData);
    }
  }

  return res.status(data.status).json(data);
};

export const userCreatedFn = async (req, res) => {
  let data = null;
  let isEmpty = false;
  const clientData = req.body;
  const { notCreated, fieldRequired, incorrectInfo } = apiSupplies.errStates;

  for (const key in clientData) {
    if (clientData[key] === null || clientData[key] === '') {
      isEmpty = true;
      break;
    }
  }

  if (isEmpty) {
    data = fieldRequired;
  } else if (!clientData.email.includes('@gmail.com')) {
    data = {
      errCode: incorrectInfo.errCode,
      status: incorrectInfo.status,
      message: incorrectInfo.emailMes,
    };
  } else if (clientData.password !== clientData.passwordConfirmed) {
    data = {
      errCode: incorrectInfo.errCode,
      status: incorrectInfo.status,
      message: incorrectInfo.passwordConfirmedMes,
    };
  } else {
    data = await apiServices.userCreatedApi(clientData);
  }
  return res.status(data.status).json(data);
};

export const userDeletedFn = async (req, res) => {
  const id = +req.body.id;
  let data = null;
  const { incorrectInfo } = apiSupplies.errStates;

  if (!id || typeof id !== 'number') {
    data = {
      errCode: incorrectInfo.errCode,
      status: incorrectInfo.status,
      message: incorrectInfo.idMes,
    };
  } else {
    data = await apiServices.userDeletedApi(id);
  }
  return res.status(data.status).json(data);
};

export const userListFn = async (req, res) => {
  let data = null;
  const clientParam =
    Object.keys(req.params).length === 0 ? 'ALL' : req.params.id;
  const { missingParams } = apiSupplies.errStates;

  if (!clientParam) {
    data = {
      errCode: missingParams.errCode,
      message: missingParams.idMes,
    };
  } else {
    data = await apiServices.userListApi(clientParam);
  }
  return res.status(data.status).json(data);
};

export const loginFn = async (req, res) => {
  const { email, password } = req.body;
  const { fieldRequired, incorrectInfo } = apiSupplies.errStates;
  let data = null;

  if (!email || !password) {
    data = fieldRequired;
    return res.status(data.status).json(data);
  }

  data = await apiServices.handleUserLogin(email, password);
  if (data.errCode === incorrectInfo.errCode) {
    return res.status(data.status).json(data);
  }
  return res.status(data.status).json(data);
};
