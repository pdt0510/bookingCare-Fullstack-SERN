import axios from 'axios';
import 'dotenv/config';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    const { data } = response;
    return data;
  },
  (error) => {
    const { response } = error;
    return response.data;
  },
);

export default instance;
