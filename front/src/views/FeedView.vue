<template>
  <Header />
  <nav>
    <router-link to="/" class="btn-grad">Home</router-link>
    <router-link to="/profil" class="btn-grad">Profil</router-link>
  </nav>
  <h1>Fil d'actualités</h1>
  <p>{{ status }}</p>
  <p>{{ errors }}</p>
  <p>{{ user }}</p>
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit, ducimus
    quidem minima, ullam, modi distinctio odio excepturi error dolorum totam
    laudantium qui quibusdam illum vitae dicta accusamus provident obcaecati in!
  </p>
  <p>
    lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, a
    corrupti blanditiis nisi unde molestiae. Ab numquam, error labore inventore,
    quas sequi, obcaecati officia qui quasi hic voluptas architecto? Earum.
  </p>
</template>

<script>
import Header from "@/components/Header.vue";

import { mapState } from "vuex";

export default {
  name: "Feed",
  components: {
    Header,
  },
  computed: {
    ...mapState("userStore", {
      errors: (state) => state.errors,
      status: (state) => state.status,
      userInfos: (state) => state.userInfos,
    }),
  },
};
</script>

<style>
</style>