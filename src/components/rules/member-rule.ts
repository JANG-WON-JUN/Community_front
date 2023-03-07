import { ref } from 'vue';
import axios from '../common/axios-config';
import { memberCreate, memberCreateErrMsg } from '../models/member';
import { isEqual } from 'lodash';

const member = memberCreate;
const errMsg = memberCreateErrMsg;

const memberCreateRule = ref({
  email: [
    {
      required: true,
      message: '이메일을 입력해 주세요.',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: '이메일 형식을 확인해 주세요.',
      trigger: 'blur',
    },
    {
      type: 'string',
      trigger: 'blur',
      asyncValidator: (rule: any, value: any, callback: any) => {
        return new Promise((resolve, reject) => {
          axios
            .post('/join/emailCheck', {
              email: member.value.email,
            })
            .then(function () {
              callback();
            })
            .catch(function (error) {
              reject(error.response.data.fieldErrors[0].errorMessage); // reject with error message
            });
        });
      },
    },
  ],
  name: [
    {
      required: true,
      message: '이름을 입력해 주세요.',
      trigger: 'blur',
    },
  ],
  nickname: [
    {
      required: true,
      message: '닉네임을 입력해 주세요.',
      trigger: 'blur',
    },
    {
      type: 'string',
      trigger: 'blur',
      asyncValidator: (rule: any, value: any, callback: any) => {
        return new Promise((resolve, reject) => {
          axios
            .post('/join/nicknameCheck', {
              nickname: member.value.nickname,
            })
            .then(function () {
              callback();
            })
            .catch(function (error) {
              reject(error.response.data.fieldErrors[0].errorMessage);
            });
        });
      },
    },
  ],
  password: [
    {
      required: true,
      message: '비밀번호를 입력해 주세요.',
      trigger: 'blur',
    },
    {
      type: 'string',
      trigger: 'change',
      asyncValidator: (rule: any, value: any, callback: any) => {
        return new Promise((resolve, reject) => {
          if (!isEqual(value, member.value.confirmPassword)) {
            reject('입력한 비밀번호가 일치하지 않습니다.');
          }
          callback();
        });
      },
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: '비밀번호 확인을 입력해 주세요.',
      trigger: 'blur',
    },
  ],
  year: [
    {
      required: true,
      type: 'string',
      trigger: 'blur',
      asyncValidator: (rule: any, value: any, callback: any) => {
        return new Promise((resolve, reject) => {
          if (
            isNaN(Number(value)) ||
            value.length !== 4 ||
            Number(value) < 1900
          ) {
            reject('태어난 년도를 입력해 주세요.');
          }
          callback();
        });
      },
    },
  ],
  month: [
    {
      required: true,
      type: 'string',
      message: '월을 입력해 주세요.',
      trigger: 'blur',
    },
  ],
  day: [
    {
      required: true,
      type: 'string',
      trigger: 'blur',
      asyncValidator: (rule: any, value: any, callback: any) => {
        return new Promise((resolve, reject) => {
          if (
            isNaN(Number(value)) ||
            value.length > 2 ||
            Number(value) < 1 ||
            Number(value) > 31
          ) {
            reject('일을 입력해 주세요.');
          }
          callback();
        });
      },
    },
  ],
  sex: [
    {
      required: true,
      message: '성별을 입력해 주세요.',
      trigger: 'blur',
    },
  ],
});

function memberCreateSetErrMsg(data: any) {
  const field: string = data.fieldErrors[0].field;
  const errorMessage: string = data.fieldErrors[0].errorMessage;

  switch (field) {
    case 'email':
      errMsg.value.email = errorMessage;
      break;
    case 'name':
      errMsg.value.name = errorMessage;
      break;
    case 'nickname':
      errMsg.value.nickname = errorMessage;
      break;
    case 'password':
      errMsg.value.password = errorMessage;
      break;
    case 'confirmPassword':
      errMsg.value.confirmPassword = errorMessage;
      break;
    case 'year':
      errMsg.value.year = errorMessage;
      break;
    case 'month':
      errMsg.value.month = errorMessage;
      break;
    case 'day':
      errMsg.value.day = errorMessage;
      break;
    case 'sex':
      errMsg.value.sex = errorMessage;
      break;
  }
}

export { memberCreateRule, memberCreateSetErrMsg };
