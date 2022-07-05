<template>
  <div class="post" v-for="post in posts" v-bind:key="post.id">
    <router-link :to="{ name: 'OnePost', params: { id: post.id } }">
      <div>
        Publié par
        <!-- {{ post.User }} -->
        <!-- {{ post.User.firstName }} {{ post.User.lastName }}  Fonctionne pas alors que post.User est OK-->
        <div>Créé le {{ cleanDate(post.createdAt) }}</div>
      </div>

      <div class="post_title" v-if="post.title !== ''">{{ post.title }}</div>
      <div class="post_message">{{ post.message }}</div>
      <img class="post_img_little" v-if="post.urlImage !== null" :src="post.urlImage" alt="illustration_post" />
    </router-link>
  </div>

  <!-- <onePost /> -->
</template>

<script>
import { mapState } from "vuex";

import moment from "moment";

export default {
  name: "AllPost",

  data: () => {
    return {
      userIdSS: JSON.parse(sessionStorage.getItem("userId")),
      token: sessionStorage.getItem("token"),
      axios: require("axios"),
    };
  },

  mounted() {
    this.$store.dispatch("postStore/getAllPost");
    console.log("store all", this.$store._state.data.postStore);
  },

  computed: {
    ...mapState("postStore", {
      etat: (state) => state.etat,
      mode: (state) => state.mode,
      posts: (state) => state.posts,
    }),
  },
  methods: {
    cleanDate(date) {
      return moment(date).format("DD/MM/YYYY à h:mm");
    },
  },
};
</script>

<style></style>
