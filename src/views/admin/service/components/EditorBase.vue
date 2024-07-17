<script setup lang="ts">
import { IEditorConfig } from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css";
import { emit } from "process";
import { onBeforeUnmount, shallowRef } from "vue";
const emit = defineEmits(["update:modelValue"]);
defineOptions({
  name: "BaseEditor",
});
const props = defineProps<{
  modelValue: string;
}>();
const mode = "default";
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const html = ref();
// 内容 HTML

const toolbarConfig: any = { excludeKeys: "fullScreen" };

const editorConfig: Partial<IEditorConfig> = {
  // TS 语法
  // const editorConfig = {
  placeholder: "请输入内容...", // JS 语法
  MENU_CONF: {
    uploadImage: {
      server: "/api/v1/uploadfileEditor",
      fieldName: "file",
    },
  },

  // 其他属性...
};
const handleCreated = (editor) => {
  // 记录 editor 实例，重要！
  editorRef.value = editor;
};
const onEditorChange = (html) => {
  emit("update:modelValue", html.getHtml());
};
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

<template>
  <div class="wangeditor" style="border: 1px solid #ccc">
    <Toolbar
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
      style="border-bottom: 1px solid #ccc"
    />
    <Editor
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      style="height: 500px; overflow-y: hidden"
      @onCreated="handleCreated"
      @onChange="onEditorChange"
    />
  </div>
</template>
