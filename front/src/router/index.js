import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

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
    path: "/profil",
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
