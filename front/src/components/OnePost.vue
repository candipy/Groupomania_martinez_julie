<template>
  <div class="post">
    <div>
      Publié par
      <router-link :to="{ name: 'profil', params: { id: userId } }">{{ firstName }} {{ lastName }}</router-link>
      <div>Créé le {{ cleanDate(date) }}</div>
    </div>
    <div class="" v-if="userId == userIdSS"><i class="fa fa-pen" @click="modeModify()"> </i><i class="fa fa-trash" @click="etatDelete()"> </i></div>
    <div class="post_title" v-if="title !== null">{{ title }}</div>
    <div class="post_message">{{ message }}</div>
    <img class="post_img" v-if="image !== null" :src="image" alt="illustration_post" />
  </div>

  <!-- <deletePost @click="updatePostList" v-if="(etat == 'delete') & (postId == this.$store._state.data.postStore.postId)" /> -->

  <!-- <div v-if="etat == 'delete'">{{ info }}</div> -->

  <!-- <div v-if="etat == 'modify'">
    <div class="form__input">
      <label for="title">Modifier le titre</label>
      <input type="text" id="title" arial-label="modify_title_post" v-model="post.title" />
    </div>
    <div class="form__input">
      <label for="message">Modifier le message</label>
      <input type="text" id="message" aria-label="modify_message_post" v-model="post.message" />
    </div>
    <div class="form__input">
      <label for="image"></label>
      <input type="file" name="image" @change="onFileChange" id="image" aria-label="image_post" required />
    </div>
    <button class="btn-grad" @click="modifyPost()">
      <span>Publier la modification</span>
    </button>
  </div> -->
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "OnePost",

  props: ["postId", "userId", "title", "message", "image", "firstName", "lastName", "date", "likes"],

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
      post: (state) => state.post,
      etat: (state) => state.etat,
      // info: (state) => state.info,
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

    modeModify() {
      this.$store.commit("postStore/setEtat", { etat: "modify", info: "" });
      console.log("store", this.$store._state.data.postStore);
    },
    modifyPost() {
      let postUpdate = new FormData();
      postUpdate.append("title", this.post.title);
      postUpdate.append("message", this.post.message);
      postUpdate.append("userId", this.userIdSS);
      postUpdate.append("image", this.image);
      // console.log("tjis.post.title :>> ", this.post.title);
      // console.log("this.userIdSS :>> ", this.userIdSS);
      // console.log("this.post.message :>> ", this.post.message);
      // console.log("this.image :>> ", this.image);
      this.$store
        .dispatch("postStore/modifyPost", postUpdate, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("response :>> ", response);
        })
        .catch((error) => console.log("error :>> ", error));
    },

    etatDelete() {
      this.$store.commit("postStore/setEtat", { etat: "delete", info: "" });
      this.$store.commit("postStore/setPostId", this.postId);
      console.log("store", this.$store._state.data.postStore);
    },
  },
};
</script>

<style></style>
