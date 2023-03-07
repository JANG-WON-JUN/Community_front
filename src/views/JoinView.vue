<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { alertConfirm } from '../components/common/alert';
import { memberCreate, memberCreateErrMsg } from '../components/models/member';
import {
  memberCreateRule,
  memberCreateSetErrMsg,
} from '../components/rules/member-rule';
import { focusOn } from '../components/common/utils';
import axios from '../components/common/axios-config';

const memberFormRef = ref<FormInstance>();
const emailRef = ref<HTMLElement>();
const router = useRouter();

const member = memberCreate;
const memberErrMsg = memberCreateErrMsg;
const memberRuls = memberCreateRule;
const setErrMsg = memberCreateSetErrMsg;

onMounted(() => focusOn(emailRef.value));

function join(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      axios
        .post('/join', member.value)
        .then(function (response) {
          if (response.status === 200) {
            alertConfirm(
              '알림',
              '회원가입이 완료되었습니다. 로그인을 해 주세요.',
              () => router.push({ name: 'login' })
            );
          }
        })
        .catch(function (error) {
          setErrMsg(error.response.data);
        });
    }
  });
}
</script>

<template>
  <el-form
    ref="memberFormRef"
    :model="member"
    :rules="memberRuls"
    label-width="100px"
    label-position="top"
    :validate-on-rule-change="false"
    @submit.prevent
  >
    <el-form-item
      label="이메일"
      required
      prop="email"
      :error="memberErrMsg.email"
    >
      <el-input v-model="member.email" ref="emailRef" placeholder="이메일" />
    </el-form-item>
    <el-form-item label="이름" required prop="name" :error="memberErrMsg.name">
      <el-input v-model="member.name" placeholder="이름" />
    </el-form-item>
    <el-form-item
      label="닉네임"
      required
      prop="nickname"
      :error="memberErrMsg.nickname"
    >
      <el-input v-model="member.nickname" placeholder="닉네임" />
    </el-form-item>
    <el-form-item
      label="비밀번호"
      required
      prop="password"
      :error="memberErrMsg.password"
    >
      <el-input
        type="password"
        v-model="member.password"
        placeholder="비밀번호"
      />
    </el-form-item>
    <el-form-item
      label="비밀번호 확인"
      required
      prop="confirmPassword"
      :error="memberErrMsg.confirmPassword"
    >
      <el-input
        type="password"
        v-model="member.confirmPassword"
        placeholder="비밀번호 확인"
      />
    </el-form-item>
    <el-form-item label="생년월일">
      <el-row class="row-bg" justify="space-between">
        <el-col :span="7">
          <el-form-item required prop="year" :error="memberErrMsg.year">
            <el-input v-model="member.year" placeholder="연도" />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item required prop="month" :error="memberErrMsg.month">
            <el-select v-model="member.month" placeholder="월">
              <el-option label="1월" value="1" />
              <el-option label="2월" value="2" />
              <el-option label="3월" value="3" />
              <el-option label="4월" value="4" />
              <el-option label="5월" value="5" />
              <el-option label="6월" value="6" />
              <el-option label="7월" value="7" />
              <el-option label="8월" value="8" />
              <el-option label="9월" value="9" />
              <el-option label="10월" value="10" />
              <el-option label="11월" value="11" />
              <el-option label="12월" value="12" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item required prop="day" :error="memberErrMsg.day">
            <el-input v-model="member.day" placeholder="일" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="성별" required prop="sex" :error="memberErrMsg.sex">
      <el-select v-model="member.sex" placeholder="성별" style="width: 100%">
        <el-option label="남성" value="m" />
        <el-option label="여성" value="f" />
      </el-select>
    </el-form-item>
    <el-row class="row-bg" justify="center">
      <el-col :span="3">
        <el-button type="primary" @click="join(memberFormRef)"
          >가입하기</el-button
        >
      </el-col>
    </el-row>
  </el-form>
</template>

<style></style>
