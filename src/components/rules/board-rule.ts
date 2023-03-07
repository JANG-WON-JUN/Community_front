import { ref } from 'vue';
import { boardCreateErrMsg } from '../models/board-write';

const errMsg = boardCreateErrMsg;

const boardCreateRule = ref({
  title: [
    {
      required: true,
      message: '제목을 입력해 주세요.',
      trigger: 'blur',
    },
  ],
});

function boardCreateSetErrMsg(data: any) {
  const field: string = data.fieldErrors[0].field;
  const errorMessage: string = data.fieldErrors[0].errorMessage;

  switch (field) {
    case 'title':
      errMsg.value.title = errorMessage;
      break;
    case 'boardType':
      errMsg.value.boardType = errorMessage;
      break;
  }
}

export { boardCreateRule, boardCreateSetErrMsg };
