import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

const routes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  // Fail-Gracefully: 404 pages redirect to `/login` page
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login"
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  // Need to add logic for User API and Pages Authentication Access
  const isAuthenticated = false;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
