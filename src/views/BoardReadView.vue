<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import { CommentRead } from '../components/models/comment-read';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { alertConfirm } from '../components/common/alert';
import { Board } from '../components/models/board-read';
import { alertYesNo } from '../components/common/alert';
import {
  commentCreateRule,
  commentCreateSetErrMsg,
} from '../components/rules/comment-rule';
import {
  CommentWrite,
  commentCreateErrMsg,
} from '../components/models/comment-write';
import loginStore from '../stores/login-store';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import boardService from '../components/services/board-service';
import commentService from '../components/services/comment-service';
import BoardRouterService from '../components/services/board-router-service';
import CommentSearchCondition from '../components/models/comment-search-condition';

const route = useRoute();
const router = useRouter();
const useLoginStore = loginStore();
const boardRouterService = new BoardRouterService(useRouter());
const boardId = ref(route.query.id);
const board = ref(new Board());
const commentWrite = ref(new CommentWrite());
const commentCreateFormRef = ref<FormInstance>();
const comments = ref<CommentRead[]>();
const commentRules = commentCreateRule;
const commentErrMsg = commentCreateErrMsg;
const setErrMsg = commentCreateSetErrMsg;
const commentPage = ref(0);

onMounted(() => {
  readBoard();
  initCommentWrite();
});

const initCommentWrite = () => {
  if (typeof boardId.value === 'string') {
    commentWrite.value.boardId = parseInt(boardId.value);
  }
};

const readBoard = async () => {
  try {
    if (typeof boardId.value === 'string') {
      const response = await boardService.readBoard(boardId.value);
      board.value = response.data.data;
      comments.value = board.value.comments;
    }
  } catch (error: any) {
    console.log('조회실패');
  }
};

const editBoard = function () {
  boardRouterService.goBoardEdit(boardId.value);
};

const deleteConfirm = () => {
  alertYesNo(
    '알림',
    '선택하신 글을 삭제하시겠습니까?',
    () => {
      deleteBoard();
    },
    null
  );
};

const deleteBoard = async () => {
  try {
    if (typeof boardId.value === 'string') {
      boardService.deleteBoard(boardId.value);
      router.push({ name: 'board' });
    }
  } catch (error: any) {
    console.log('삭제 에러 발생');
  }
};

const editorConfig = {
  removePlugins: ['toolbar'],
};

const createComment = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        commentWrite.value.boardId = boardId.value;
        await commentService.createComment(commentWrite.value);
        alertConfirm('알림', '댓글을 등록하였습니다.', () => {
          getComments();
          clearCommentForm();
        });
      } catch (error: any) {
        setErrMsg(error.response.data);
      }
    }
  });
};

const createAddedComment = async (comment: CommentRead) => {
  const commentWrite = new CommentWrite(
    comment.comment,
    comment.parentId,
    boardId.value
  );

  try {
    await commentService.createComment(commentWrite);
    alertConfirm('알림', '댓글을 등록하였습니다.', () => {
      getComments();
      clearCommentForm();
    });
  } catch (error: any) {
    setErrMsg(error.response.data);
  }
};

const editComment = async (commentRead: CommentRead) => {
  try {
    if (commentRead.comment === '') {
      alertConfirm('알림', '댓글내용을 입력해 주세요.', () => {});
      return;
    }

    await commentService.editComment(commentRead);
    alertConfirm('알림', '댓글을 수정하였습니다.', () => {
      getComments();
      clearCommentForm();
    });
  } catch (error: any) {
    setErrMsg(error.response.data);
  }
};

const getComments = async () => {
  const conditon = new CommentSearchCondition(commentPage.value, boardId.value);
  const response = await commentService.getComments(conditon);
  comments.value = response.data.list;
};

const deleteComment = async (id: number | undefined) => {
  try {
    await commentService.deleteComment(id);
    alertConfirm('알림', '댓글을 삭제하였습니다.', () => {
      getComments();
      clearCommentForm();
    });
  } catch (error: any) {
    setErrMsg(error.response.data);
  }
};

const clearCommentForm = () => {
  commentWrite.value = new CommentWrite();
};

const addComment = (parentId: number, index: number) => {
  const commentRead = new CommentRead();

  commentRead.parentId = parentId;
  commentRead.writer = {
    id: 0,
    email: useLoginStore.getMember.email,
    nickname: useLoginStore.getMember.nickname,
  };

  comments.value[index].isAddReply = true;
  comments.value[index].replies.push(commentRead);
};

const cancleAddReply = (comment: CommentRead) => {
  comment.isAddReply = !comment.isAddReply;
  if (comment.replies !== undefined) {
    comment.replies.pop();
  }
};
</script>

