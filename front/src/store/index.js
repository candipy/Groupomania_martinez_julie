import { createStore } from "vuex";

const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

let localStorageUser = JSON.parse(localStorage.getItem("user"));

if (!localStorageUser) {
  localStorageUser = {
    userId: -1,
    token: "",
  };
}

const store = createStore({
  state: {
    status: "",
    user: localStorageUser,
    userInfos: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      url_avatar: "",
      description: "",
      admin: false,
      createdAt: "",
      updatedAt: "",
    },
  },

  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
    logUser(state, user) {
      instance.defaults.headers.common["Authorization"] = localStorageUser.token;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },

    userInfos(state, userInfos) {
      state.userInfos = userInfos;
    },
  },

  actions: {
    createAccount: ({ commit }, user) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("/auth/signup/", user)
          .then((response) => {
            commit("setStatus", "");
            resolve(response);
          })
          .catch((error) => {
            if (error.response.status == 400) {
              commit("setStatus", "error_email");
              reject(error);
            }
            if (error.response.status == 405) {
              commit("setStatus", "error_password");
              reject(error);
            }
            if (error.response.status == 403) {
              commit("setStatus", "error_unique");
              reject(error);
            }
            if (error.response.status == 500) {
              commit("setStatus", "error_serveur");
              reject(error);
            }
          });
      });
    },

    login: ({ commit }, logUser) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("/auth/login/", logUser)
          .then((response) => {
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
          })
          .catch((error) => {
            if (error.response.status == 404) {
              commit("setStatus", "error_user");
              reject(error);
            }
            if (error.response.status == 401) {
              commit("setStatus", "error_password");
              reject(error);
            }
            if (error.response.status == 500) {
              commit("setStatus", "error_serveur");
              reject(error);
            }
          });
      });
    },

    getUserInfos: ({ commit }) => {
      instance
        .get("/user/" + localStorageUser.userId)
        .then((response) => {
          commit("UserInfos", response.data);
          // resolve(response);
        })
        .catch((error) => {
          commit("user", "error_user");
          // reject(error);
        });
    },
  },
});

export default store;

// export default createStore({
//   state: {},
//   getters: {},
//   mutations: {},
//   actions: {},
//   modules: {},
// })
