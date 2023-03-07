class BoardType {
  id?: number;
  boardTypes?: string;
  description?: string;

  constructor(id?: number, boardTypes?: string, description?: string) {
    this.id = id;
    this.boardTypes = boardTypes;
    this.description = description;
  }
}

export { BoardType };
