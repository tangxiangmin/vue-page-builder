<script lang="ts">
import {h, PropType} from 'vue'
import {IRemoteWidget} from './types'

import RemoteWidget from './remoteWidget.vue'

export default {
  name: "abstractContainer",
  props: {
    widget: {
      type: Object as PropType<IRemoteWidget>,
      required: true
    },
    remoteWidgetMap: {
      type: Object as PropType<Record<string, object>>,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {

    const {remoteWidgetMap, widget} = props

    function getWidgetType(node: IRemoteWidget): any {
      const {type, config} = node
      if (type === 'RemoteWidget') {
        if (remoteWidgetMap && remoteWidgetMap[config.url]) {
          return remoteWidgetMap[config.url]
        }
        return RemoteWidget
      }
      return type || 'div'
    }

    function renderChildren(children: IRemoteWidget[]) {
      return children.map((child) => {
        return render(child)
      })
    }

    function render(node: IRemoteWidget) {
      const {config, children} = node
      const realType = getWidgetType(node)
      const {url, props} = config || {}

      const customProps = realType === RemoteWidget ? {url, passedProps: props} : props

      // todo 获取各种具名插槽
      return h(realType, customProps, {
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
          return renderChildren(list)
        }
      })
    }

    return () => {
      return render(widget)
    }
  }
}
</script>

<style scoped>

</style>
