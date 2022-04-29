import axios from "axios";
import store from "../store"
import { evaEdit } from '@quasar/extras/eva-icons';
import { Notify } from 'quasar';

const baseURL = import.meta.env.VITE_API_HOST
const tokenPrefix = "Bearer ";
const instance = axios.create({
    baseURL
});

// request interceptor
instance.interceptors.request.use(
    config => {
        if (store.state.user.token) {
            config.headers['Authorization'] = tokenPrefix + store.state.user.token
        }
        return config;
    },
    error => {
        const response = error.response;
        // do something with request error
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    response => {
        if (response.data.code) {
            handleErrorResponse(response);
            return Promise.reject(response.data);
        }
        return response.data;
    },
    error => {
        handleErrorResponse(error.response);
        return Promise.reject(error);
    }
);

const handleErrorResponse = response => {
    if (response.status === 401 || response.status === 403) {
        store.dispatch('user/logout').then(() => window.location.reload());
    }

    if (response.data instanceof Array) {
        response.data.forEach(item => {
            Notify.create({
                type: 'negative',
                message: item.message,
                position: 'top'
            });
        });
    } else {
        Notify.create({
            type: 'negative',
            message: response.data.message,
            position: 'top'
        });
    }
};


const {get, post, put } = instance

export {get, post, put }