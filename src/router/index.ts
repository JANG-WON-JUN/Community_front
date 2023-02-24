import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/index.vue";
import SimpleIndexView from "../views/SimpleIndex.vue";
import LoginView from "../views/loginView.vue";
import Main from "../views/main.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: IndexView,
      children: [
        {
        path: '/', // 부모 path와 같게 써주면 부모 path만 유효함
        name: 'main',
        component: Main,
        }
      ]
    },
    {
      path: "/",
      name: "simpleIndex",
      props: {title : '로그인'}, // 기본 타이틀은 routing 할 때 작성하고, vue 파일에서 props로 꺼낸다.
      component: SimpleIndexView,
      children: [
        {
        path: '/login',
        name: 'login',
        component: LoginView,
        }
      ]
    },
    /*
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    */
  ],
});

export default router;
