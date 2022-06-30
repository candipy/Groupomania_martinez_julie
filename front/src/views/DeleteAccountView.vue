<template>
  <Header />
  <nav>
    <router-link to="/" class="btn-grad">Home</router-link>
  </nav>
  <h1>Suppression de compte</h1>
  <p>
    {{ errors }}
  </p>
</template>

<script>
import Header from "@/components/Header.vue";

import { mapState } from "vuex";

export default {
  name: "DeleteAccount",
  components: {
    Header,
  },

  computed: {
    ...mapState("userStore", {
      errors: (state) => state.errors,
      // status: (state) => state.status,
    }),
  },
};
</script>

<style>
</style>