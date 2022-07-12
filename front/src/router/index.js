import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signup",
    name: "signup",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/SignupView.vue"),
  },

  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
  {
    path: "/feed",
    name: "feed",
    component: () => import(/* webpackChunkName: "about" */ "../views/FeedView.vue"),
  },
  {
    path: "/user/:id",
    name: "profil",
    component: () => import(/* webpackChunkName: "about" */ "../views/ProfilView.vue"),
  },
  {
    path: "/error500",
    name: "error500",
    component: () => import(/* webpackChunkName: "about" */ "../views/Error500View.vue"),
  },
  // {
  //   path: "/deleteAccount",
  //   name: "deleteAccount",
  //   component: () => import(/* webpackChunkName: "about" */ "../views/DeleteAccountView.vue"),
  // },
  // {
  //   path: "/posts/:id",
  //   name: "OnePost",
  //   component: () => import(/* webpackChunkName: "about" */ "../views/OnePost.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach((next) => {
//   debugger;
//   const token = sessionStorage.getItem("token");
//   if (token) {
//     console.log("token :>> ", token);
//     instance.defaults.headers.common["Authorization"] = "Bearer " + token;
//     console.log(instance.defaults.headers.common["Authorization"]);
//   }
//   // else {
//   //   next("./login");
//   // }
// });

export default router;
