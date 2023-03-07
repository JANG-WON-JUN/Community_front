<script setup lang="ts">
// https://element-plus.org/en-US/component/button.html 에서 디자인 가능
// https://ckeditor.com/docs/ckeditor5/latest/installation/frameworks/css.html 에서 에디터 확인 가능
</script>

<template>
  <!-- 라우터를 통해 가져온 View.vue의 내용을 보여줄 영역 -->
  <RouterView />
</template>

<style>
body {
  margin: 0;
}

.layout-container {
  width: 100%;
  height: 1024px;
}
</style>
