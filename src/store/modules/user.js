import { getToken } from "../../utils/auth.js";
import { setToken} from "../../utils/auth.js";
import { removeToken} from "../../utils/auth.js";
import {createToken} from "../../api/token.js";
import { me } from "../../api/user.js";
import { getCurrentUser, setCurrentUser } from "../../utils/auth";

const state = () => ({
    token: getToken(),
    currentUser: getCurrentUser()
});

const getters = {
    nicknameFirstWord: state => {
        return state.currentUser ? state.currentUser.nickname.slice(0, 1) : '';
    }
};

const actions = {
    login({ commit }, { username, password }) {
        return new Promise((resolve, reject) => {
            createToken(username.trim(), password )
                .then(token => {
                // console.log(response);
                    commit('SET_TOKEN', token);
                setToken(token);
                resolve();
            })
                .catch(error => {
                reject(error);
            });
        })
    },
    // user logout
    logout({ commit}) {
        commit('SET_TOKEN', '');
        removeToken();
    },
    fetchCurrentUser({commit}) {
        return new Promise((resolve, reject) => {
            me()
                .then(currentUser => {
                    commit('SET_CURRENT_USER', currentUser);
                    setCurrentUser(currentUser);
                    resolve(currentUser);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
};

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_CURRENT_USER: (state, currentUser) => {
        state.currentUser = currentUser;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};