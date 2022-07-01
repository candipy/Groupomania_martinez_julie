<template>
  <Header />
  <nav>
    <router-link to="/" class="btn-grad">Home</router-link>
    <router-link :to="{ path: '/user/' + this.userIdSS }" class="btn-grad">Votre Profil</router-link>
    <btnLogout />
  </nav>
  <h1>Fil d'actualités</h1>

  <whatsNew />
  <addPost />
  <!-- <onePost /> -->

  <allPost />
</template>

<script>
import Header from "@/components/Header.vue";

import AddPost from "@/components/AddPost.vue";
import btnLogout from "@/components/BtnLogout.vue";
import allPost from "@/components/AllPost.vue";
import whatsNew from "@/components/WhatsNew.vue";
// import onePost from "@/components/OnePost.vue";

// import { mapState } from "vuex";

export default {
  name: "Feed",
  components: {
    Header,
    AddPost,
    btnLogout,
    allPost,
    whatsNew,
    // onePost,
  },

  data: () => {
    return {
      // title: null,
      // message: null,
      userIdSS: JSON.parse(sessionStorage.getItem("userId")),
      token: sessionStorage.getItem("token"),
      axios: require("axios"),
    };
  },

  mounted() {
    // console.log("this.$commit.state :>> ", this.$commit.state);
    console.log("store", this.$store._state.data.postStore);

    if (sessionStorage.getItem("token") === null) {
      this.$router.push("/");
      return;
    }

    this.$store.dispatch("userStore/getUserInfos");
  },
  // computed: {
  //   ...mapState("userStore", {
  //     userInfos: (state) => state.userInfos,
  //   }),
  //   ...mapState("postStore", {
  //     etat: (state) => state.etat,
  //     probleme: (state) => state.probleme,
  //     mode: (state) => state.mode,
  //     posts: (state) => state.posts,
  //   }),
  // },

  methods: {},
};
</script>

<style></style>
