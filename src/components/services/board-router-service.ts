//import router from '../../router/index';
import type { Router } from 'vue-router';

class BoardRouterService {
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  goBoardList(boardType: string, desc: string) {
    this.router.replace({
      name: 'board',
      query: { boardType: boardType, desc: desc },
    });
  }

  goBoardRead(id: string) {
    this.router.push({
      name: 'boardRead',
      query: { id: id },
    });
  }

  goBoardWrite(boardType: string) {
    this.router.push({
      name: 'boardWrite',
      query: { boardType: boardType },
    });
  }

  goBoardEdit(id: string) {
    this.router.push({
      name: 'boardEdit',
      query: { id: id },
    });
  }
}

export default BoardRouterService;
