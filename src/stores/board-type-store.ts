import { ref } from 'vue';
import { defineStore } from 'pinia';
import { BoardType } from '../components/models/board-type';

const boardTypeStore = defineStore({
  id: 'boardType',
  state: () => {
    return {
      boardType: ref(''),
      boardTypes: ref<BoardType[]>(),
    };
  },

  // 주의 : getter는 변수명과 동일하게 사용하면 안된다.
  getters: {
    getCurrentBoardType: (state) => state.boardType,
    getBoardTypes: (state) => state.boardTypes,
  },
  // this.변수명으로 값을 가져올 때는 getter를 통해 값을 가져오는 듯?
  actions: {
    setCurrentBoardTypes(boardType: string) {
      this.boardType = boardType;
    },

    setBoardTypes(boardTypes: BoardType[] | undefined) {
      if (
        typeof this.boardTypes === 'undefined' ||
        this.boardTypes.length === 0
      ) {
        this.boardTypes = boardTypes;
      }
    },

    getBoardType(boardType: string): BoardType {
      if (typeof this.boardTypes === 'undefined') return new BoardType();

      const boardTypeObj = this.boardTypes.find(
        (elem) => elem.boardTypes === boardType
      );

      return typeof boardTypeObj === 'undefined'
        ? new BoardType()
        : boardTypeObj;
    },
  },
  persist: {
    storage: localStorage,
  },
});

export default boardTypeStore;
