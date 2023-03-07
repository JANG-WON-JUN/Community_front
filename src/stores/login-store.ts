import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Member } from '../components/models/member';

const loginStore = defineStore({
  id: 'login',
  state: () => {
    return {
      isAuthed: ref(false),
      member: ref(new Member('', '')),
    };
  },

  // 주의 : getter는 변수명과 동일하게 사용하면 안된다.
  getters: {
    // isAuthed: (state) => state.isAuthed, -> not working
    // member: (state) => state.member, -> not working
    isAuthedMember: (state) => state.isAuthed,
    getMember: (state) => state.member,
  },
  // this.변수명으로 값을 가져올 때는 getter를 통해 값을 가져오는 듯?
  actions: {
    login(member: Member) {
      this.isAuthed = true;
      this.member = member;
    },
    logout(): void {
      this.isAuthed = false;
      this.member = new Member('', '');
    },
    isStoredMember(email: string | undefined): boolean {
      return email === this.member.email ? true : false;
    },
  },
  persist: {
    storage: localStorage,
  },
});

export default loginStore;
