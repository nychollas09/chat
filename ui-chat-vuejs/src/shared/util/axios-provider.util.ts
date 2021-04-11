import Axios from 'axios';

export const AuthApi = Axios.create({
  baseURL: `${process.env.API_URL}/auth`,
});

export const Api = Axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
