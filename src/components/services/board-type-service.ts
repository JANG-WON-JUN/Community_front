import axios from '../common/axios-config';

class BoardTypeService {
  constructor() {}

  getBoardTypes(): any {
    return axios.get('/boardType');
  }
}

const boardTypeService = new BoardTypeService();

export default boardTypeService;
