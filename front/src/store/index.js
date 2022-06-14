import { RouterLink } from "vue-router";
import { createStore } from "vuex";

const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

const token = sessionStorage.getItem("token");
if (token) {
  console.log("token :>> ", token);
  instance.defaults.headers.common["Authorization"] = "Bearer " + token;
  console.log(instance.defaults.headers.common["Authorization"]);
}

const store = createStore({
  state: {
    status: "",
    errors: "",
    user: {
      userId: "",
      token: "",
    },
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
    setStatus(state, { status, errors }) {
      state.status = status;
      state.errors = errors;
    },

    logUser(state, user) {
      state.user = user;
    },
    userInfos(state, userInfos) {
      state.userInfos = userInfos;
    },

    logout(state) {
      state.user = {
        userId: "",
        token: "",
      };
      // delete instance.defaults.headers.common["Authorization"]
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("token");
    },
  },

  actions: {
    login: ({ commit }, userLog) => {
      commit("logout"); // Si il y avait un user connecté, déconnection
      commit("setStatus", { status: "loading", errors: "" });
      return new Promise((resolve, reject) => {
        instance
          .post("/auth/login/", userLog)

          .then((userLog) => {
            commit("setStatus", { status: "success", errors: "" });
            sessionStorage.setItem("token", userLog.data.token);
            sessionStorage.setItem("userId", userLog.data.userId);
            instance.defaults.headers.common["Authorization"] = "Bearer " + userLog.data.token;
            commit("logUser", userLog.data);
            resolve(userLog);
          })
          .catch((errorUserLogin) => {
            let message = errorUserLogin.response.data.Message;

            if (message.error_user) {
              console.log("errorUserLogin.response.data.Message.User :>> ", errorUserLogin.response.data.Message.error_user);
              commit("setStatus", { status: "error_user", errors: message.error_user });
              reject(errorUserLogin);
            }
            if (message.error_password) {
              console.log("errorUserLogin.response.data.Message.User :>> ", errorUserLogin.response.data.Message.error_password);
              commit("setStatus", { status: "error_password", errors: message.error_password });
              reject(errorUserLogin);
            }
            if (message.error_serveur) {
              console.log("errorUserLogin.response.data.Message.User :>> ", errorUserLogin.response.data.Message.error_serveur);
              commit("setStatus", { status: "error_serveur", errors: message.error_serveur });
              reject(errorUserLogin);
            }
          });
      });
    },
    createAccount: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        commit;
        instance
          .post("/auth/signup/", userInfos)
          .then((userCreate) => {
            commit("setStatus", "");
            resolve(userCreate);
          })
          .catch((errorUserCreate) => {
            let message = errorUserCreate.response.data.Message;

            if (message.error_email) {
              console.log(" ", errorUserCreate.response.data.Message.error_email);
              commit("setStatus", { status: "error_email", errors: message.error_email });
              reject(errorUserCreate);
            }
            if (message.error_password) {
              console.log(" ", errorUserCreate.response.data.Message.error_password);
              commit("setStatus", { status: "error_password", errors: message.error_password });
              reject(errorUserCreate);
            }

            if (message.error_unique) {
              console.log(" ", errorUserCreate.response.data.Message.error_unique);
              commit("setStatus", { status: "error_password", errors: message.error_unique });
              reject(errorUserCreate);
            }
            if (message.error_serveur) {
              commit("setStatus", { status: "error_serveur", errors: message.error_serveur });
              reject(errorUserCreate);
            }
          });
      });
    },

    getUserInfos: ({ commit }) => {
      instance
        .get("auth/user/" + sessionStorage.getItem("userId") + "/")
        .then((response) => {
          commit("userInfos", response.data);
          console.log("response.getOneUSer :>> ", response.data);
        })
        .catch((error) => {
          console.log("error.getOneUser :>> ", error);
        });
    },

    // deleteToken: ({}) => {
    //   instance.delete("auth/user/" + user.userId + "/", {
    //     headers: {
    //       Authorization: "Bearer " + user.token,
    //     },
    //   });
    // },
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
