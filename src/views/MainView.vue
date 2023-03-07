<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../components/common/axios-config';
import type { BoardType } from '../components/models/board-type';

// 메인화면에서 해야할 것
// 1. 게시판 리스트를 가져온다. >> 아마 aside view에서 해야할 듯?
// 2. boardListView를 만들어서 호출하기!
// 3. asideView에서 타입을 가지고 선택하면 바깥으로 mainView로 가져오기
// 4. mainView에서는 선택된 boardType이 바뀌면 그걸 boardView로 전달하여 bordView에서는
// watch로 보드리스트 조회하는 쪽으로 하면 될듯?
const boardTypes = ref<BoardType[]>();
const boardType = ref<BoardType>();
const router = useRouter();

onMounted(() => {
  axios.get('/boardType').then(function (response) {
    boardTypes.value = response.data.list;
  });
});

const selectMenu = (selected: string) => {
  if (typeof boardTypes.value === 'undefined') return;
  boardType.value = boardTypes.value.find(
    (elem) => elem.boardTypes === selected
  );

  if (typeof boardType.value === 'undefined') return;

  router.push({
    name: 'board',
    query: {
      boardType: boardType.value.boardTypes,
      desc: boardType.value.description,
    },
  });
};
</script>

<template>
  <el-space wrap>
    <el-card
      v-for="boardType in boardTypes"
      v-bind:key="boardType.boardTypes"
      class="box-card"
      style="width: 250px"
    >
      <template #header>
        <div class="card-header">
          <span>{{ boardType.description }}</span>
          <el-button
            class="button"
            text
            @click="selectMenu(boardType.boardTypes)"
            >더보기</el-button
          >
        </div>
      </template>
    </el-card>
  </el-space>
</template>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
