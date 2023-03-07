class BoardSearchCondition {
  page?: number;
  tempSave?: boolean;
  keyword?: string;
  boardType?: string;
  searchType?: string;
  searchOrder?: string;

  constructor(
    page?: number,
    tempSave?: boolean,
    keyword?: string,
    boardType?: string,
    searchType?: string,
    searchOrder?: string
  ) {
    this.page = page;
    this.tempSave = tempSave;
    this.keyword = keyword;
    this.boardType = boardType;
    this.searchType = searchType;
    this.searchOrder = searchOrder;
  }

  toJson() {
    return {
      page: this.page,
      tempSave: this.tempSave,
      keyword: this.keyword,
      boardType: this.boardType,
      searchType: this.searchType,
      searchOrder: this.searchOrder,
    };
  }
}

export default BoardSearchCondition;
