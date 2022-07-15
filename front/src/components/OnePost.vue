<template>
  <div class="post">
    <div>
      Publié par
      <router-link :to="{ name: 'profil', params: { id: post.UserId } }"> {{ post.User.firstName }} {{ post.User.lastName }} </router-link>

      <div>Créé le {{ cleanDate(post.createdAt) }}</div>
    </div>

    <div class="" v-if="post.UserId == userIdSS">
      <i class="fa fa-pen" @click="etatModify()"> </i>
      <div @click="etatModify()">modifier </div>
      <i class="fa fa-trash" @click="etatDelete()"> </i>
    </div>
    <div class="post_title" v-if="post.title !== null">{{ post.title }}</div>
    <div class="post_message">{{ post.message }}</div>
    <img class="post_img" v-if="post.image !== null" :src="post.image" alt="illustration_post" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "OnePost",

  props: [
    "post",

    // , "postId", "userId", "title", "message", "image", "firstName", "lastName", "date"
  ],

  data: () => {
    return {
      userIdSS: JSON.parse(sessionStorage.getItem("userId")),
    };
  },

  mounted() {
    // let targetPostId = this.$refs.postId;
    // console.log("this.targetPostId :>> ", targetPostId);
    // let postId = targetPostId.dataset.id;
    // console.log("targetPostId.dataset.id :>> ", targetPostId.dataset.id);
    // console.log("postId :>> ", postId);
    // console.log("post :>> ", this.post);
    // this.$store.commit("postStore/setPostId", this.postId);
    // this.$store.dispatch("postStore/getOnePost");
    // console.log("store", this.$store._state.data.postStore);
  },
  computed: {
    ...mapState("postStore", {
      // etat: (state) => state.etat,
    }),
  },

  methods: {
    cleanDate: (date) => {
      return moment(date).format("DD/MM/YYYY à h:mm");
    },

    onFileChange(e) {
      let file = e.target.files[0];
      this.image = file;
    },

    etatModify() {
      this.$store.commit("postStore/setEtat", { etat: "modify", info: "", post: this.post });
      this.$store.commit("postStore/setOnePost", this.post);
    },

    etatDelete() {
      this.$store.commit("postStore/setEtat", { etat: "delete", info: "" });
      this.$store.commit("postStore/setOnePost", this.post);
    },
  },
};
</script>

<style></style>
