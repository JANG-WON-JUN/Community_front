import axios from '../common/axios-config';
import type { Board } from '../models/board-read';
import type BoardSearchCondition from '../models/board-search-condition';

class BoardTypeService {
  constructor() {}

  getBoardTypes(): any {
    return axios.get('/boardType');
  }
}

const boardTypeService = new BoardTypeService();

export default boardTypeService;
