<template>
  <div v-if="mode !== 'create'" class="whatsNew">
    <p>Exprimes toi !</p>

    <p><i @click="createNewPost()" class="fa fa-pen"></i></p>
  </div>
  <!-- <div v-else class="whatsNew">
    <p>Nouvelle publication</p>
  </div> -->
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "whatsNew",
  components: {},

  computed: {
    ...mapState("userStore", {
      userInfos: (state) => state.userInfos,
    }),
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
