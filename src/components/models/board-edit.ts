import { ref } from 'vue';

class Board {
  id: number;
  title: string;
  content: string;
  tempSave: boolean;

  constructor(id: number, title: string, content: string, tempSave: boolean) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.tempSave = tempSave;
  }
}

const board = ref({
  id: 1,
  title: '글 제목',
  content: '글 내용',
  tempSave: false,
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
});

export { Board, board as boardEdit, errMsg as boardEditErrMsg };
