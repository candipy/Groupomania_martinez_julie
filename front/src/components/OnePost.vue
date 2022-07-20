<template>
  <div class="post">
    <div>
      Publié par
      <router-link :to="{ name: 'profil', params: { id: post.UserId } }"> {{ post.User.firstName }} {{ post.User.lastName }} </router-link>

      <div>Créé le {{ cleanDate(post.createdAt) }}</div>
    </div>

    <div class="" v-if="post.UserId == userIdSS || this.$store._state.data.userStore.userInfos.admin == true">
      <i class="fa fa-pen" @click="etatModify()"> </i>
      <div @click="etatModify()"></div>
      <i class="fa fa-trash" @click="etatDelete()"> </i>
    </div>
    <div class="post_title" v-if="post.title !== null">{{ post.title }}</div>
    <div class="post_message">{{ post.message }}</div>
    <img class="post_img" v-if="post.image !== null" :src="post.image" alt="illustration_post" />
    <div>
      <i :class="classIs" class="fa fa-thumbs-up" @click="like()"></i>
      <div>({{ post.Likes.length }})</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "OnePost",

  props: ["post"],

  data: () => {
    return {
      userIdSS: JSON.parse(sessionStorage.getItem("userId")),
      postLiked: null,
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
  },
  computed: {
    classIs() {
      let arrayLikes = this.post.Likes;

      let postLikeByCurrentUser = arrayLikes.find((e) => e.UserId == this.userIdSS);

      if (postLikeByCurrentUser == undefined) {
        this.postLiked = false;
      } else {
        this.postLiked = true;
      }

      if (this.postLiked == true) {
        return "post_like";
      } else {
        // return "btn-grad-light";
      }
    },
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

    like() {
      this.$store.commit("postStore/setOnePost", this.post);
      console.log("this.post.id :>> ", this.post.id);
      console.log("this.post.UserId :>> ", this.post.UserId);
      this.$store.dispatch("postStore/like", {
        PostId: this.post.id,
        UserId: this.userIdSS,
      });
    },
  },
};
</script>

<style></style>
