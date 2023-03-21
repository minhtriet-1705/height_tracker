import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import HeightTracker from "../components/HeightTracker";
import Setting from "../components/Setting";
import HeightDatabase from "../components/HeightDatabase";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: { name: "setting" },
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/heighttracker",
    name: "heighttracker",
    component: HeightTracker,
  },
  {
    path: "/setting",
    name: "setting",
    component: Setting,
  },
  {
    path: "/heightdatabase",
    name: "heightdatabase",
    component: HeightDatabase,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
