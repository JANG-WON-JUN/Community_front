<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import AsideView from "./views/layout/AsideView.vue";
import HeaderView from "./views/layout/HeaderView.vue";

</script>

<template>
  <el-container class="layout-container">
      <el-aside width="200px">
          <AsideView/>
      </el-aside>
      <el-container>
          <el-header>
              <HeaderView/>
          </el-header>
          <el-main>
              <RouterView/> <!-- 라우터를 통해 가져온 View.vue의 내용을 보여줄 영역 -->
          </el-main>
      </el-container>
  </el-container>
</template>

<style>
body {
  margin: 0;
}
#app .layout-container {
  width : 100vw;
  height : 100vh;
}
</style>
