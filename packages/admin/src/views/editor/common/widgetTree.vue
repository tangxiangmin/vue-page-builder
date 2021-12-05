<template>
  <el-tree :data="list" :props="defaultProps" @node-click="handleNodeClick" />
</template>

<script>
export default {
  name: 'WidgetTree',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },

  methods: {
    handleNodeClick(data) {
      this.$store.commit('editor/setCurrentComponent', data)
    }
  }
}
</script>

<style scoped>

</style>
