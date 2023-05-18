import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Teams from "../components/Teams.vue";

const routes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/teams",
    component: Teams,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/teams/:team_id/players",
    component: Teams,
    meta: {
      requiresAuth: true
    }
  },
  // Fail-Gracefully: All 404 Pages will redirect to `/login` page
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login"
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Check if User is Authenticated before Accessing Protected App Routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("jwtToken");

  if (to.meta.requiresAuth && !isAuthenticated) {
    alert("Unauthorized Access!!! \nRedirecting to Login Page!");
    setTimeout(next("/login"), 1000);
  } else {
    next();
  }
});

export default router;
