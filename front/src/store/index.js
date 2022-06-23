import { RouterLink } from "vue-router";
import { createStore } from "vuex";
import userStore from "./userStore";
import postStore from "./postStore";

const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});
// const token = sessionStorage.getItem("token");
// if (token) {
//   console.log("token :>> ", token);
//   instance.defaults.headers.common["Authorization"] = "Bearer " + token;
//   console.log(instance.defaults.headers.common["Authorization"]);
// }

const store = createStore({
  modules: {
    userStore: userStore,
    postStore: postStore,
  },
});

export default store;
