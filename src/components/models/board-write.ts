import { ref } from 'vue';

class Board {
  title?: string;
  content?: string;
  tempSave?: boolean;
  boardType?: string;

  constructor(
    title?: string,
    content?: string,
    tempSave?: boolean,
    boardType?: string
  ) {
    this.title = title;
    this.content = content;
    this.tempSave = tempSave;
    this.boardType = boardType;
  }
}

const errMsg = ref({
  title: '',
  content: '',
  boardType: '',
});

export { Board, errMsg as boardCreateErrMsg };
