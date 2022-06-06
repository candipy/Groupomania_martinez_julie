import { createStore } from "vuex";

const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

const store = createStore({
  state: {},

  actions: {
    createAccount: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        commit;
        instance
          .post("/auth/signup/", userInfos)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },

    login: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        commit;
        console.log("userInfos :>> ", userInfos);
        instance
          .post("/auth/login/", userInfos)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
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
