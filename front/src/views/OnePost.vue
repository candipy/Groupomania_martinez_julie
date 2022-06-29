<template>
  <Header />

  <nav>
    <router-link :to="{ path: '/user/' + this.userIdSS }" class="btn-grad">Votre Profil</router-link>
    <router-link to="/feed" class="btn-grad">Fil d'actualités</router-link>
  </nav>

  <div class="post">
    <!-- <div>Publié par {{ post.User.lastName }}</div> -->

    <div v-if="post.userId == userIdSS" @click="modifyPost()"><i class="fa fa-pen"></i></div>
    <h4>{{ post.title }}</h4>
    <div>{{ post.message }}</div>
    <img v-if="post.urlImage !== null" :src="post.urlImage" alt="illustration_post" />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
// import { mapState } from "vuex";
export default {
  name: "OnePost",

  components: {
    Header,
  },

  data: () => {
    return {
      post: [],
      userIdSS: JSON.parse(sessionStorage.getItem("userId")),
      token: sessionStorage.getItem("token"),
      axios: require("axios"),
    };
  },

  mounted() {
    this.axios.defaults.headers.common["Authorization"] = "Bearer " + this.token;

    this.axios
      .get("http://localhost:3000/api/posts/" + this.$route.params.id)

      .then((response) => {
        this.post = response.data;
        console.log("this.post :>> ", this.post);
      })

      .catch((error) => console.log("error :>> ", error));
  },

  //   computed: {
  //     ...mapState("postStore", {
  //       etat: (state) => state.etat,
  //       mode: (state) => state.mode,
  //       posts: (state) => state.posts,
  //     }),
  //   },

  methods: {
    modifyPost() {
      console.log("this.$route.params.id :>> ", this.$route.params.id);
      this.axios
        .patch("http://localhost:3000/api/posts/" + this.$route.params.id)

        .then((response) => {
          console.log("response :>> ", response);
        })

        .catch((error) => console.log("error :>> ", error));
    },
  },
};
</script>

<style></style>
