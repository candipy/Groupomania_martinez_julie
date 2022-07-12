import { CLOSED } from "ws";

const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

const token = sessionStorage.getItem("token");
if (token) {
  console.log("token :>> ", token);
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  console.log(axios.defaults.headers.common["Authorization"]);
}
console.log("token :>> ", token);

const userStore = {
  namespaced: true,
  state: {
    status: null,
    errors: "",
    user: {
      userId: "",
      token: "",
    },
    userInfos: {
      id: "",
      firstName: null,
      lastName: null,
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
      delete axios.defaults.headers.common["Authorization"];
      sessionStorage.clear();
    },
  },

  actions: {
    login: ({ commit }, userLog) => {
      commit("logout"); // Si il y avait un user connecté, déconnection
      commit("setStatus", { status: "loading", errors: "" });
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:3000/api/auth/login/", userLog)

          .then((userLog) => {
            commit("setStatus", { status: "success", errors: "" });
            sessionStorage.setItem("token", userLog.data.token);
            sessionStorage.setItem("userId", userLog.data.userId);
            axios.defaults.headers.common["Authorization"] = "Bearer " + userLog.data.token;
            commit("logUser", userLog.data);
            resolve(userLog);
          })

          .catch((errorUserLogin) => {
            let messages = errorUserLogin.response.data.Message;
            Object.keys(messages).forEach((error) => {
              let message = messages[error];
              console.log("message :>> ", message);
              if (error === "error_user") {
                commit("setStatus", { status: "error_user", errors: message });
                reject(errorUserLogin);
              }
              if (error === "error_password") {
                commit("setStatus", { status: "error_password", errors: message });
                reject(errorUserLogin);
              }
              if (error === "error_serveur") {
                commit("setStatus", { status: "error_serveur", errors: message });
                reject(errorUserLogin);
              }
            });
          });
      });
    },

    createAccount: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:3000/api/auth/signup/", userInfos)
          .then((userCreate) => {
            commit("setStatus", "");
            resolve(userCreate);
          })
          .catch((errorUserCreate) => {
            console.log("errorUserCreate :>> ", errorUserCreate);
            if (errorUserCreate.response.data.errorUserCreate) {
              let errorsSequelize = errorUserCreate.response.data.errorUserCreate.errors;
              errorsSequelize.forEach((error) => {
                console.log("error :>> ", error);
                if (error.message === "email must be unique") {
                  commit("setStatus", { status: "error_unique", errors: "Cet email est déjà utilisé" });
                  reject(errorUserCreate);
                } else if (error.message === "User.firstName cannot be null") {
                  commit("setStatus", { status: "error_vide_firstName" });
                  reject(errorUserCreate);
                }
                if (error.message === "User.lastName cannot be null") {
                  commit("setStatus", { status: "error_vide_lastName" });
                  reject(errorUserCreate);
                }
              });
            }

            if (errorUserCreate.response.data.Message) {
              let messages = errorUserCreate.response.data.Message;
              Object.keys(messages).forEach((error) => {
                let message = messages[error];
                if (error === "error_email") {
                  commit("setStatus", { status: "error_email", errors: message });
                  reject(errorUserCreate);
                }
                if (error === "error_password") {
                  commit("setStatus", { status: "error_password", errors: message });
                  reject(errorUserCreate);
                }
                if (message === "error_serveur") {
                  commit("setStatus", { status: "error_serveur", errors: message });
                  reject(errorUserCreate);
                }
              });
            }
          });
      });
    },

    getUserInfos: ({ commit, state }) => {
      axios
        .get("http://localhost:3000/api/auth/user/" + state.user + "/")

        .then((user) => {
          commit("userInfos", user.data);
          console.log("user.getOneUSer :>> ", user.data);
        })
        .catch((error) => {
          console.log("error.getOneUser :>> ", error);
        });
    },

    deleteAccount: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .delete("http://localhost:3000/api/auth/user/" + sessionStorage.getItem("userId") + "/")

          .then((user) => {
            commit("logout");

            commit("setStatus", { status: "accountDelete", errors: user.data.Message.user_delete });
            resolve(user);
          })

          .catch((errorDeleteUser) => {
            console.log("errorDeleteUser :>> ", errorDeleteUser);
            if ((messages = errorDeleteUser.response.data.Message)) {
              let messages = errorDeleteUser.response.data.Message;
              Object.keys(messages).forEach((error) => {
                let message = messages[error];

                if (error === "error_user") {
                  commit("setStatus", { status: "error_user", errors: message });
                  reject(errorDeleteUser);
                }
                if (error === "error_auth") {
                  commit("setStatus", { status: "error_auth", errors: message });
                  reject(errorDeleteUser);
                }
                if (error === "error_serveur") {
                  commit("setStatus", { status: "error_serveur", errors: message });
                  reject(errorDeleteUser);
                } else {
                  commit("setStatus", { status: "error_serveur", errors: message });
                  reject(errorDeleteUser);
                }
              });
            }
          });
      });
    },
  },
};

// console.log(userStore);
export default userStore;
