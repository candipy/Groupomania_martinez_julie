<template>
  <Header />
  <nav>
    <router-link to="/" class="btn-grad">Home</router-link>
    <router-link to="/profil" class="btn-grad">Profil</router-link>
  </nav>
  <h1>Fil d'actualités</h1>

  <div class="card">
    <div class="post">
      <p>{{ userInfos.firstName }}, qu'as tu à nous raconter aujourd'hui ?</p>
      <p><i class="fa fa-pen"></i></p>
    </div>

    <div class="form">
      <div class="form__input">
        <label for="titre">Titre</label>
        <input
          type="text"
          v-model="title"
          name="titre"
          id="titre"
          aria-label="titre_post"
          required
        />
      </div>
      <div class="form__input">
        <label for="titre">Message</label>
        <input
          type="text"
          v-model="message"
          name="message"
          id="message"
          aria-label="message_post"
          required
        />
      </div>

      <div class="form__input">
        <label for="image"></label>
        <input
          type="file"
          name="image"

          v-on:change="image"
     
          id="image"
          aria-label="image_post"
          required
        />
      </div>
      <button class="btn-grad" @click="createPost()">
        <span v-if="etat == 'loading'"> Publication en cours</span>
        <span v-else>Publier</span>
      </button>
    </div>
  </div>

  <p>{{ status }}</p>
  <p>{{ errors }}</p>

  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit, ducimus
    quidem minima, ullam, modi distinctio odio excepturi error dolorum totam
    laudantium qui quibusdam illum vitae dicta accusamus provident obcaecati in!
  </p>
  <p>
    lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, a
    corrupti blanditiis nisi unde molestiae. Ab numquam, error labore inventore,
    quas sequi, obcaecati officia qui quasi hic voluptas architecto? Earum.
  </p>
</template>

<script>
import Header from "@/components/Header.vue";

import { mapState } from "vuex";

export default {
  name: "Feed",
  components: {
    Header,
  },

  data: () => {
    return {
      // Saisie Utilisateur:

      title: null,
      message: null,
    };
  },

  mounted() {
    if (sessionStorage.getItem("token") === null) {
      this.$router.push("/login");
      return;
    }

    this.$store.dispatch("userStore/getUserInfos");
  },
  computed: {
    ...mapState("userStore", {
      errors: (state) => state.errors,
      status: (state) => state.status,
      userInfos: (state) => state.userInfos,
    }),
    ...mapState("postStore", {
      etat: (state) => state.etat,
      probleme: (state) => state.probleme,
    }),
  },

  methods: {
    createPost() {
   debugger
      this.$store
        .dispatch("postStore/createPost", {
          title: this.title,
          description: this.message,
          userId: JSON.parse(sessionStorage.getItem("userId")),
          urlImage : this.image
        })
        .then(
          (postCreate) => {
            console.log("postCreate :>> ", postCreate);
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

<style>
</style>