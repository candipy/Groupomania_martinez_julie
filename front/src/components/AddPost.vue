<template>
  <div v-if="mode === 'create'" class="form">
    <div class="form__input">
      <label for="titre">Titre</label>
      <input type="text" v-model="title" name="titre" id="titre" aria-label="titre_post" required maxlength="250" />
    </div>
    <div class="form__input">
      <label for="titre">Message</label>
      <input type="text" v-model="message" name="message" id="message" aria-label="message_post" required />
    </div>

    <div class="form__input">
      <label for="image"></label>
      <input type="file" name="image" @change="onFileChange" id="image" aria-label="image_post" required />
    </div>
    <button class="btn-grad" @click="createPost()">
      <span v-if="etat == 'loading'"> Publication en cours</span>
      <span v-else>Publier</span>
    </button>
    <p v-if="etat == 'error_auth'" class="form__error">Vous n'êtes pas authorisé à faire cela</p>
  </div>

  <onePost v-if="mode === 'success'" />
</template>

<script>
import { mapState } from "vuex";
import onePost from "@/components/OnePost.vue";

export default {
  name: "AddPost",
  components: { onePost },

  data: () => {
    return {
      // Saisie Utilisateur:

      title: "",
      message: "",
      image: null,
    };
  },

  computed: {
    ...mapState("postStore", {
      etat: (state) => state.etat,
      //   probleme: (state) => state.probleme,
      mode: (state) => state.mode,
    }),
  },

  methods: {
    onFileChange(e) {
      let file = e.target.files[0];
      this.image = file;
    },

    createPost() {
      let newPost = new FormData();
      newPost.append("title", this.title);
      newPost.append("message", this.message);
      newPost.append("userId", JSON.parse(sessionStorage.getItem("userId")));
      newPost.append("image", this.image);

      this.$store
        .dispatch("postStore/createPost", newPost, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        })
        .then(
          (postCreate) => {
            // console.log("store", this.$store._state.data.postStore);
            this.$store.commit("postStore/setMode", "success"), console.log("postCreate :>> ", postCreate);
          },
          (errorCreatePost) => {
            console.log("errorCreatePost :>> ", errorCreatePost);
            if (this.etat == "error_serveur") {
              this.$router.push("error500");
            }
          }
        );
    },
  },
};
</script>

<style></style>
