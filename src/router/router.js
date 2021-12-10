import Landing from "../pages/Landing.vue";
const Guild = () =>
  import(/* webpackChunkName: "Guild" */ "../pages/Guild.vue");
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Landing,
  },
  {
    path: "/:id",
    props: true,
    component: Guild,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
