<template>
  <div class="post" v-for="post in posts" :key="post.id">
    <div>
      Publié par <router-link :to="{ path: '/user/' + post.userId }">{{ post.User.firstName }} {{ post.User.lastName }}</router-link>
    </div>
    <div>Créé le {{ cleanDate(post.createdAt) }}</div>

    <div @click="modifyAFaire" class="" v-if="post.userId == userIdSS"><i class="fa fa-pen"></i></div>

    <h4 v-if="post.title.length > 0">{{ post.title }}</h4>
    <div>{{ post.message }}</div>
    <img v-if="post.urlImage !== null" :src="post.urlImage" alt="illustration_post" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "AllPost",
  components: {},

  data: () => {
    return {
      posts: [],
      userIdSS: JSON.parse(sessionStorage.getItem("userId")),
      token: sessionStorage.getItem("token"),
      axios: require("axios"),
    };
  },

  mounted() {
    this.axios.defaults.headers.common["Authorization"] = "Bearer " + this.token;

    this.axios
      .get("http://localhost:3000/api/posts/")

      .then((response) => {
        this.posts = response.data;
      })

      .catch((error) => console.log("error :>> ", error));
  },

  // computed: {
  //   ...mapState("postStore", {
  //     etat: (state) => state.etat,
  //     mode: (state) => state.mode,
  //     posts: (state) => state.posts,
  //   }),
  // },

  methods: {
    cleanDate(date) {
      return moment(date).format("DD/MM/YYYY à h:mm");
    },
  },
};
</script>

<style></style>
