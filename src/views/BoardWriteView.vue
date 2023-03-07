<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { alertConfirm } from '../components/common/alert';
import { focusOn } from '../components/common/utils';
import {
  boardCreate,
  boardCreateErrMsg,
} from '../components/models/board-write';
import {
  boardCreateRule,
  boardCreateSetErrMsg,
} from '../components/rules/board-rule';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import boardService from '../components/services/board-service';
import BoardRouterService from '../components/services/board-router-service';
import boardTypeStore from '../stores/board-type-store';

const boardFormRef = ref<FormInstance>();
const titleRef = ref<HTMLElement>();
const route = useRoute();
const boardRouterService = new BoardRouterService(useRouter());
const useBoardTypeStore = boardTypeStore();
const boardType = ref(route.query.boardType);

const board = boardCreate;
const boardErrMsg = boardCreateErrMsg;
const boardRules = boardCreateRule;
const setErrMsg = boardCreateSetErrMsg;

onMounted(() => {
  focusOn(titleRef.value);

  if (boardType.value !== null && typeof boardType.value === 'string') {
    board.value.boardType = boardType.value;
  }
});

const createBoard = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        await boardService.createBoard(board.value);
        alertConfirm('알림', '글이 등록되었습니다.', () =>
          boardRouterService.goBoardList(
            boardType.value,
            useBoardTypeStore.getBoardType(boardType.value).description
          )
        );
      } catch (error: any) {
        console.log(error);
        setErrMsg(error.response.data);
      }
    }
  });
};
</script>

<template>
  <el-form
    ref="boardFormRef"
    :model="board"
    :rules="boardRules"
    label-width="100px"
    label-position="top"
    :validate-on-rule-change="false"
    @submit.prevent
  >
    <el-form-item label="제목" required prop="title" :error="boardErrMsg.title">
      <el-input v-model="board.title" ref="titleRef" placeholder="제목" />
    </el-form-item>
    <ckeditor :editor="ClassicEditor" v-model="board.content"></ckeditor>
    <el-row class="row-bg mt-3" justify="center">
      <el-col :span="3">
        <el-button type="primary" @click="createBoard(boardFormRef)"
          >등록하기</el-button
        >
      </el-col>
    </el-row>
  </el-form>
</template>

<style></style>
