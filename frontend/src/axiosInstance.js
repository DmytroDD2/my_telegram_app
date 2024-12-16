import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token'); 
        if (token) { http://backend:8000/login
            config.headers['Authorization'] = `Bearer ${token}`; 
        }
     
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // localStorage.removeItem('token'); 
            // window.location.href = '/login'; 
            // return Promise.reject({ ...error, redirect: true });
        }
        return Promise.reject(error);
    }

    
);

export default axiosInstance;