<template>
  <div class="editor" ref="el"></div>
</template>

<script setup lang="ts">
import {ref, onMounted, watchEffect, inject} from 'vue'
import CodeMirror from './codemirror'

import emmet from '@emmetio/codemirror-plugin'

emmet(CodeMirror)

interface Props {
  mode?: string
  value?: string
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'htmlmixed',
  value: '',
  readonly: false
})

const emit = defineEmits<(e: 'change', value: string) => void>()

const el = ref()

onMounted(() => {
  const addonOptions = {
    autoCloseBrackets: true,
    autoCloseTags: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    extraKeys: {
      Tab: 'emmetExpandAbbreviation',
      Esc: 'emmetResetAbbreviation',
      Enter: 'emmetInsertLineBreak'
    },
    emmet: {
      preview: false
    },
  }

  const editor = CodeMirror(el.value!, {
    value: '',
    mode: props.mode,
    readOnly: props.readonly,
    tabSize: 2,
    lineWrapping: true,
    lineNumbers: true,
    ...addonOptions
  })

  editor.on('change', () => {
    emit('change', editor.getValue())
  })

  watchEffect(() => {
    const cur = editor.getValue()
    if (props.value !== cur) {
      editor.setValue(props.value)
    }
  })

  watchEffect(() => {
    editor.setOption('mode', props.mode)
  })

  setTimeout(() => {
    editor.refresh()
  }, 50)


})
</script>

<style>
.editor {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  margin: 0;
  --font-code: Menlo, Monaco, Consolas, 'Courier New', monospace;
}

.CodeMirror {
  font-family: var(--font-code);
  line-height: 1.5;
  height: 100%;
}

</style>
