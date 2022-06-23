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
console.log("token :>> ", token);

const postStore = {
  namespaced: true,
  state: {
    etat: "",
    probleme: "",
  },

  mutations: {
    setEtat(state, { etat, probleme }) {
      state.etat = etat;
      state.probleme = probleme;
    },
  },

  actions: {


    checkToken :()=>{ const token = sessionStorage.getItem("token");
    if (token) {
      console.log("token :>> ", token);
      instance.defaults.headers.common["Authorization"] = "Bearer " + token;
      console.log(instance.defaults.headers.common["Authorization"]);
    }},

  
    createPost:  ({ commit }, postCreate) => {
      
      commit("setEtat", { etat: "loading", probleme: "" });

      return new Promise((resolve, reject) => {
        instance
          .post("/posts/newpost/", postCreate)
          .then((postCreate) => {
            resolve(postCreate);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};

// console.log(userStore);
export default postStore;
