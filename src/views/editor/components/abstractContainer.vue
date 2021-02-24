<script>
import resizeContainer from './resize'
// import customImage from './customImage'
// import useDrag from '@/hooks/useDrag'

export default {
  name: 'AbstractContainer',
  components: { resizeContainer },
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    widget: {
      type: Object, default: null
    }
  },
  render(h) {
    const { widget } = this

    const { type, config } = widget
    if (!config) return null

    const { style } = config

    // todo 使用代理优化此处逻辑

    const renderNode = (proxyShape) => {
      // const tmpStyle = { ...style }
      // if (proxyShape) {
      //   delete tmpStyle.left
      //   delete tmpStyle.top
      // }
      if (type === 'CustomContainer') {
        return this.$slots.default
      }

      return h(type, {
        ...widget,
        style: style,
        props: {
          config
        }
      }, this.$slots.default)
    }

    // const onResize = (size) => {
    //   const { width, height, left, top } = size
    //   this.$set(style, 'width', width)
    //   this.$set(style, 'height', height)
    //   this.$set(style, 'left', left)
    //   this.$set(style, 'top', top)
    // }
    // 图片支持拖拽调整尺寸
    // todo 后续支持其他组件调整尺寸
    // if (type === customImage.name) {
    //   return h(resizeContainer, {
    //     style: { ...style },
    //     props: { isActive: this.isActive },
    //     on: {
    //       resize: onResize
    //     }
    //   }, [renderNode(true)])
    // } else {
    //   return renderNode()
    // }
    return renderNode()
  }
}
</script>

<style scoped>

</style>
