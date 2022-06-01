<template>
  <header>
    <div class="logo-header">
      <img
        src="../assets/icon-above-font-removebg-preview.png"
        alt="Logo_Groupomania_Rouge"
      />
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped lang = "scss">
header {
  width: 100%;
  background-color: #fef6e5;
}
.logo-header {
  overflow: hidden;
  // text-align: left;
  //   height: 200px;
}
img {
  //   overflow: hidden;
  width: 100%;
  //   height: 50%;
  margin-top: -27%;
  margin-bottom: -27%;
}
</style>