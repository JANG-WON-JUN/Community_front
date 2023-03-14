<script setup lang="ts">
// 나중에 toolbar의 플러그인 추가 시 참고 사이트
// https://ckeditor.com/ckeditor-5/online-builder/
// 만약 위의 사이트에서 다시 build를 하면, build 후 다운로드 받은 파일의 src/ckeditor.js의 내용을
// D:\wonjun_project\community_front\community_front\node_modules\@types\ckeditor__ckeditor5-build-classic
// 의 index.d.ts 파일에 넣어줘야 한다. 그 다음 npm install -g -npm-check-updates로 의존성 업데이트해준다?
import { ref, toRef, watch, onMounted } from 'vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const props = defineProps(['content', 'readonly']);
const contentFromParent = toRef(props, 'content');
const content = ref(props.content);
const readonly = ref(props.readonly);

const editorConfig = {
  toolbar: {
    items: [
      'heading',
      '|',
      'undo',
      'redo',
      '|',
      'bold',
      'italic',
      'link',
      'underline',
      'fontSize',
      'fontFamily',
      'fontColor',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      'alignment',
      '|',
      'blockQuote',
      'insertTable',
      'codeBlock',
      'code',
      'fontBackgroundColor',
      'highlight',
      'horizontalLine',
    ],
  },
  language: 'ko',
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableProperties',
    ],
  },
};

// readonly는 부모 컴포넌트에서 불리언값을 그대로 전달 받지만
// content는 Editor.vue가 먼저 로드되고 부모의 ref 값이 적용되므로
// watch로 값을 넣어준다.
watch(contentFromParent, () => (content.value = contentFromParent.value));

const emits = defineEmits(['modifyContent']);

const onReady = (editor: any) => {
  //console.log(Array.from(editor.ui.componentFactory.names()));
  const toolbarElement = editor.ui.view.toolbar.element;
  toolbarElement.style.display = readonly.value ? 'none' : 'flex';
};
</script>

<template>
  <ckeditor
    :editor="ClassicEditor"
    v-model="content"
    :disabled="readonly"
    :config="editorConfig"
    @ready="onReady"
    @input="emits('modifyContent', content)"
  ></ckeditor>
</template>

<style></style>
