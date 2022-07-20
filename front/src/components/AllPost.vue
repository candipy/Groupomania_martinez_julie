<template>
  <whatsNew />
  <addPost />

  <div class="post" v-for="(post, index) in posts" v-bind:key="index">
    <OnePost v-bind:post="post" />
    <deletePost v-if="(etat == 'delete') & (post.id == this.$store._state.data.postStore.post.id)" />
    <ModifyPost v-if="(etat == 'modify') & (post.id == this.$store._state.data.postStore.post.id)" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import whatsNew from "./WhatsNew.vue";
import AddPost from "@/components/AddPost.vue";
import OnePost from "@/components/OnePost.vue";
import DeletePost from "./DeletePost.vue";
import ModifyPost from "./ModifyPost.vue";

export default {
  name: "AllPost",

  components: {
    AddPost,
    whatsNew,
    OnePost,
    DeletePost,
    ModifyPost,
  },

  data: () => {
    return {
      userIdSS: JSON.parse(sessionStorage.getItem("userId")),
    };
  },

  beforeMount() {
    this.$store.commit("userStore/logUser", this.userIdSS);
  },

  mounted() {
    this.$store.dispatch("postStore/getAllPost");
    this.$store.dispatch("userStore/getUserInfos");
  },

  computed: {
    ...mapState("postStore", {
      etat: (state) => state.etat,
      posts: (state) => state.posts,
      post: (state) => state.post,
    }),
  },
  methods: {},
};
</script>

<style></style>
