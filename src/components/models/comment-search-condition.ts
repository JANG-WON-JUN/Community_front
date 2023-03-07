class CommentSearchCondition {
  page?: number;
  boardId?: number;

  constructor(page?: number, boardId?: number) {
    this.page = page;
    this.boardId = boardId;
  }

  toJson() {
    return {
      page: this.page,
      boardId: this.boardId,
    };
  }
}

export default CommentSearchCondition;
