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
  email: 'w32807@naver.com',
  name: '원준',
  nickname: '원준',
  password: '1234',
  confirmPassword: '1234',
  year: '1995',
  month: '5',
  day: '4219',
  sex: 'm',

  /* email: '',
    name: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    year: '',
    month: '',
    day: '',
    sex: '' */
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
