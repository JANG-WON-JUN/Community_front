import axios from '../common/axios-config';
import type { CommentWrite } from '../models/comment-write';
import type { CommentRead } from '../models/comment-read';
import type CommentSearchCondition from '../models/comment-search-condition';

class CommentService {
  constructor() {}

  getComments(condition: CommentSearchCondition): any {
    return axios.get('/member/comment', {
      params: condition.toJson(),
    });
  }

  createComment(comment: CommentWrite): any {
    return axios.post('/member/comment', comment);
  }

  editComment(comment: CommentRead): any {
    return axios.patch('/member/comment', comment);
  }

  deleteComment(id: number | undefined): any {
    return axios.delete('/member/comment/' + id);
  }
}

const commentService = new CommentService();

export default commentService;
