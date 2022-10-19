//src21
import axios from '../axios';
import * as apiSupplies from '../connectSupplyFE/apiSupplies';

// 6ms25ss
export const editingDoctorDetailsServ = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { apiUrl, editDoctorDetailsByIdApi } = apiSupplies.apiUrls;
      const data = await axios.get(apiUrl + editDoctorDetailsByIdApi, {
        params: { doctorId },
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

//42ms59ss
export const getDoctorInfoByIdServ = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { apiUrl, getDoctorInfoByIdApi } = apiSupplies.apiUrls;
      const data = await axios.get(apiUrl + getDoctorInfoByIdApi, {
        params: { id: doctorId },
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateDoctorInfoServ = (updatedData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { apiUrl, updateDoctorInfoApi } = apiSupplies.apiUrls;
      const data = await axios.post(apiUrl + updateDoctorInfoApi, updatedData);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllDoctorsServ = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { apiUrl, getAllDoctorsApi } = apiSupplies.apiUrls;
      const data = await axios.get(apiUrl + getAllDoctorsApi);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const topDoctorHomeServ = (limitNums) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { apiUrl, topDoctorHomeApi } = apiSupplies.apiUrls;
      const data = await axios.get(apiUrl + topDoctorHomeApi, {
        params: {
          limit: limitNums,
        },
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const allCodeUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { apiUrl, allCodeApi } = apiSupplies.apiUrls;
      const data = await axios.get(apiUrl + allCodeApi);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateUser = (newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { apiUrl, userUpdatedApi } = apiSupplies.apiUrls;
      const data = await axios.patch(apiUrl + userUpdatedApi, {
        ...newData,
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { apiUrl, userDeletedApi } = apiSupplies.apiUrls;
      const data = await axios.delete(apiUrl + userDeletedApi, {
        data: { id: userId },
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const createNewUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { apiUrl, userCreatedApi } = apiSupplies.apiUrls;
      const data = await axios.post(apiUrl + userCreatedApi, newUser);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const userList = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { apiUrl, userListedApi } = apiSupplies.apiUrls;
      const data = await axios.get(apiUrl + userListedApi);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const loginApi = (email, password) => {
  const { apiUrl, loginApi } = apiSupplies.apiUrls;
  return axios.post(apiUrl + loginApi, { email, password });
};
