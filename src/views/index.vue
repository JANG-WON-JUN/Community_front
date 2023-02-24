<script setup lang="ts">
import HeaderView from "../views/layout/HeaderView.vue";
import AsideView from "../views/layout/AsideView.vue";
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
</style>
