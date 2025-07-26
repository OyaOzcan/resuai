// utils/axiosInstance.js
import axios from 'axios';

const api = axios.create();

// Yanıt interceptor'ı: 401 gelirse refresh token ile yeni access token alınır
api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    // Token expired (401) ise refresh isteği gönder
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await axios.post('http://localhost:5001/api/auth/refresh', {
          refreshToken,
        });

        localStorage.setItem('accessToken', data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(originalRequest); // Retry original request with new token
      } catch {
        localStorage.clear();
        window.location.href = '/login'; // Oturumu sıfırla
      }
    }

    return Promise.reject(err);
  }
);

export default api;
