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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
