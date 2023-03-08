<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import { focusOn } from '../components/common/utils';
import { alertConfirm } from '../components/common/alert';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Board, boardEditErrMsg } from '../components/models/board-edit';
import {
  boardCreateRule,
  boardCreateSetErrMsg,
} from '../components/rules/board-rule';
import boardService from '../components/services/board-service';
import BoardRouterService from '../components/services/board-router-service';
import Editor from '../components/Editor.vue';

const boardFormRef = ref<FormInstance>();
const titleRef = ref<HTMLElement>();
const route = useRoute();
const boardRouterService = new BoardRouterService(useRouter());
const boardId = ref(route.query.id);

const board = ref(new Board());
const boardErrMsg = boardEditErrMsg;
const boardRuls = boardCreateRule;
const setErrMsg = boardCreateSetErrMsg;

onMounted(async () => {
  focusOn(titleRef.value);

  if (boardId.value !== null) {
    const response = await boardService.readBoard(boardId.value);
    board.value = response.data.data;
  }
});

const editBoard = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    try {
      if (valid) {
        await boardService.editBoard(board.value);

        alertConfirm('알림', '글이 수정되었습니다.', () =>
          boardRouterService.goBoardRead(boardId.value)
        );
      }
    } catch (error: any) {
      setErrMsg(error.response.data);
    }
  });
};
</script>

<template>
  <el-form
    ref="boardFormRef"
    :model="board"
    :rules="boardRuls"
    label-width="100px"
    label-position="top"
    :validate-on-rule-change="false"
    @submit.prevent
  >
    <el-form-item label="제목" required prop="title" :error="boardErrMsg.title">
      <el-input v-model="board.title" ref="titleRef" placeholder="제목" />
    </el-form-item>
    <el-divider />
    <Editor
      :content="board.content"
      @modify-content="(content) => (board.content = content)"
    ></Editor>
    <el-row class="row-bg mt-3" justify="center">
      <el-col :span="3">
        <el-button type="primary" @click="editBoard(boardFormRef)"
          >수정하기</el-button
        >
      </el-col>
    </el-row>
  </el-form>
</template>

<style></style>
