import { createRouter, createWebHistory } from 'vue-router';
import IndexView from '../views/layout/BoardIndex.vue';
import SimpleIndexView from '../views/layout/SimpleIndex.vue';
import LoginView from '../views/LoginView.vue';
import JoinView from '../views/JoinView.vue';
import BoardListView from '../views/BoardListView.vue';
import BoardWriteView from '../views/BoardWriteView.vue';
import BoardReadView from '../views/BoardReadView.vue';
import BoardEditView from '../views/BoardEditView.vue';
import MainView from '../views/MainView.vue';

/*
  1. 각 스크립트에서 router를 사용하여 데이터를 넘기고 싶을 때는
    path가 아닌 name을 사용해서 push해야 한다.
  2. name은 children의 name만 작성 후 push의 name 속성에 써준다.
  3. 보내는 쪽에서 query 속성에 데이터를 작성 후에
    받는 쪽에서 useRoute선언 후 route.query.파라미터명 으로 받는다. (get 요청에서 query string과 동일한 기능)
*/
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: IndexView,
      children: [
        {
          path: '/', // 부모 path와 같게 써주면 부모 path만 유효함
          name: 'main',
          component: MainView,
        },
      ],
    },
    {
      path: '/',
      name: '',
      component: IndexView,
      children: [
        {
          path: '/board',
          name: 'board',
          component: BoardListView,
        },
      ],
    },
    {
      path: '/',
      name: '',
      component: IndexView,
      children: [
        {
          path: '/board/write',
          name: 'boardWrite',
          component: BoardWriteView,
        },
      ],
    },
    {
      path: '/',
      name: '',
      component: IndexView,
      children: [
        {
          path: '/board',
          name: 'boardRead',
          component: BoardReadView,
        },
      ],
    },
    {
      path: '/',
      name: '',
      component: IndexView,
      children: [
        {
          path: '/board',
          name: 'boardEdit',
          component: BoardEditView,
        },
      ],
    },
    {
      path: '/',
      name: '',
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
      name: '',
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
