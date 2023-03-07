<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { focusOn } from '../components/common/utils';
import { useRouter, useRoute } from 'vue-router';
import loginStore from '../stores/login-store';
import boardService from '../components/services/board-service';
import BoardRouterService from '../components/services/board-router-service';
import BoardSearchCondition from '../components/models/board-search-condition';

const keywordRef = ref<HTMLElement>();
const useLoginStore = loginStore();
const route = useRoute();
const boardRouterService = new BoardRouterService(useRouter());

const boardType = ref('');
const description = ref('');

const boards = ref([]);
const keyword = ref('');
const searchType = ref('');
const searchOrder = ref('');
const pageNumber = ref(0);
const pageSize = ref(0);
const totalSize = ref(0);

onMounted(() => {
  focusOn(keywordRef.value);
  setBoardInfo();
  getBoards();
});

watch(
  () => route.query.boardType,
  () => {
    if (route.query.boardType === undefined) {
      return;
    }
    pageNumber.value = 0;
    setBoardInfo();
    getBoards();
  },
  {
    deep: true, // 객체의 내부값이 바뀌었을 떄 watcher가 동작하도록 설정
  }
);

const setBoardInfo = () => {
  const type = route.query.boardType;
  const desc = route.query.desc;

  if (typeof type === 'string' && typeof desc === 'string') {
    boardType.value = type;
    description.value = desc;
  }
};

const getBoards = async () => {
  const condition = new BoardSearchCondition(
    pageNumber.value - 1,
    false,
    keyword.value,
    boardType.value,
    searchType.value,
    searchOrder.value
  );

  try {
    const response = await boardService.getBoards(condition);

    boards.value = response.data.list;
    pageNumber.value = response.data.pageInfo.pageNumber + 1;
    pageSize.value = response.data.pageInfo.pageSize;
    totalSize.value = response.data.pageInfo.totalSize;
  } catch (error: any) {
    console.log('글 리스트 조회 오류 발생');
  }
};

const readBoard = function (row: any, column: any, event: any) {
  boardRouterService.goBoardRead(row.id);
};
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="16"
      ><h2>{{ description }}</h2></el-col
    >
    <el-col :span="8" class="text-end" v-if="useLoginStore.isAuthedMember">
      <el-button
        type="primary"
        @click="boardRouterService.goBoardWrite(boardType)"
        >글쓰기</el-button
      >
    </el-col>
  </el-row>
  <el-divider />
  <el-table
    class="mt-2 mb-40 mh-450"
    :data="boards"
    border
    style="width: 100%"
    @row-click="readBoard"
    empty-text="등록된 글이 없습니다."
  >
    <el-table-column
      prop="id"
      label="글번호"
      header-align="center"
      align="center"
      width="100"
    />
    <el-table-column prop="title" label="제목" header-align="center" />
    <el-table-column
      prop="regDate"
      label="등록일"
      header-align="center"
      align="center"
      width="160"
    />
    <el-table-column
      prop="writerNickname"
      label="작성자"
      header-align="center"
      align="center"
      width="160"
    />
    <el-table-column
      prop="views"
      label="조회수"
      header-align="center"
      align="center"
      width="100"
    />
  </el-table>
  <el-pagination
    class="mb-40"
    layout="prev, pager, next"
    v-model:currentPage="pageNumber"
    :page-size="pageSize"
    :total="totalSize"
    :background="true"
    :pager-count="11"
    @current-change="getBoards"
  />
  <el-row :gutter="20">
    <el-col :span="12"><div class="grid-content ep-bg-purple" /></el-col>
    <el-col :span="10">
      <el-input
        v-model="keyword"
        placeholder="검색어를 입력해 주세요."
        class="input-with-select"
        ref="keywordRef"
        @keyup.enter="getBoards"
      >
        <template #prepend>
          <el-select
            v-model="searchType"
            placeholder="구분"
            style="width: 210px"
            :default-first-option="true"
          >
            <el-option label="글제목" value="T" />
            <el-option label="글내용" value="C" />
            <el-option label="작성자" value="W" />
            <el-option label="글제목 + 글내용" value="TC" />
            <el-option label="글제목 + 작성자" value="TW" />
            <el-option label="글내용 + 작성자" value="CW" />
            <el-option label="글제목 + 글내용 + 작성자" value="TWC" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="getBoards()" />
        </template>
      </el-input>
    </el-col>
    <el-col :span="2">
      <el-select
        v-model="searchOrder"
        placeholder="정렬"
        :default-first-option="true"
        @change="getBoards"
      >
        <el-option label="조회순" value="V" />
        <el-option label="최신순" value="N" />
        <el-option label="추천순" value="L" />
      </el-select>
    </el-col>
  </el-row>
</template>

<style>
.mb-40 {
  margin-bottom: 40px;
}
</style>
