<script lang="ts">
import {h, PropType} from 'vue'

import {IRemoteWidget} from './types'

import RemoteWidget from './remoteWidget.vue'


const simpleMap = {
  RemoteWidget: RemoteWidget
}

function renderChildren(children: IRemoteWidget[], context) {
  return children.map((child) => {
    return render(child, context)
  })
}

function render(node: IRemoteWidget, context) {
  const {type, config, children} = node
  const realType = simpleMap[type] || type || 'div'
  const {url, props} = config || {}

  // todo 获取各种具名插槽
  return h(realType, {url, passedProps: props}, {
    default: (slotArgs) => {
      const list = children.map(child => {
        return {
          ...child,
          config: {
            ...child.config,
            props: {
              ...child.config.props,
              ...slotArgs
            }
          }
        }
      })
      return renderChildren(list, context)
    }
  })
}

export default {
  name: "abstractContainer",
  props: {
    widget: {
      type: Object as PropType<IRemoteWidget>,
      required: true
    }
  },
  setup(props, context) {
    return () => {
      return render(props.widget, context)
    }
  }
}
</script>

<style scoped>

</style>
