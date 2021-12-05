<template>
  <textarea ref="textarea" v-model="value" />
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/lib/codemirror.css'

import 'codemirror/theme/base16-light.css' // *
// import 'codemirror/theme/mdn-like.css' // *
// import 'codemirror/theme/xq-light.css' // *
import 'codemirror/theme/material.css'
import 'codemirror/theme/darcula.css'
import 'codemirror/theme/monokai.css'
// import 'codemirror/theme/erlang-dark.css'

import 'codemirror/mode/python/python'
import 'codemirror/mode/css/css'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/css-hint'
import 'codemirror/addon/edit/closebrackets'

// import pythonHint from './codemirror/python-hint'

export default {
  name: 'CodePython',
  props: {
    // 是否无法编辑
    readonly: {
      type: Boolean,
      default: false
    },
    // 是否可以复制
    canCopy: {
      type: Boolean,
      default: true
    },
    // 代码值
    value: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'material' // 高亮主题在import引入
    },
    mode: {
      type: String,
      default: 'text/css'
    },
    editorOptions: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const { extraKeys = {}} = this.editorOptions

      const readOnly = this.canCopy ? !!this.readonly : 'nocursor'
      this.codeEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
        lineNumbers: true,
        mode: this.mode,
        theme: this.theme,
        lint: true,
        tabSize: 4,
        indentUnit: 4,
        showCursorWhenSelecting: true,
        hintOptions: { completeSingle: false },
        // autofocus: true,
        readOnly,
        autoCloseBrackets: true,
        viewportMargin: 500, // 指定当前滚动到视图中内容上方和下方要渲染的行数。这会影响到滚动时要更新的行数。由于部分需求需要滚动到指定位置，所以此处设置为500，可以设置为Infinity表示初始渲染整个文档
        extraKeys: {
          // 将tab替换成空格，避免inconsistent tab错误
          Tab(cm) {
            if (cm.somethingSelected()) {
              cm.indentSelection('add')
            } else {
              const currentTokenType = cm.getTokenTypeAt(cm.getCursor()) // 获取光标处的token
              const ch =
                  cm.getOption('indentWithTabs') || currentTokenType === 'string'
                    ? '\t'
                    : Array(cm.getOption('indentUnit') + 1).join(' ')
              cm.replaceSelection(ch, 'end', '+input')
            }
          },
          ...extraKeys
        },
        ...this.editorOptions
      })
      this.codeEditor.setSize('100%', '100%')
      this.codeEditor.on('change', () => {
        // 实现v-model
        this.$emit('input', this.codeEditor.getValue())
      })
      // 代码提示
      this.codeEditor.on('cursorActivity', () => {
        this.codeEditor.showHint()
      })
    }
  }
}
</script>

<style lang="scss">
$aequilate-code-font: Consolas, Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono',
'Bitstream Vera Sans Mono', 'Courier New', monospace, serif;
.CodeMirror {
  /*background-color: #323537;*/
  z-index: 0;
  font-family: $aequilate-code-font;
  font-size: 16px;
  line-height: 1.2;
  border-radius: 4px;
  resize: vertical;
}

.CodeMirror-gutters {
  background-color: #323537;
  border: none;
}

.CodeMirror-line {
  padding-left: 4px;
  line-height: 1.2;
  height: 20px !important;
}

.cm-s-rubyblue span.cm-string {
  color: #f08047;
}

// 一些自定义的codemirror样式
.cm-s-terminal {
  &.CodeMirror {
    color: #fff;
    background-color: #323537;
  }
}

.cm-s-base16-light {
  .CodeMirror-linenumbers,
  .CodeMirror-gutters {
    background-color: #f1f1f1 !important;
  }
}

.cm-s-darcula {
  span.cm-comment {
    font-style: normal;
    color: #95958a;
  }
}

.cm-s-monokai {
  span.cm-comment {
    color: #cbff00;
  }
}

// 注释里面的挖空题增加不一样的高亮
.cm-comment {
  font-family: monospace;
  font-size: 13px;
  // 注释里面的高亮也同样字体大小
  & + .CodeMirror-widget .blank {
    font-size: 13px;
    background-color: #00ffff !important;
    color: #000000 !important;
    border-radius: 4px !important;
  }
}

.CodeMirror-wrap pre {
  word-break: break-all;
}

// 增加隐藏注释的功能
.hide-comment {
  .cm-comment ~ .cm-comment {
    /*visibility: hidden;*/
    display: none;
  }
}

// Hack 处理f"{123:010}" 自动补齐的内容，由于Python3取消了0开头的数字，导致token解析错误
$cm-number-color: (cm-s-base16-light, #ac4142) (cm-s-monokai, #ae81ff) (cm-s-material, #f77669) (cm-s-darcula, #6897bb) (cm-s-darcula, #6897bb);
@each $config in $cm-number-color {
  .#{nth($config , 1)} {
    .cm-string ~ .cm-error {
      background-color: transparent;
      color: #{nth($config, 2)};
    }
  }
}

// todo 覆盖darcula 主题样式
.CodeMirror-hints.darcula {
  font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
  background-color: #3b3e3f !important;
  font-size: 14px;

  .CodeMirror-hint {
    color: #a9b7c6 !important;
  }
}

.CodeMirror-hints.darcula .CodeMirror-hint-active {
  background-color: #494d4e !important;
  color: #fff !important;
}
</style>
