<template>
   <button class="">
        <span @click="logout"> Deconnexion</span>
      </button>
</template>

<script>



export default {
name: "btnLogout",




methods:{
logout() {
      this.$store.commit("userStore/logout");
      this.$router.push("/");
    },
},
}
</script>

<style>

</style>