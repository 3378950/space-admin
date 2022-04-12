import Cookies from 'js-cookie';

const TokenKey = 'space-Token';

export const getToken = () => {
    return Cookies.get(TokenKey);
};

export const setToken = token => {
    return Cookies.set(TokenKey, token);
};

export const removeToken = () => {
    return Cookies.remove(TokenKey);
};