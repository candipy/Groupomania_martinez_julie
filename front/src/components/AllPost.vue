<template>
  <whatsNew />
  <addPost @keyup="updatePostList" @click="updatePostList" />
  <div class="post" v-for="post in posts" v-bind:key="post.id">
    <OnePost v-bind:post="post" />
    <deletePost @keyup="updatePostList" @click="updatePostList" v-if="(etat == 'delete') & (post.id == this.$store._state.data.postStore.post.id)" />
    <ModifyPost @keyup="updatePostList" @click="updatePostList" v-if="(etat == 'modify') & (post.id == this.$store._state.data.postStore.post.id)" />
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

  // data: () => {
  //   return {
  //     userIdSS: JSON.parse(sessionStorage.getItem("userId")),
  //   };
  // },

  mounted() {
    this.$store.dispatch("postStore/getAllPost");
  },

  // beforeUpdate() {
  //   this.$store.dispatch("postStore/getAllPost");
  //   console.log("update");
  // },

  computed: {
    ...mapState("postStore", {
      etat: (state) => state.etat,
      posts: (state) => state.posts,
      post: (state) => state.post,
    }),
  },
  methods: {
    updatePostList() {
      alert("update");
      // console.log("update");
      this.$store.dispatch("postStore/getAllPost");
    },
  },
};
</script>

<style></style>
