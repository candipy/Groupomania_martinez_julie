<template>
  <div v-if="mode !== 'create'" class="whatsNew" @click="createNewPost()">
    <p>Exprimes toi !</p>

    <p><i class="fa fa-pen"></i></p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "whatsNew",
  components: {},

  computed: {
    ...mapState("postStore", {
      mode: (state) => state.mode,
    }),
  },
  methods: {
    createNewPost() {
      if (this.mode == "") {
        this.$store.commit("postStore/setMode", "create");
      } else {
        this.$store.commit("postStore/setMode", "");
      }
    },
  },
};
</script>

<style></style>
