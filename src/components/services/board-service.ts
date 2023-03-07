import axios from '../common/axios-config';
import type { Board } from '../models/board-read';
import type BoardSearchCondition from '../models/board-search-condition';

class BoardService {
  constructor() {}

  getBoards(condition: BoardSearchCondition): any {
    return axios.get('/board', {
      params: condition.toJson(),
    });
  }

  readBoard(id: string): any {
    return axios.get('/board/' + id);
  }

  createBoard(board: Board): any {
    return axios.post('/member/board', board);
  }

  editBoard(board: Board): any {
    return axios.patch('/member/board', board);
  }

  deleteBoard(id: string): any {
    return axios.delete('/member/board/' + id);
  }
}

const boardService = new BoardService();

export default boardService;
