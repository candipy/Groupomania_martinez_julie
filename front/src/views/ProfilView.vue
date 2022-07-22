<template>
  <Header />

  <h1>Profil</h1>

  <div class="card">
    <div class="form">
      <div>
        <p>Nom : {{ userInfos.lastName }}</p>
      </div>
      <div>
        <p>Prénom : {{ userInfos.firstName }}</p>
      </div>
      <div>
        <p>Email du compte : {{ userInfos.email }}</p>
      </div>
    </div>

    <div class="" v-if="(this.$route.params.id == userIdSS) & (status !== 'accountDelete')">
      <button class="btn-grad">
        <span @click="deleteStatus">Supprimer le compte</span>
      </button>
    </div>
  </div>
  <div class="dialogue" v-if="status == 'accountDelete'">
    <h3>Êtes-vous sûr de vouloir supprimer votre compte ?</h3>
    <p>Cette opération supprimera également toutes vos publication et cela est irréversible</p>
    <div class="dialogue_btn" @click="noStatus">ANNULER</div>
    <div class="dialogue_btn" @click="deleteAccount()">CONFIRMER</div>

    {{ errors }}
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import btnLogout from "@/components/BtnLogout.vue";

import { mapState } from "vuex";

export default {
  name: "Profil",
  components: {
    Header,
    btnLogout,
  },

  data: () => {
    return {
      userIdSS: JSON.parse(sessionStorage.getItem("userId")),
      token: sessionStorage.getItem("token"),
      axios: require("axios"),
    };
  },

  computed: {
    ...mapState("userStore", {
      userInfos: (state) => state.userInfos,
      status: (state) => state.status,
      errors: (state) => state.errors,
    }),
  },

  beforeMount() {
    this.$store.commit("userStore/logUser", this.$route.params.id);
  },
  mounted() {
    if (sessionStorage.getItem("token") === null) {
      this.$router.push("/");
      return;
    }

    this.$store.dispatch("userStore/getUserInfos");
    this.$store.commit("userStore/setStatus", { status: "" });
  },

  methods: {
    noStatus() {
      this.$store.commit("userStore/setStatus", { status: "" });
    },
    deleteStatus() {
      this.$store.commit("userStore/setStatus", { status: "accountDelete" });
    },
    deleteAccount() {
      this.$store.dispatch("userStore/deleteAccount");
      this.$router.push("/login");
    },
  },
};
</script>

<style></style>
