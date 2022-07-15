<template>
  <whatsNew />
  <addPost />

  <div class="post" v-for="(post, index) in posts" v-bind:key="index">
    <OnePost v-bind:post="post" />
    <deletePost v-if="(etat == 'delete') & (post.id == this.$store._state.data.postStore.post.id)" />
    <ModifyPost v-if="(etat == 'modify') & (post.id == this.$store._state.data.postStore.post.id)" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import whatsNew from "./WhatsNew.vue";
import AddPost from "@/components/AddPost.vue";
import OnePost from "@/components/OnePost.vue";
import DeletePost from "./DeletePost.vue";
import ModifyPost from "./ModifyPost.vue";

export default {
  name: "AllPost",

  components: {
    AddPost,
    whatsNew,
    OnePost,
    DeletePost,
    ModifyPost,
  },

  data: () => {
    return {
      userIdSS: JSON.parse(sessionStorage.getItem("userId")),
    };
  },

  mounted() {
    this.$store.dispatch("postStore/getAllPost");
  },

  computed: {
    ...mapState("postStore", {
      etat: (state) => state.etat,
      posts: (state) => state.posts,
      post: (state) => state.post,
    }),
  },
  methods: {
    // updatePostList() {
    //   //   this.axios.defaults.headers.common["Authorization"] = "Bearer " + this.token;
    //   //   this.axios
    //   //     .get("http://localhost:3000/api/posts/")
    //   //     .then((response) => {
    //   //       console.log("response.data :>> ", response.data);
    //   //     })
    //   //     .catch((error) => console.log("error :>> ", error));
    //   // },
    //   // alert("update");
    //   console.log("update");
    //   this.$store.dispatch("postStore/getAllPost");
    // },
    // getAllPost: ({ commit }) => {
    //   axios
    //     .get("http://localhost:3000/api/posts/")
    //     .then((posts) => {
    //       commit("setPosts", posts.data);
    //     })
    //     .catch((errorPosts) => {
    //       console.log("errorPosts :>> ", errorPosts);
    //     });
    // },
  },
};
</script>

<style></style>
