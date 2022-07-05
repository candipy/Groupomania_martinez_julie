<template>
  <Header />
  <nav>
    <router-link to="/" class="btn-grad">Home</router-link>
    <router-link to="/feed" class="btn-grad">Fil d'actualités</router-link>
  </nav>

  <h1>Profil</h1>

  <div class="" v-if="this.$route.params.id == userIdSS">
    <button class="">
      <span @click="deleteAccount">Supprimer le compte</span>
    </button>
    <btnLogout />
  </div>
  <div class="" v-else>
    <!-- <button><router-link :to="{ path: '/user/' + this.userIdSS }" class="">Votre Profil</router-link></button> -->

    <btnLogout />
  </div>

  <div class="card">
    <div>
      <p>Nom : {{ userInfos.lastName }}</p>
    </div>
    <div>
      <p>Prénom : {{ userInfos.firstName }}</p>
    </div>
    <div>
      <p>Email du compte : {{ userInfos.email }}</p>
    </div>

    <!-- <AllPostsByUser /> -->
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import btnLogout from "@/components/BtnLogout.vue";
// import AllPostsByUser from "@/components/AllPostsByUser.vue";

import { mapState } from "vuex";

export default {
  name: "Profil",
  components: {
    Header,
    btnLogout,
    // AllPostsByUser,
  },

  data: () => {
    return {
      userInfos: [],
      userIdSS: JSON.parse(sessionStorage.getItem("userId")),
      token: sessionStorage.getItem("token"),
      axios: require("axios"),
    };
  },
  mounted() {
    if (sessionStorage.getItem("token") === null) {
      this.$router.push("/login");
      return;
    }

    this.axios.defaults.headers.common["Authorization"] = "Bearer " + this.token;

    this.axios
      .get("http://localhost:3000/api/auth/user/" + this.$route.params.id)

      .then((response) => {
        this.userInfos = response.data;
      })

      .catch((error) => console.log("error :>> ", error));
  },

  methods: {
    deleteAccount() {
      this.$store.dispatch("userStore/deleteAccount").then(
        () => {
          this.$router.push("deleteAccount");
        },
        (error) => {
          console.log("error :>> ", error);
          if (this.status == "error_serveur") {
            this.$router.push("error500");
          }
        }
      );
    },
  },
};
</script>

<style></style>
