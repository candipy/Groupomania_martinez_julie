<template>
  <div class="post">
    <div>
      <!-- Publié par <router-link :to="{ path: '/user/' + post.userId }">{{ post.User.firstName }} {{ post.User.lastName }}</router-link> -->
    </div>
    <div>Créé le {{ cleanDate(post.createdAt) }}</div>
    <!-- <div v-if="post.userId == userIdSS" @click="modifyPost()"><i class="fa fa-pen"></i></div> -->
    <div class="" v-if="post.userId == userIdSS"><i class="fa fa-pen"></i></div>

    <h4 v-if="post.title.length > 0">{{ post.title }}</h4>
    <div>{{ post.message }}</div>
    <img v-if="post.urlImage !== null" :src="post.urlImage" alt="illustration_post" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  name: "OnePost",

  data: () => {
    return {
      userIdSS: JSON.parse(sessionStorage.getItem("userId")),
      token: sessionStorage.getItem("token"),
      axios: require("axios"),
    };
  },
  computed: {
    ...mapState("postStore", {
      post: (state) => state.post,
    }),
  },

  methods: {
    cleanDate(date) {
      return moment(date).format("DD/MM/YYYY à h:mm");
    },
  },
  mounted() {
    console.log("store", this.$store._state.data.postStore);

    this.$store.dispatch("postStore/getOnePost");
    // console.log("store", this.$store._state.data.postStore);
    //     this.axios.defaults.headers.common["Authorization"] = "Bearer " + this.token;
    //     this.axios
    //       .get("http://localhost:3000/api/posts/" + this.$route.params.id)
    //       .then((response) => {
    //         this.post = response.data;
    //         console.log("this.post :>> ", this.post);
    //       })
    //       .catch((error) => console.log("error :>> ", error));
  },

  //   methods: {
  //     modifyPost() {
  //       console.log("this.$route.params.id :>> ", this.$route.params.id);
  //       this.axios
  //         .patch("http://localhost:3000/api/posts/" + this.$route.params.id)

  //         .then((response) => {
  //           console.log("response :>> ", response);
  //         })

  //         .catch((error) => console.log("error :>> ", error));
  //     },
  //   },
};
</script>

<style></style>
