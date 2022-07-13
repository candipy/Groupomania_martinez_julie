<template>
  <div>
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
      <input type="file" name="image" @change="onFileChange" id="image" aria-label="image_post" />
    </div>
    <button class="btn-grad" @click="modifyPost()">
      <span>Publier la modification</span>
    </button>
    <button class="btn-grad" @click="noEtat()">
      <span>Annuler</span>
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ModifyPost",

  data: () => {
    return {
      userIdSS: JSON.parse(sessionStorage.getItem("userId")),
      image: null,
    };
  },
  computed: {
    ...mapState("postStore", {
      post: (state) => state.post,
    }),
  },
  mounted() {
    console.log(this.post);
  },
  methods: {
    noEtat() {
      this.$store.commit("postStore/setEtat", { etat: "", info: "" });
    },

    onFileChange(e) {
      let file = e.target.files[0];
      this.image = file;
    },

    deleteImage() {
      console.log("this.image :>> ", this.image);
      this.image = null;
      console.log("this.image :>> ", this.image);
    },

    modifyPost() {
      let postUpdate = new FormData();
      postUpdate.append("title", this.post.title);
      postUpdate.append("message", this.post.message);
      postUpdate.append("UserId", this.userIdSS);
      postUpdate.append("image", this.image);
      console.log(this.image);

      this.$store
        .dispatch("postStore/modifyPost", postUpdate, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        })
        // .then(
        //   (post) => {
        //     console.log("then de view");
            this.$store.commit("postStore/setEtat", { etat: "", info: "" });
          // },
        //   (error) => {
        //     console.log("error :>> ", error);
        //     if (this.etat == "error_serveur") {
        //       this.$router.push("error500");
        //     }
        //   }
        // );
    },
  },
};
</script>

<style></style>