<template>
  <div>{{ board.title }}</div>
  <el-divider />
  <ckeditor
    :editor="ClassicEditor"
    v-model="board.content"
    :disabled="true"
    :config="editorConfig"
  ></ckeditor>
  <el-row :gutter="20" class="row-bg mt-3">
    <el-col
      :span="24"
      class="text-end"
      v-if="useLoginStore.isStoredMember(board.writer?.email)"
    >
      <el-button type="info" @click="editBoard">수정하기</el-button>
      <el-button type="danger" @click="deleteConfirm">삭제하기</el-button>
    </el-col>
  </el-row>
  <!-- 댓글 form 시작-->
  <el-form
    ref="commentCreateFormRef"
    :model="commentWrite"
    :rules="commentRules"
    @submit.prevent
  >
    <el-form-item
      required
      prop="comment"
      :error="commentErrMsg.comment"
      class="mt-100"
    >
      <el-input
        type="textarea"
        v-model="commentWrite.comment"
        ref="titleRef"
        placeholder="댓글을 작성해 주세요."
        :rows="5"
      />
    </el-form-item>
    <el-row :gutter="20" class="row-bg mt-3">
      <el-col :span="24" class="text-end">
        <el-button type="info" @click="createComment(commentCreateFormRef)"
          >댓글달기</el-button
        >
      </el-col>
    </el-row>
  </el-form>
  <!-- 댓글 form 끝-->
  <!-- 댓글 리스트 출력 시작-->
  <div
    class="mt-3"
    style="display: flow-root"
    v-for="(comment, index) in comments"
    :key="comment.id"
  >
    <!-- 댓글 읽기, 댓글 수정 -->
    <el-card class="box-card" shadow="never" v-if="comment.parentId === null">
      <template #header>
        <div class="card-header">
          <span>{{
            comment.writer?.nickname + ' (' + comment.regDate + ')'
          }}</span>
          <div class="text-end">
            <el-button
              class="button"
              text
              @click="addComment(comment.id, index)"
              v-if="!comment.isEditable && !comment.isAddReply"
              >답글</el-button
            >
            <el-button
              class="button"
              text
              @click="deleteComment(comment.id)"
              v-if="
                !comment.isEditable &&
                useLoginStore.isStoredMember(board.writer?.email)
              "
              >삭제</el-button
            >
            <el-button
              class="button"
              text
              @click="comment.isEditable = !comment.isEditable"
              v-if="useLoginStore.isStoredMember(board.writer?.email)"
              >{{ comment.isEditable ? '취소' : '수정' }}</el-button
            >
          </div>
        </div>
      </template>
      <div class="text item" v-if="!comment.isEditable">
        {{ comment.comment }}
      </div>
      <el-form :model="comment" v-else>
        <el-form-item required prop="comment" :error="commentErrMsg.comment">
          <el-input type="textarea" v-model="comment.comment" />
        </el-form-item>
        <el-row :gutter="20" class="row-bg mt-3">
          <el-col :span="24" class="text-end">
            <el-button type="info" @click="editComment(comment)"
              >댓글수정</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <div v-for="reply in comment.replies" :key="reply.id">
      <!--대댓글 읽기-->
      <el-card
        class="w-95 float-end mt-3"
        v-if="reply.id !== undefined && !reply.isEditable"
      >
        <template #header>
          <div class="card-header">
            <span>
              <span class="mr-5"
                ><el-icon><ArrowRight /></el-icon
              ></span>
              {{ reply.writer?.nickname + ' (' + reply.regDate + ')' }}
            </span>
            <div class="text-end">
              <el-button
                class="button"
                text
                @click="reply.isEditable = !reply.isEditable"
                v-if="useLoginStore.isStoredMember(reply.writer?.email)"
                >수정</el-button
              >
              <el-button
                class="button"
                text
                @click="deleteComment(reply.id)"
                v-if="useLoginStore.isStoredMember(reply.writer?.email)"
                >삭제</el-button
              >
            </div>
          </div>
        </template>
        {{ reply.comment }}
      </el-card>
      <!--대댓글 수정-->
      <el-card
        class="w-95 float-end mt-3"
        v-else-if="reply.id !== undefined && reply.isEditable"
      >
        <template #header>
          <div class="card-header">
            <span>
              <span class="mr-5"
                ><el-icon><ArrowRight /></el-icon
              ></span>
              {{ reply.writer?.nickname + ' (' + reply.regDate + ')' }}
            </span>
            <div class="text-end">
              <el-button
                class="button"
                text
                @click="reply.isEditable = !reply.isEditable"
                v-if="!reply.isEditable"
                >수정</el-button
              >
              <el-button class="button" text @click="editComment(reply)" v-else
                >저장</el-button
              >
              <el-button
                class="button"
                text
                @click="deleteComment(reply.id)"
                v-if="!reply.isEditable"
                >삭제</el-button
              >
              <el-button
                class="button"
                text
                @click="reply.isEditable = !reply.isEditable"
                v-else
                >취소</el-button
              >
            </div>
          </div>
        </template>
        <el-form :model="comment">
          <el-form-item required prop="comment" :error="commentErrMsg.comment">
            <el-input type="textarea" v-model="reply.comment" />
          </el-form-item>
        </el-form>
      </el-card>

      <!--대댓글 새로 등록-->
      <el-card class="w-95 float-end mt-3" v-else>
        <template #header>
          <div class="card-header">
            <span>
              <span class="mr-5"
                ><el-icon><ArrowRight /></el-icon></span
              >{{ reply.writer?.nickname }}</span
            >
            <div class="text-end">
              <el-button class="button" text @click="cancleAddReply(comment)"
                >취소</el-button
              >
              <el-button class="button" text @click="createAddedComment(reply)"
                >저장</el-button
              >
            </div>
          </div>
        </template>
        <el-form :model="comment">
          <el-form-item required prop="comment" :error="commentErrMsg.comment">
            <el-input type="textarea" v-model="reply.comment" />
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
  <!-- 댓글 리스트 출력 끝-->
</template>

<style></style>
