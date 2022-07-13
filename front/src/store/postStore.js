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

    post: {},

    posts: [],
  },

  mutations: {
    setEtat(state, { etat, info }) {
      state.etat = etat;
      state.info = info;
    },
    setMode(state, mode) {
      state.mode = mode;
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
      commit("setEtat", { etat: "loading", info: "" });

      axios
        .post("http://localhost:3000/api/posts/", postCreate)
        .then((postCreate) => {
          console.log("postCreate store :>> ", postCreate);
        })
        .catch((errorPostCreate) => {
          console.log("errorPostCreate :>> ", errorPostCreate);
        });
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
      console.log("postUpdate :>> ", postUpdate);
      axios
        .patch("http://localhost:3000/api/posts/" + state.post.id + "/", postUpdate)

        .then((postUpdate) => {
          console.log("postUpdate :>> ", postUpdate);
        })

        .catch((errorPostUpdate) => {
          console.log("errorPosts :>> ", errorPostUpdate);
        });
    },

    deletePost: ({ commit, state }) => {
      axios
        .delete("http://localhost:3000/api/posts/" + state.post.id + "/")

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
