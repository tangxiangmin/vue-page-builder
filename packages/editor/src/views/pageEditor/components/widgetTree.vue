<template>
  <el-tree :data="list" :props="defaultProps" draggable @node-click="pageEditorStore.setCurrentWidget">
    <template #default="{ node, data }">
     <span class="custom-tree-node">
      <span>{{ node.label }}</span>
      <span>
        <el-button type="text" @click="copyWidget(node,data)">
          复制
        </el-button>
        <el-button type="text" @click="removeWidget(node,data)">
          移除
        </el-button>
      </span>
    </span>
    </template>

  </el-tree>
</template>

<script setup lang="ts">
import {usePageEditorStore} from "../../../store/pageEditor";
import BaseWidget from "../core/baseWidget";

const pageEditorStore = usePageEditorStore()

const $props = defineProps({
  recordAction: {
    type: Function,
    default: () => {
      return () => {
      }
    }
  },
  list: {
    type: Array,
    default: () => {
      return []
    }
  }
})

const defaultProps = {
  children: 'children',
  label: 'name'
}

function copyWidget(_: any, row: BaseWidget) {
  pageEditorStore.copyWidget(row)
  $props.recordAction()
}

function removeWidget(node: any, row: BaseWidget) {
  const parent = node.parent
  const list = parent.data.children || parent.data
  const idx = list.indexOf(row)

  list.splice(idx, 1)
  $props.recordAction()
}
</script>

<style scoped lang="scss">
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}


</style>
