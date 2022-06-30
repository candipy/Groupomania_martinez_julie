<template>
  <Header />
  <nav>
    <router-link to="/" class="btn-grad">Home</router-link>
  </nav>
  <h1>Erreur</h1>
  <p>
    {{ errors }}
  </p>
</template>

<script>
import Header from "@/components/Header.vue";

import { mapState } from "vuex";

export default {
  name: "Error500",
  components: {
    Header,
  },

  computed: {
    ...mapState("userStore", {
      errors: (state) => state.errors,
      // status: (state) => state.status,
      // userInfos: (state) => state.userInfos,
    }),
  },
};
</script>

<style>
</style>