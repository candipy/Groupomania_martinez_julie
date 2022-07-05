<template>
  <Header />
  <nav>
    <router-link to="/" class="btn-grad">Home</router-link>
    <router-link :to="{ path: '/user/' + this.userIdSS }" class="btn-grad">Votre Profil</router-link>
    <btnLogout />
  </nav>
  <div class="post">
    <div>
      Publié par
      <router-link :to="{ path: '/user/' + post.userId }">
        <!-- {{ post.User }} -->
        <!-- {{ post.User.firstName }} {{ post.User.lastName }}  Fonctionne pas alors que post.User est OK-->
      </router-link>
    </div>
    <div>Créé le {{ post.createdAt }}</div>
    <!-- <div>Créé le {{ cleanDate(post.createdAt) }}</div>   Fonctionne pas, is not a fonction, mais ok sur AllPost.vue -->
    <div class="" v-if="post.userId == userIdSS"><i class="fa fa-pen"> </i><i class="fa fa-trash"> </i></div>
    <h4 v-if="post.title !== null">{{ post.title }}</h4>
    <div>{{ post.message }}</div>
    <img class="post_img" v-if="post.urlImage !== null" :src="post.urlImage" alt="illustration_post" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import Header from "@/components/Header.vue";
import btnLogout from "@/components/BtnLogout.vue";
export default {
  name: "OnePost",
  components: { Header, btnLogout },

  data: () => {
    return {
      userIdSS: JSON.parse(sessionStorage.getItem("userId")),
    };
  },

  mounted() {
    this.$store.commit("postStore/setPostId", this.$route.params.id);
    this.$store.dispatch("postStore/getOnePost");
    console.log("store", this.$store._state.data.postStore);
  },
  computed: {
    ...mapState("postStore", {
      post: (state) => state.post,
    }),
  },

  methods: {
    cleanDate: (date) => {
      return moment(date).format("DD/MM/YYYY à h:mm");
    },
  },

  methods: {
    // modifyPost() {
    //   this.$$store
    //     .dispatch("postStore/modifyPost")
    //     .then((response) => {
    //       console.log("response :>> ", response);
    //     })
    //     .catch((error) => console.log("error :>> ", error));
    // },

    deletePost() {
      this.$store.dispatch("postStore/deletePost");
    },
  },
};
</script>

<style></style>
