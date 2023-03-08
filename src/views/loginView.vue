<script setup lang="ts">
import axios from '../components/common/axios-config';
import loginStore from '../stores/login-store';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Member } from '../components/models/member';
import { alertConfirm } from '../components/common/alert';
import { focusOn } from '../components/common/utils';

// ref란 vue에서 컴포넌트 또는 DOM에 접근하기 위해 사용하는 속성이다.
const emailRef = ref<HTMLElement>();
const passwordRef = ref<HTMLElement>();

// const email = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();
const useLoginStore = loginStore();

onMounted(() => focusOn(emailRef.value));

const login = function () {
  axios
    .post('/login', {
      email: email.value,
      password: password.value,
    })
    .then(function (response) {
      localStorage.setItem('accessToken', response.data.token.accessToken);
      localStorage.setItem('refreshToken', response.data.token.refreshToken);

      // store에 회원정보 저장하기
      useLoginStore.login(
        new Member(response.data.email, response.data.nickname)
      );

      router.push({ name: 'main' });
    })
    .catch(function (error) {
      if (error.response.status === 401) {
        const exceptionName = error.response.data.exceptionName;

        alertConfirm('알림', error.response.data.errorMessage, () => {
          if (exceptionName === 'UsernameNotFoundException') {
            focusOn(emailRef.value);
          } else {
            focusOn(passwordRef.value);
          }
        });
      }
    });
};
</script>

<template>
  <div class="login">
    <!-- v-model란 자동으로 vue의 데이터 속성에 연결된다., -->
    <el-input
      class="mt-2"
      v-model="email"
      ref="emailRef"
      @keyup.enter="login"
      type="email"
      placeholder="이메일을 입력해 주세요"
    />
    <el-input
      class="mt-2"
      v-model="password"
      ref="passwordRef"
      type="password"
      @keyup.enter="login"
      placeholder="비밀번호를 입력해 주세요"
    />
    <el-row justify="end">
      <el-button class="mt-2" type="info" @click="router.push({ name: 'join' })"
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
