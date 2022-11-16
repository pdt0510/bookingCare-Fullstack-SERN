import axios from '../axios';
import * as apiSupplies from '../connectSupplyFE/apiSupplies';

export const postUserBookingServ = (newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { apiUrl, createUserBookingApi } = apiSupplies.apiUrls;
      const data = await axios.post(apiUrl + createUserBookingApi, newData);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

// v92xx2
export const getDoctorIntroServ = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { apiUrl, getDoctorIntroApi } = apiSupplies.apiUrls;
      const data = await axios.get(apiUrl + getDoctorIntroApi, {
        params: { id },
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

// v92xx1
export const getDoctorContentHtmlServ = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { apiUrl, getDoctorContentHtmlApi } = apiSupplies.apiUrls;
      const data = await axios.get(apiUrl + getDoctorContentHtmlApi, {
        params: { id },
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const getDoctorExtraInfoServ = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { apiUrl, getDoctorExtraInfoByIdApi } = apiSupplies.apiUrls;
      const data = await axios.get(apiUrl + getDoctorExtraInfoByIdApi, {
        params: { doctorId },
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

export const editDoctorInfoServ = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { apiUrl, editDoctorInfoByIdApi } = apiSupplies.apiUrls;
      const data = await axios.get(apiUrl + editDoctorInfoByIdApi, {
        params: { doctorId },
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const getUserAllCodeServ = () => {
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

export const getDoctorScheduleByIdServ = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { apiUrl, getDoctorScheduleByIdApi } = apiSupplies.apiUrls;
      const data = await axios.get(apiUrl + getDoctorScheduleByIdApi, {
        params: { doctorId },
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const uploadDoctorScheduleServ = (dataArr) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { apiUrl, uploadDoctorScheduleApi } = apiSupplies.apiUrls;
      const data = await axios.post(apiUrl + uploadDoctorScheduleApi, dataArr);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchDoctorScheduleServ = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { apiUrl, getDoctorScheduleApi } = apiSupplies.apiUrls;
      const data = await axios.get(apiUrl + getDoctorScheduleApi);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const editDoctorDetailsServ = (doctorId) => {
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

export const updateDoctorDetailsServ = (updatedData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { apiUrl, updateDoctorDetailsApi } = apiSupplies.apiUrls;
      const data = await axios.post(
        apiUrl + updateDoctorDetailsApi,
        updatedData,
      );
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
