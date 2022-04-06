<script setup lang="ts">
import CodeMirror from './codemirror/CodeMirror.vue'
import { debounce } from '../utils'
import {computed, inject, ref} from 'vue'

const $props = defineProps({
  modelValue:{
    type:String,
    default:''
  }
})
const $emit = defineEmits(['update:modelValue'])
const onChange = debounce((code: string) => {
  // store.state.activeFile.code = code
  $emit('update:modelValue', code)
}, 250)

const activeMode = computed(() => {
  return 'htmlmixed'
})
</script>

<template>
  <div class="editor-container">
    <CodeMirror
      @change="onChange"
      :value="$props.modelValue"
      :mode="activeMode"
    />
  </div>
</template>

<style scoped>
.editor-container {
  height: calc(100% - var(--header-height));
  overflow: hidden;
  position: relative;
}
</style>
