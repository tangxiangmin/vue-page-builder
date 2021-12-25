<!--<template>-->
<!--  <component :is="compRef" v-bind="config.props"></component>-->
<!--</template>-->
<script>
import {h, shallowRef} from 'vue'

import RemoteWidget from './remoteWidget.vue'


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

    let simpleMap = {
      'CustomContainer': 'div',
      'CustomImage': 'img',
      'CustomText': 'span',
      RemoteWidget: RemoteWidget
    }

    function renderChildren(node) {
      if (!node) return []
      const {children} = node

      if (!Array.isArray(children)) return children

      return children.map(render)
    }

    function render(node) {
      const {type, config} = node
      if (type === 'CustomText') {
        return h('span', config, config.content)
      }
      const realType = simpleMap[type] || type


      return h(realType, config, {default: () => renderChildren(node)})
    }

    // return {
    //   config,
    //   compRef
    // }

    return () => {
      return render(config)
    }
  }
}
</script>

<style scoped>

</style>
