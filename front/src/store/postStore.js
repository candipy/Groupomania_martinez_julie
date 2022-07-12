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
    info: "",
    mode: "",

    postId: "",

    post: [],

    posts: {},
  },

  mutations: {
    setEtat(state, { etat, info }) {
      state.etat = etat;
      state.info = info;
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

    // addPost(state, post) {
    //   state.posts.push(post);
    // },
  },

  // getters: {
  //   feed: (state) => state.posts,
  // },

  actions: {
    createPost: ({ commit }, postCreate) => {
      commit("setEtat", { etat: "loading", info: "" });
      // return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:3000/api/posts/", postCreate)
        .then((postCreate) => {
          console.log("postCreate :>> ", postCreate);
          // commit("addPost", postCreate.data.postCreate);
          // commit("setPosts", postCreate.data.postCreate);
          // resolve(postCreate);
        })
        .catch((errorPostCreate) => {
          console.log("errorPostCreate :>> ", errorPostCreate);
          // if (errorPostCreate.response.data.Message) {
          //   let messages = errorPostCreate.response.data.Message;
          //   Object.keys(messages).forEach((error) => {
          //     let message = messages[error];

          //     if (error === "error_auth") {
          //       commit("setEtat", { etat: "error_auth", info: message });
          //       reject(errorPostCreate);
          //     } else if (error === "error_serveur") {
          //       commit("setEtat", { etat: "error_serveur", info: message });
          // reject(errorPostCreate);
          //     }
          //   });
          // }
        });
      // });
    },

    getAllPost: ({ commit }) => {
      axios
        .get("http://localhost:3000/api/posts/")

        .then((posts) => {
          commit("setPosts", posts.data);
        })
        .catch((errorPosts) => {
          console.log("errorPosts :>> ", errorPosts);
        });
    },

    getOnePost: ({ commit, state }) => {
      commit("setEtat", { etat: "", info: "" });
      axios
        .get("http://localhost:3000/api/posts/" + state.postId + "/")
        .then((post) => {
          commit("setOnePost", post.data);
        })
        .catch((errorPost) => {
          console.log("errorPosts :>> ", errorPost);
        });
    },

    modifyPost: ({ commit, state }, postUpdate) => {
      return new Promise((resolve, reject) => {
        axios
          .patch("http://localhost:3000/api/posts/" + state.postId + "/", postUpdate)
          .then((postUpdate) => {
            console.log("postUpdate :>> ", postUpdate);
            resolve(postUpdate);
          })

          .catch((errorPostUpdate) => {
            console.log("errorPosts :>> ", errorPostUpdate);
            reject(errorPostUpdate);
          });
      });
    },

    deletePost: ({ commit, state }) => {
      axios
        .delete("http://localhost:3000/api/posts/" + state.postId + "/")

        .then((postDelete) => {
          commit("setEtat", { etat: "", info: postDelete.data.Message });
        })
        .catch((errorDelete) => {
          console.log("errorPosts :>> ", errorDelete);
        });
    },
  },
};

// console.log(userStore);
export default postStore;
