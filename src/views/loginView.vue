<script setup lang="ts">
// 화면 구성 후 email과 password를 넘기면 됨
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../components/common/axios-config';

// ref란 vue에서 컴포넌트 또는 DOM에 접근하기 위해 사용하는 속성이다.
const emailInput = ref<HTMLElement>();
const email = ref('');
const password = ref('');
const router = useRouter();

onMounted(() => {
  if (emailInput.value) {
    emailInput.value.focus();
  }
});

const login = function () {
  alert('login');
  axios
    .post('/login', {
      //email: email.value,
      //password: password.value
      email: 'admin1@google.com',
      password: '1234',
    })
    .then(function (response) {
      localStorage.setItem('accessToken', response.data.token.accessToken);
      localStorage.setItem('refreshToken', response.data.token.refreshToken);

      // store에 회원정보 저장하기
      //store.commit('loginSuccess', new Member(response.data.email, response.data.nickName));

      // vue-router에서 useRouter를 import 후 화면이동하기
      router.push({ name: 'home' });
    })
    .catch(function (error) {});
};
</script>

<template>
  <div class="login">
    <!-- v-model란 자동으로 vue의 데이터 속성에 연결된다., -->
    <el-input
      class="mt-2"
      v-model="email"
      ref="emailInput"
      @keyup.enter="login"
      type="email"
      placeholder="이메일을 입력 해 주세요"
    />
    <el-input
      class="mt-2"
      v-model="password"
      type="password"
      @keyup.enter="login"
      placeholder="비밀번호를 입력 해 주세요"
    />
    <el-row justify="end">
      <el-button
        class="mt-2"
        type="info"
        @click="router.push({ path: '/join' })"
        >회원가입</el-button
      >
      <el-button class="mt-2" type="primary" @click="login()">로그인</el-button>
    </el-row>
  </div>
</template>

<style>
.el-row {
  margin-bottom: 20px;
  height: inherit;
}
</style>
