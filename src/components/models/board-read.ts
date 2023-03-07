import type { CommentRead } from './comment-read';

class Board {
  title?: string;
  content?: string;
  tempSave?: boolean;
  boardType?: string;
  views?: number;
  comments?: CommentRead[];
  state?: string;
  regDate?: string;
  modDate?: string;
  writer?: {
    id: 0;
    email: '';
    nickname: '';
  };

  constructor(
    title?: string,
    content?: string,
    tempSave?: boolean,
    boardType?: string,
    views?: number,
    comments?: CommentRead[],
    state?: string,
    regDate?: string,
    modDate?: string,
    writer?: any
  ) {
    this.title = title;
    this.content = content;
    this.tempSave = tempSave;
    this.boardType = boardType;
    this.views = views;
    this.comments = comments;
    this.state = state;
    this.regDate = regDate;
    this.modDate = modDate;
    this.writer = writer;
  }
}

export { Board };
