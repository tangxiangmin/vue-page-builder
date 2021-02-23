<template>
  <draggable :class="{'drag-area':true,'page-root':root}" :list="list" :options="dragOptions" ghost-class="ghost" @add="addWidget">
    <abstractContainer
      v-for="(item, index) in list"
      :key="index"
      v-contextmenu="{menuList:widgetMenuList, onShow:chooseWidget.bind(this, item) }"
      class="widget"
      :class="{'widget-selected': currentComponent === item}"
      :is-active=" currentComponent === item"
      :widget="item"
      @click.native.stop="chooseWidget(item)"
    >
      <nested-draggable :list="item.children" :disabled="!item.config.nested" />
    </abstractContainer>
  </draggable>
</template>
<script>
import draggable from 'vuedraggable'
import abstractContainer from './abstractContainer'
import eventBus, { ACTION_RECORD } from '@/views/editor/core/eventBus'

export default {
  name: 'NestedDraggable',
  components: {
    draggable,
    abstractContainer
  },
  props: {
    // 是否是根节点
    root: {
      type: Boolean,
      default: false
    },
    // 是否允许嵌套
    disabled: {
      type: Boolean,
      default: true
    },
    // 列表
    list: {
      required: true,
      type: Array,
      default() {
        return []
      }
    }
  },

  computed: {
    isAddStatus() {
      return this.$store.state.editor.isAddStatus
    },
    dragOptions() {
      return { group: { name: 'page', pull: this.isAddStatus ? 'clone' : true }, disabled: this.disabled }
    },
    currentComponent() {
      return this.$store.state.editor.currentComponent
    },
    widgetMenuList() {
      return [
        {
          text: '复制组件',
          onClick: () => {
            this.copyWidget()
          }
        },
        {
          text: '删除组件', onClick: () => {
            this.removeWidget()
          }
        }

      ]
    }
  },
  watch: {
    disabled(newVal) {
      console.log('disabled：', newVal)
    }
  },
  created() {
    // console.log(this.disabled)
  },
  methods: {
    chooseWidget(item) {
      this.$store.commit('editor/setCurrentComponent', item)
    },
    addWidget() {
      eventBus.$emit(ACTION_RECORD)
    },
    copyWidget() {
      const { currentComponent } = this
      const index = this.list.indexOf(currentComponent)
      const widget = { ...currentComponent }
      widget.id = +new Date()
      this.list.splice(index, 0, widget)
      eventBus.$emit(ACTION_RECORD)
    },
    removeWidget() {
      const { currentComponent } = this
      const index = this.list.indexOf(currentComponent)
      this.$confirm('是否确认移除当前组件').then(() => {
        this.list.splice(index, 1)

        eventBus.$emit(ACTION_RECORD)
      }).catch(() => {
      })
    }
  }
}
</script>
<style scoped lang="scss">

.page-root {
  height: 100%;
}
.widget {
  &-selected {
    //transform: scale(0.98);
    //transition: transform linear .3s;
    outline: 1px solid #ff0000;
  }
}

.drag-area {
  min-height: 50px;
  height: 100%;
  //background-color: #42b983;
}

.ghost {
  box-shadow: 0 0 3px 10px #ccc;
  //height: 100px;
  //line-height: 100px;
}
</style>
