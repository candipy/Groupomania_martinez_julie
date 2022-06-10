<template>
  <Header />
  <nav>
    <router-link to="/" class="btn-grad">Home</router-link>
  </nav>
  <h1>Erreur 500</h1>
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
    ...mapState(["status"]),
    ...mapState(["errors"]),
  },
};
</script>

<style>
</style>