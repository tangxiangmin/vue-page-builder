<script>
import {computed, h, shallowRef} from 'vue'

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
      const realType = simpleMap[type] || type || 'div'


      return h(realType, config, {default: () => renderChildren(node)})
    }

    return () => {
      return render(config)
    }
  }
}
</script>

<style scoped>

</style>
