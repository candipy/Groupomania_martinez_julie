<template>
  <whatsNew />
  <addPost @keyup="updatePostList" @click="updatePostList" />
  <div class="post" v-for="post in posts" v-bind:key="post.id">
    <OnePost v-bind:message="post.message" v-bind:image="post.image" v-bind:title="post.title" v-bind:date="post.createdAt" v-bind:userId="post.UserId" v-bind:postId="post.id" v-bind:firstName="post.User.firstName" v-bind:lastName="post.User.lastName" />
    <deletePost @click="updatePostList" v-if="(etat == 'delete') & (post.id == this.$store._state.data.postStore.postId)" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import AddPost from "@/components/AddPost.vue";
import OnePost from "@/components/OnePost.vue";
import moment from "moment";
import whatsNew from "./WhatsNew.vue";
import DeletePost from "./DeletePost.vue";

export default {
  name: "AllPost",

  components: {
    AddPost,
    whatsNew,
    OnePost,
    DeletePost,
  },

  data: () => {
    return {
      userIdSS: JSON.parse(sessionStorage.getItem("userId")),
      token: sessionStorage.getItem("token"),
      axios: require("axios"),
    };
  },

  mounted() {
    this.$store.dispatch("postStore/getAllPost");
  },

  computed: {
    ...mapState("postStore", {
      etat: (state) => state.etat,
      posts: (state) => state.posts,
    }),
  },
  methods: {
    updatePostList() {
      alert("update");
      this.$store.dispatch("postStore/getAllPost");
    },
  },
};
</script>

<style></style>
