import Cookies from 'js-cookie';

const TokenKey = 'space-token';


const UserKey = 'current-user';

export const getToken = () => {
    return Cookies.get(TokenKey);
};

export const setToken = token => {
    return Cookies.set(TokenKey, token);
};

export const removeToken = () => {
    Cookies.remove(TokenKey);
};

export const getCurrentUser = () => {
    const user = Cookies.get(UserKey);
    return user === undefined ? null : JSON.stringify(Cookies.get(UserKey));
};

export const setCurrentUser = CurrentUser => {
    return Cookies.set(UserKey, JSON.stringify(CurrentUser));
};

export const removeCurrentUser = () => {
    Cookies.remove(UserKey);
};