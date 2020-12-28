<script>
import resizeContainer from './resize'
import customImage from './customImage'
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
    const child = h(type, {
      ...widget,
      style,
      props: {
        config
      }
    }, config.children)

    const onResize = (size) => {
      const { width, height } = size
      this.$set(style, 'width', width)
      this.$set(style, 'height', height)
    }
    // 图片支持拖拽调整尺寸
    // todo 后续支持其他组件调整尺寸
    if (type === customImage.name) {
      return h(resizeContainer, {
        style: { ...style },
        props: { isActive: this.isActive },
        on: {
          resize: onResize
        }
      }, [child])
    } else {
      return child
    }
  }
}
</script>

<style scoped>

</style>
