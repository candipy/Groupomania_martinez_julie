<template>
  <Header />
  <nav>
    <router-link to="/" class="btn-grad">Home</router-link>
    <router-link :to="{ path: '/user/' + this.userIdSS }" class="btn-grad">Votre Profil</router-link>
    <router-link to="/feed" class="btn-grad">Fil d'actualités</router-link>
    <btnLogout />
  </nav>
  <div class="post" v-if="etat !== 'delete'">
    <div>
      Publié par
      <!-- {{ post }} -->
      <!-- {{ post.User.firstName }} {{ post.User.lastName }} -->
      <span :data-id="post.id">Créé le {{ cleanDate(post.createdAt) }}</span>
    </div>
    <div class="" v-if="post.userId == userIdSS"><i class="fa fa-pen" @click="modeModify()"> </i><i class="fa fa-trash" @click="deletePost()"> </i></div>
    <h4 v-if="post.title !== null">{{ post.title }}</h4>
    <div>{{ post.message }}</div>
    <img class="post_img" v-if="post.image !== null" :src="post.image" alt="illustration_post" />
  </div>

  <div v-if="etat == 'delete'">{{ info }}</div>

  <div v-if="etat == 'modify'">
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
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import Header from "@/components/Header.vue";
import btnLogout from "@/components/BtnLogout.vue";
export default {
  name: "OnePost",
  components: { Header, btnLogout },

  data: () => {
    return {
      userIdSS: JSON.parse(sessionStorage.getItem("userId")),
    };
  },

  mounted() {
    console.log("this :>> ", this);
    this.$store.commit("postStore/setPostId", this.$route.params.id);
    this.$store.dispatch("postStore/getOnePost");
    console.log("store", this.$store._state.data.postStore);
  },
  computed: {
    ...mapState("postStore", {
      post: (state) => state.post,
      etat: (state) => state.etat,
      info: (state) => state.info,
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
      console.log("tjis.post.title :>> ", this.post.title);
      console.log("this.userIdSS :>> ", this.userIdSS);
      console.log("this.post.message :>> ", this.post.message);
      console.log("this.image :>> ", this.image);
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

    deletePost() {
      this.$store.dispatch("postStore/deletePost");
    },
  },
};
</script>

<style></style>
