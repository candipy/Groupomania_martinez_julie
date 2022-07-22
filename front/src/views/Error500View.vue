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
  mounted() {
    if (sessionStorage.getItem("token") === null) {
      this.$router.push("/");
      return;
    }
  },
  computed: {
    ...mapState("userStore", {
      errors: (state) => state.errors,
    }),
  },
};
</script>

<style></style>
