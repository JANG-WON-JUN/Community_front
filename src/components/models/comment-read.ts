class Comment {
  parentId?: number | undefined;
  id?: number;
  comment?: string;
  commentGroup?: number;
  commentOrder?: number;
  regDate?: string;
  writer?: {
    id: 0;
    email: '';
    nickname: '';
  };

  isEditable?: boolean;
  isAddReply?: boolean;
  replies?: Comment[];

  constructor(
    parentId?: number,
    id?: number,
    comment?: string,
    commentGroup?: number,
    commentOrder?: number,
    regDate?: string,
    writer?: any,
    replies?: Comment[]
  ) {
    this.parentId = parentId;
    this.id = id;
    this.comment = comment;
    this.commentGroup = commentGroup;
    this.commentOrder = commentOrder;
    this.regDate = regDate;
    this.writer = writer;
    this.replies = replies;
    this.isEditable = false;
    this.isAddReply = false;
  }
}

export { Comment as CommentRead };
