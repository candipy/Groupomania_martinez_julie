<template>
  <div class="dialogue">
    <h3>Êtes-vous sûr ?</h3>
    <div class="dialogue_btn" @click="noEtat()">ANNULER</div>
    <div class="dialogue_btn" @click="deletePost()">CONFIRMER</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DeletePost",

  methods: {
    noEtat() {
      this.$store.commit("postStore/setEtat", { etat: "", info: "" });
    },

    deletePost() {
      this.$store.dispatch("postStore/deletePost");
    },
  },
};
</script>

<style></style>
