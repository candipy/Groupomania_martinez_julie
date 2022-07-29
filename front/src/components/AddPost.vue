<template>
  <div v-if="mode === 'create'" class="form">
    <div class="form__row">
      <h2>Créer un post</h2>
      <div><i @click="noEtat()" class="fa fa-x"></i></div>
    </div>

    <div class="form__input">
      <label for="titre"></label>
      <input type="text" v-model="title" name="titre" id="titre" aria-label="titre_post" required maxlength="250" placeholder="Titre (Requis)" />
    </div>
    <div class="form__input">
      <label for="titre"> </label>
      <input type="text" v-model="message" name="message" id="message" aria-label="message_post" placeholder="Message (Requis)" required />
    </div>

    <div class="form__input">
      <label for="image"></label>
      <input type="file" name="image" @change="onFileChange" id="image" aria-label="image_post" required />
    </div>
    <button class="btn-grad" :class="classIs" :disabled="isDisabledAttribute" @click="createPost()">
      <span v-if="etat == 'loading'"> Publication en cours</span>
      <span v-else>Publier</span>
    </button>

    <p v-if="etat == 'error_auth'" class="form__error">Vous n'êtes pas authorisé à faire cela</p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AddPost",

  data: () => {
    return {
      title: null,
      message: null,
      image: null,
    };
  },

  computed: {
    ...mapState("postStore", {
      etat: (state) => state.etat,

      mode: (state) => state.mode,
    }),

    classIs() {
      if (
        // Si il y a une erreur, la classe est "btn-grad-disabled"
        this.title == null ||
        this.message == null
      ) {
        return "btn-grad--disabled";
      } else {
        return "btn-grad";
      }
    },

    isDisabledAttribute() {
      // Si il y a une erreur, le bouton est désactivé
      if (this.title == null || this.message == null) {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    noEtat() {
      this.$store.commit("postStore/setMode", "");
    },
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
            this.$store.commit("postStore/setMode", "success");
            this.$store.commit("postStore/setEtat", { etat: "", info: "" });
            this.title = null;
            this.message = null;
            this.image = null;
          },
          (errorCreatePost) => {
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
