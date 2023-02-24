<script setup lang="ts">
import { onMounted } from 'vue'

defineProps<{ title: string }>()

</script>

<template>
  <el-container class="layout-container">
      <el-container>
        <el-header>
            <el-row align="middle" justify="center">
                <h1>{{ title }}</h1>
            </el-row>
        </el-header>
        <el-main>
            <RouterView/> <!-- 라우터를 통해 가져온 View.vue의 내용을 보여줄 영역 -->
        </el-main>
      </el-container>
  </el-container>
</template>

<style>
</style>
