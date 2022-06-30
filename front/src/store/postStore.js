import store from ".";

const axios = require("axios");

const token = sessionStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

const postStore = {
  namespaced: true,
  state: {
    etat: "",
    probleme: "",
    mode: "",

    post: { id: "", title: "", message: "", urlImage: "", userId: "" },
    posts: [],
  },

  mutations: {
    setEtat(state, { etat, probleme }) {
      state.etat = etat;
      state.probleme = probleme;
    },
    setMode(state, mode) {
      state.mode = mode;
    },

    setPostInfos(state, posts) {
      state.posts = posts;
    },
  },

  actions: {
    createPost: ({ commit }, postCreate) => {
      commit("setEtat", { etat: "loading", probleme: "" });
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:3000/api/posts/newpost/", postCreate)
          .then((postCreate) => {
            commit("setEtat", { etat: "success", probleme: "" });
            resolve(postCreate);
          })
          .catch((errorPostCreate) => {
            if (errorPostCreate.response.data.Message) {
              let messages = errorPostCreate.response.data.Message;
              Object.keys(messages).forEach((error) => {
                let message = messages[error];

                if (error === "error_auth") {
                  commit("setEtat", { etat: "error_auth", probleme: message });
                  reject(errorPostCreate);
                } else if (error === "error_serveur") {
                  commit("setEtat", { etat: "error_serveur", probleme: message });
                  reject(errorPostCreate);
                }
              });
            }
          });
      });
    },

    // getAllPost: ({ commit, state }, posts) => {
    //   instance
    //     .get("/posts/", posts)

    //     .then((posts) => {
    //       return posts.data;
    //     })
    //     .then((data) => {
    //       commit("setPostInfos", data);
    //       console.log("data :>> ", data);
    //     })
    //     .catch((errorPosts) => {
    //       console.log("errorPosts :>> ", errorPosts);
    //     });
    // },
  },
};

// console.log(userStore);
export default postStore;
