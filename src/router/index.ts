import { createRouter, createWebHistory } from 'vue-router';
import loginStore from '../stores/login-store';
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
  4. 만약에 name이 다르더라도 path가 동일하면 겹치는 path를 가진 페이지에서 새로고침 했을 때
    겹체는 path를 가지는 페이지 중 다른 페이지로 이동해버린다. (즉 path, name은 고유해야 됨, 새로고침 시 path로 routing 하는듯.)
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
          path: '/boards',
          name: 'board',
          component: BoardListView,
        },
      ],
    },
    {
      path: '/',
      name: '',
      meta: { authRequired: true },
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
      meta: { authRequired: true },
      component: IndexView,
      children: [
        {
          path: '/board/edit',
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

router.beforeEach(function (to, from, next) {
  // to: 이동할 url에 해당하는 라우팅 객체
  const authRequired = to.matched.some(function (routeInfo) {
    return routeInfo.meta.authRequired;
  });

  console.log(authRequired);
  if (!authRequired) {
    next();
  } else {
    const useLoginStore = loginStore();

    // 이동할 페이지에 인증 정보가 필요하면 경고 창을 띄우고 페이지 전환은 하지 않음
    // 로그인을 한 사용자가 아니라면 loginView로 이동
    if (!useLoginStore.isAuthedMember) {
      next({ name: 'login' });
    } else {
      next();
    }
  }
});

export default router;
