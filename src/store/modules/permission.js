const state = {
    routes: []
};

const mutation = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes;
    }
};

const action = {
    generateRoutes({ commit }) {
        return new Promise( resolve => {
            let accessedRoutes = asyncRoutes || [];
            commit('SET_ROUTES', accessedRoutes);
            resolve(accessedRoutes);
        });
    }
};