import { ref } from 'vue';
import { commentCreateErrMsg } from '../models/comment-write';

const errMsg = commentCreateErrMsg;

const commentCreateRule = ref({
  comment: [
    {
      required: true,
      message: '댓글 내용을 입력해 주세요.',
      trigger: 'blur',
    },
  ],
});

function commentCreateSetErrMsg(data: any) {
  const field: string = data.fieldErrors[0].field;
  const errorMessage: string = data.fieldErrors[0].errorMessage;

  switch (field) {
    case 'comment':
      errMsg.value.comment = errorMessage;
      break;
    case 'boardId':
      errMsg.value.boardId = errorMessage;
      break;
  }
}

export { commentCreateRule, commentCreateSetErrMsg };
