<template>
  <customContainer :list="list" :root="true" :disabled="false" />
</template>
<script>
import customContainer from './customContainer/index'

export default {
  name: 'RootContainer',
  components: {
    customContainer
  },
  props: {
    // 列表
    list: {
      required: true,
      type: Array,
      default() {
        return []
      }
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
