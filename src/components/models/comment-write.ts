import { ref } from 'vue';

class Comment {
  comment?: string;
  parentId?: number;
  boardId?: number;

  constructor(comment?: string, parentId?: number, boardId?: number) {
    this.comment = comment;
    this.parentId = parentId;
    this.boardId = boardId;
  }
}

const errMsg = ref({
  comment: '',
  boardId: '',
});

export { Comment as CommentWrite, errMsg as commentCreateErrMsg };
