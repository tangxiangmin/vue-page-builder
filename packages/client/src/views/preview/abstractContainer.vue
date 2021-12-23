<template>
  <component :is="compRef" v-bind="config.props"></component>
</template>
<script>
import {h, shallowRef} from 'vue'
import {loadRemoteComponent} from '@vite-plugin-remote-module';


export default {
  name: "abstractContainer",
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const {config} = props
    const compRef = shallowRef(config.type)

    if (config.remote) {
      compRef.value = null
      const {url} = config.remote
      loadRemoteComponent(url).then(val => {
        compRef.value = val
      })
    }

    // function renderChildren(node) {
    //   if (!node) return []
    //   const {children} = node
    //
    //   if (!Array.isArray(children)) return children
    //
    //   return children.map(child => {
    //     if (typeof child === 'string' || !child) return child
    //     const {type, props} = child
    //     return h(type, props, renderChildren(child))
    //   })
    // }
    //
    // function render(node) {
    //   const {type, props} = node
    //   return h(type, props, renderChildren(node))
    // }
    return {
      config,
      compRef
    }
    //
    // return () => {
    //   return render(config)
    // }
  }
}
</script>

<style scoped>

</style>
