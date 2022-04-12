import { getToken } from "../../utils/auth.js";
import { login } from "../../api/user.js";
import {setToken} from "../../utils/auth.js";
import {removeToken} from "../../utils/auth";

const state = () => ({
    nickname: '',
    token: getToken(),
    username: '',
    roles: []
});

const getters = {
    nicknameFirstWord: (state) => {
        return state.nickname.slice(0, 1);
    }
};

const actions = {
    login({ commit }, { username, password }) {
        return new Promise((resolve, reject) => {
            login(username.trim(), password )
                .then(response => {
                // console.log(response.headers['authorization']);
                    const authorization= response.headers['authorization']
                    commit('SET_TOKEN', authorization);
                setToken(authorization);
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
        commit('SET_ROLES', []);
        removeToken();
    }
};

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_NICKNAME: (state, nickname) => {
        state.nickname = nickname;
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};