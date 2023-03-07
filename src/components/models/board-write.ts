import { ref } from 'vue';

class Board {
  title: string;
  content: string;
  tempSave: boolean;
  boardType: string;

  constructor(
    title: string,
    content: string,
    tempSave: boolean,
    boardType: string
  ) {
    this.title = title;
    this.content = content;
    this.tempSave = tempSave;
    this.boardType = boardType;
  }
}

const board = ref({
  title: '글 제목',
  content: '글 내용',
  tempSave: false,
  boardType: 'DEV',

  /* 
  title: '',
  content: '',
  tempSave: false,
  boardType: '',
    */
});

const errMsg = ref({
  title: '',
  content: '',
  boardType: '',
});

export { Board, board as boardCreate, errMsg as boardCreateErrMsg };
