import axios from 'axios';

var _api;

function api() {
    // Create an instance
    const localApi = axios.create({
        baseURL: process.env.EXPO_PUBLIC_SERVER_API_URL || 'http://localhost:8090',
        headers: "application/json",
        timeout: 5000,
    });

    //Interceptor to put identity token
    localApi.interceptors.request.use(
        (config) => {
            //Config JWT token interceptor
            let idToken = sessionStorage.getItem("idToken");
            if (idToken) {
                config.headers.Authorization = `Bearer ${idToken}`; // Attaches token
                return config;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    _api = localApi;
    return _api;
}

export default api;