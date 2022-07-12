<template>
  <div class="dialogue">
    <h3>Êtes-vous sûr ?</h3>
    <div class="dialogue_btn" @click="noEtat">ANNULER</div>
    <div class="dialogue_btn" @click="deletePost()">CONFIRMER</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DeletePost",

  // computed: {
  //   ...mapState("postStore", {
  //     etat: (state) => state.etat,
  //     info: (state) => state.info,
  //   }),
  // },

  methods: {
    noEtat() {
      this.$store.commit("postStore/setEtat", { etat: "", info: "" });
    },

    deletePost() {
      this.$store.dispatch("postStore/deletePost");
      alert("post delete");
    },
  },
};
</script>

<style></style>
