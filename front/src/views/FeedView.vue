<template>
  <Header />

  <h1>Fil d'actualités</h1>

  <div class="card">
    <allPost />
  </div>
</template>

<script>
import { mapState } from "vuex";

import Header from "@/components/Header.vue";
import AddPost from "@/components/AddPost.vue";
import allPost from "@/components/AllPost.vue";

export default {
  name: "Feed",
  components: {
    Header,
    AddPost,
    allPost,
  },

  data: () => {
    return {
      userIdSS: JSON.parse(sessionStorage.getItem("userId")),
    };
  },

  mounted() {
    if (sessionStorage.getItem("token") === null) {
      this.$router.push("/");
      return;
    }
  },
};
</script>

<style></style>
