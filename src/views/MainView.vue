<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { BoardType } from '../components/models/board-type';
import BoardRouterService from '../components/services/board-router-service';
import boardTypeService from '../components/services/board-type-service';

const boardTypes = ref<BoardType[]>();
const boardType = ref<BoardType>();
const boardRouterService = new BoardRouterService(useRouter());

onMounted(async () => {
  const response = await boardTypeService.getBoardTypes();
  boardTypes.value = response.data.list;
});

const selectMenu = (selected: string) => {
  if (typeof boardTypes.value === 'undefined') return;
  boardType.value = boardTypes.value.find(
    (elem) => elem.boardTypes === selected
  );

  if (typeof boardType.value === 'undefined') return;

  boardRouterService.goBoardList(
    boardType.value.boardTypes,
    boardType.value.description
  );
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
