<!-- <template>
  <div class="post" v-for="post in posts" :key="post.id">
    <div>Publié par {{ post.User.firstName }} {{ post.User.lastName }}</div>
    <router-link :to="{ path: '/posts/' + post.id }" v-if="post.userId == userIdSS"><i class="fa fa-pen"></i></router-link>
    <h4>{{ post.title }}</h4>
    <div>{{ post.message }}</div>
    <img v-if="post.urlImage !== null" :src="post.urlImage" alt="illustration_post" />
  </div>
</template>

<script>
export default {
  name: "AllPostsByUser",

  data: () => {
    return {
      posts: [],
      userIdSS: JSON.parse(sessionStorage.getItem("userId")),
      token: sessionStorage.getItem("token"),
      axios: require("axios"),
    };
  },

  mounted() {
    this.axios.defaults.headers.common["Authorization"] = "Bearer " + this.token;

    this.axios
      .get("http://localhost:3000/api/posts/user/" + this.$route.params.id)

      .then((response) => {
        this.posts = response.data;
      })

      .catch((error) => console.log("error :>> ", error));
  },

  // updated() {
  //   this.axios.defaults.headers.common["Authorization"] = "Bearer " + this.token;

  //   this.axios
  //     .get("http://localhost:3000/api/posts/user/" + this.$route.params.id)

  //     .then((response) => {
  //       this.posts = response.data;
  //     })

  //     .catch((error) => console.log("error :>> ", error));
  // },

  methods: {},
};
</script>

<style></style> -->
