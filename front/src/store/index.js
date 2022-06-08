import { createStore } from "vuex";

const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

let user = localStorage.getItem("user");

if (!user) {
  user = {
    userId: -1,
    token: "",
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common["Authorization"] = "Bearer " + user.token;
  } catch {
    user = {
      userId: -1,
      token: "",
    };
  }
}

const store = createStore({
  state: {
    status: "",
    user: user,
    userInfos: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      url_avatar: "",
      description: "",
      admin: "",
      createdAt: "",
      updatedAt: "",
    },
  },

  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
    logUser(state, user) {
      instance.defaults.headers.common["Authorization"] = "Bearer " + user.token;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
    userInfos(state, userInfos) {
      state.userInfos = userInfos;
    },

    logout(state) {
      state.user = {
        userId: -1,
        token: "",
      }
      localStorage.removeItem('user');
    },
  },

  actions: {
    createAccount: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        commit;
        instance
          .post("/auth/signup/", userInfos)
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

    login: ({ commit }, user) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("/auth/login/", user)
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
        // .get("auth/user/" + user.userId + "/")
        .get(
          "auth/user/" + user.userId + "/"
          // , { headers: { Authorization: "Bearer " + user.token } }
        )
        .then((response) => {
          commit("userInfos", response.data);
          console.log("response.getOneUSer :>> ", response);
        })
        .catch((error) => {
          console.log("error.getOneUser :>> ", error);
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
