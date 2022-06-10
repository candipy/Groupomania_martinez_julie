<template>
  <Header />
  <nav>
    <router-link to="/" class="btn-grad">Home</router-link>
    <router-link to="/feed" class="btn-grad">Fil d'actualités</router-link>
  </nav>

  <h1>Profil</h1>
  <div class="card">
    <div class="card_subtitle">Profil</div>
    <p>
      {{ userInfos.lastName }} {{ userInfos.firstName }} {{ userInfos.email }}
      {{ userInfos.description }}
    </p>
    <!-- <img :src="user.photo" /> -->
    <button class="btn-grad">
      <span @click="logout"> Deconnexion</span>
    </button>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

import { mapState } from "vuex";

export default {
  name: "Profil",
  components: {
    Header,
  },
  mounted() {
    // console.log("this.$store.state.user :>> ", this.$store.state.user);
    // console.log(
    //   "this.$store.state.userInfos :>> ",
    //   this.$store.state.userInfos
    // );

    if (this.$store.state.user.userId == -1) {
      this.$router.push("/login");
      return;
    }
    this.$store.dispatch("getUserInfos");
  },

  computed: {
    ...mapState(["userInfos"]),
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$store.dispatch("deleteToken");
      this.$router.push("/");
    },
  },

  
};
</script>

<style>
</style>