<template>
  <!-- <div id="app"> -->
  <router-view />
  <!-- </div> -->
</template>

<style lang="scss">
@import "../src/css/reset.css";
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap");
* {
  box-sizing: border-box;
}

body {
  margin: auto;
}

#app {
  width: 100%;

  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fef6e5;
}

a {
  font-weight: bold;
  color: #4e5166;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }

  &.router-link-exact-active {
    color: #4e5166;
  }
}

// $primary-color: #fd2d01;
// $secondary-color: #ffd7d7;
// $tertiary-color: #4e5166;

// $list-color1: $primary-color 0%, $tertiary-color 51%, $primary-color 100%;

// @mixin gradient($direction, $list) {
//   background: -webkit-linear-gradient($direction, $list);
//   background: -moz-linear-gradient($direction, $list);
//   background: -o-linear-gradient($direction, $list);
//   background: linear-gradient($direction, $list);
// }
</style>
