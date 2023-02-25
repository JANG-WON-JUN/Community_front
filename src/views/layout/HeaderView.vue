<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import loginStore from '../../stores/loginStore';

const useLoginStore = loginStore();
const router = useRouter();

const logout = function () {
  useLoginStore.logout;
  router.push({ name: 'home' });
};
</script>

<template>
  <el-row :gutter="20" align="middle">
    <el-col :span="16">
      <el-link :underline="false" @click="router.push({ path: '/' })"
        >로고</el-link
      >
    </el-col>
    <el-col :span="8">
      <el-descriptions v-if="useLoginStore.isAuthedMember">
        <el-descriptions-item width="100%">
          {{ useLoginStore.getMember.nickname }}님 안녕하세요
          <el-button type="danger" @click="logout">로그아웃</el-button>
        </el-descriptions-item>
      </el-descriptions>
      <el-button v-else type="primary" @click="router.push({ path: '/login' })"
        >로그인</el-button
      >
    </el-col>
  </el-row>
</template>

<style>
.el-row {
  margin-bottom: 20px;
  height: inherit;
}
</style>
