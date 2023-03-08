import { ref } from 'vue';

class Member {
  email: string;
  nickname: string;

  constructor(email: string, name: string) {
    this.email = email;
    this.nickname = name;
  }
}

const member = ref({
  email: '',
  name: '',
  nickname: '',
  password: '',
  confirmPassword: '',
  year: '',
  month: '',
  day: '',
  sex: '',
});

const errMsg = ref({
  email: '',
  name: '',
  nickname: '',
  password: '',
  confirmPassword: '',
  year: '',
  month: '',
  day: '',
  sex: '',
});

export { Member, member as memberCreate, errMsg as memberCreateErrMsg };
