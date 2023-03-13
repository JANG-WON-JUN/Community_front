<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import loginStore from '../../stores/login-store';
import boardTypeStore from '../../stores/board-type-store';
import type { BoardType } from '../../components/models/board-type';
import boardTypeService from '../../components/services/board-type-service';
import BoardRouterService from '../../components/services/board-router-service';

const useLoginStore = loginStore();
const useBoardTypeStore = boardTypeStore();
const router = useRouter();
const boardRouterService = new BoardRouterService(useRouter());

const boardTypes = ref<BoardType[]>();
const boardType = ref<BoardType>();
const defaultActiveMenu = ref('');

onMounted(async () => {
  const response = await boardTypeService.getBoardTypes();
  boardTypes.value = response.data.list;
  useBoardTypeStore.setBoardTypes(boardTypes.value);
  // boardTypeStore에서 가져와서 새로고침하더라도 유지해야 됨
  defaultActiveMenu.value = useBoardTypeStore.getCurrentBoardType;
});

const selectMenu = (selected: string) => {
  if (typeof boardTypes.value === 'undefined') return;

  useBoardTypeStore.setCurrentBoardTypes(selected);

  boardType.value = boardTypes.value.find(
    (elem) => elem.boardTypes === selected
  );

  if (typeof boardType.value === 'undefined') return;

  boardRouterService.goBoardList(
    boardType.value.boardTypes,
    boardType.value.description
  );
};

const logout = function () {
  useLoginStore.logout();
  router.push({ name: 'main' });
};
</script>

<template>
  <el-container class="layout-container" style="width: 1500px">
    <el-aside width="200px">
      <el-scrollbar>
        <el-link :underline="false" @click="router.push({ path: '/' })"
          ><el-image
            style="width: 170px; height: 100px"
            src="/assets/images/main-logo.jpg"
            fit="contain"
        /></el-link>
        <!-- https://element-plus.org/en-US/component/menu.html#submenu-slots 속성들 참고하기 -->
        <!-- RouterLink를 쓰지않고 프로그래밍 방법으로 라우터를 사용한다. https://v3.router.vuejs.org/kr/guide/essentials/navigation.html -->
        <el-menu
          text-color="#000"
          @select="selectMenu"
          :default-active="defaultActiveMenu"
          class="el-menu-vertical-demo"
        >
          <el-menu-item-group>
            <el-menu-item
              v-for="boardType in boardTypes"
              :index="boardType.boardTypes"
              :indexPath="boardType.description"
              :key="boardType.boardTypes"
            >
              {{ boardType.description }}
            </el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>
        <el-row :gutter="20" align="middle">
          <el-col
            class="txt-right"
            :span="24"
            v-if="useLoginStore.isAuthedMember"
          >
            <span>{{ useLoginStore.getMember.nickname }}님 안녕하세요</span>
            <el-button type="danger" @click="logout()" style="margin-left: 10px"
              >로그아웃</el-button
            >
          </el-col>
          <el-col :span="24" v-else class="text-end">
            <el-button type="primary" @click="router.push({ name: 'login' })"
              >로그인</el-button
            >
          </el-col>
        </el-row>
      </el-header>
      <el-main class="mt-5">
        <!-- 라우터를 통해 가져온 View.vue의 내용을 보여줄 영역 -->
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-row {
  margin-bottom: 20px;
  height: inherit;
}
</style>
