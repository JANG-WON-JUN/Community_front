import { ref } from 'vue';

class Board {
  id?: number;
  title?: string;
  content?: string;
  tempSave?: boolean;

  constructor(
    id?: number,
    title?: string,
    content?: string,
    tempSave?: boolean
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.tempSave = tempSave;
  }
}

const errMsg = ref({
  title: '',
  content: '',
});

export { Board, errMsg as boardEditErrMsg };
