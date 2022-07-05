import store from ".";
import userStore from "./userStore";

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

    postId: "",

    post: [],

    posts: {},
  },

  mutations: {
    setEtat(state, { etat, probleme }) {
      state.etat = etat;
      state.probleme = probleme;
    },
    setMode(state, mode) {
      state.mode = mode;
    },
    setPostId(state, postId) {
      state.postId = postId;
    },

    setOnePost(state, post) {
      state.post = post;
    },
    setPosts(state, posts) {
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
            commit("setOnePost", postCreate.data.postCreate);
            console.log("postCreate.data.postCreate :>> ", postCreate.data.postCreate);
            resolve(postCreate);
          })
          .catch((errorPostCreate) => {
            console.log("errorPostCreate :>> ", errorPostCreate);
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

    getAllPost: ({ commit, state }, posts) => {
      axios
        .get("http://localhost:3000/api/posts/", posts)

        .then((posts) => {
          return posts.data;
        })
        .then((data) => {
          commit("setPosts", data);
        })
        .catch((errorPosts) => {
          console.log("errorPosts :>> ", errorPosts);
        });
    },

    getOnePost: ({ commit, state }) => {
      axios
        .get("http://localhost:3000/api/posts/" + state.postId + "/")
        .then((post) => {
          return post.data;
        })
        .then((data) => {
          commit("setOnePost", data);
          console.log("state.post :>> ", state.post);
        })
        .catch((errorPost) => {
          console.log("errorPosts :>> ", errorPost);
        });
    },

    modifyPost: ({ commit, state }, post) => {
      axios

        .get("http://localhost:3000/api/posts/" + state.postId + "/")
        .then((post) => {
          return post.data;
        })
        .then((data) => {
          commit("setOnePost", data);
          console.log("data :>> ", data);
        })
        .catch((errorPost) => {
          console.log("errorPosts :>> ", errorPost);
        });
    },

    // deletePost: ({commit, state}, )
  },
};

// console.log(userStore);
export default postStore;
