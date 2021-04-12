import Axios from 'axios';
import JWTResponse from '../domain/interface/jwt-response.interface';
import AuthProvider from './auth-provider.util';
import VueRoute from '../../routes';

Axios.defaults.withCredentials = true;

Axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    debugger;
    Promise.reject(error);
  },
);

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    debugger;

    if (error.response.status === 401 && (originalRequest.url as string).includes('/refresh')) {
      VueRoute.push('/login');
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      console.log('>>> Indo buscar Refresh Token');
      originalRequest._retry = true;
      return Axios.post<JWTResponse>('/auth/token/refresh', {
        grant_type: 'refresh_token',
      }).then((res) => {
        if (res.status === 201) {
          AuthProvider.defineToken(res.data.accessToken);
          Axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
          return Axios(originalRequest);
        }
      });
    }
    return Promise.reject(error);
  },
);

export default Axios.create({
  baseURL: 'http://localhost:3000',
});
