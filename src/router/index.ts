import { createRouter, createWebHistory } from 'vue-router';
import IndexView from '../views/index.vue';
import SimpleIndexView from '../views/SimpleIndex.vue';
import Main from '../views/main.vue';
import LoginView from '../views/loginView.vue';
import JoinView from '../views/JoinView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: IndexView,
      children: [
        {
          path: '/', // 부모 path와 같게 써주면 부모 path만 유효함
          name: 'main',
          component: Main,
        },
      ],
    },
    {
      path: '/',
      name: 'login',
      props: { title: '로그인' }, // 기본 타이틀은 routing 할 때 작성하고, vue 파일에서 props로 꺼낸다.
      component: SimpleIndexView,
      children: [
        {
          path: '/login',
          name: 'login',
          component: LoginView,
        },
      ],
    },
    {
      path: '/',
      name: 'join',
      props: { title: '회원가입' },
      component: SimpleIndexView,
      children: [
        {
          path: '/join',
          name: 'join',
          component: JoinView,
        },
      ],
    },
  ],
});

export default router;
