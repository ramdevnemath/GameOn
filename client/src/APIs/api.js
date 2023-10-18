import axios from 'axios';

const baseURL = "http://localhost:7000/api/"

const adminInstance = axios.create({
    baseURL: `${baseURL}admin`,
    headers: {
        Accept: "application/json"
    }
})

const userInstance = axios.create({
    baseURL: `${baseURL}users`,
    headers: {
        Accept: "application/json"
    }
})

const vendorInstance = axios.create({
    baseURL: `${baseURL}vendors`,
    headers: {
        Accept: "application/json"
    }
})

const setAdminAuthorizationHeader = (config) => {
    const adminToken = localStorage.getItem('admin');
    if (adminToken) {
        config.headers.Authorization = `Bearer ${adminToken}`;
    }
    return config;
};

const setUserAuthorizationHeader = (config) => {
    const userToken = localStorage.getItem('user');
    if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
};

const setVendorAuthorizationHeader = (config) => {
    const vendorToken = localStorage.getItem('vendor');
    if (vendorToken) {
        config.headers.Authorization = `Bearer ${vendorToken}`;
    }
    return config;
};

adminInstance.interceptors.request.use(setAdminAuthorizationHeader);
userInstance.interceptors.request.use(setUserAuthorizationHeader);
vendorInstance.interceptors.request.use(setVendorAuthorizationHeader);


export { adminInstance, userInstance, vendorInstance }
