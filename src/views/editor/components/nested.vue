<template>
  <draggable :class="{'drag-area':true,'page-root':root}" :list="list" :options="dragOptions" ghost-class="ghost">
    <!--    <li v-for="el in list" :key="el.name">-->
    <!--      <p>{{ el.name }}</p>-->
    <!--      <nested-draggable :list="el.children" />-->
    <!--    </li>-->
    <abstractContainer
      v-for="(item, index) in list"
      :key="index"
      class="widget"
      :class="{'widget-selected': currentComponent === item}"
      :is-active=" currentComponent === item"
      :widget="item"
      @click.native.stop="chooseComponent(item)"
    >
      <nested-draggable :list="item.children" :disabled="!item.config.nested" />
    </abstractContainer>
  </draggable>
</template>
<script>
import draggable from 'vuedraggable'
import abstractContainer from './abstractContainer'

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
    }
  },
  created() {
    // console.log(this.disabled)
  },
  methods: {
    chooseComponent(item) {
      this.$store.commit('editor/setCurrentComponent', item)
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
}

.ghost {
  box-shadow: 0 0 3px 10px #ccc;
  //height: 100px;
  //line-height: 100px;
}
</style>
