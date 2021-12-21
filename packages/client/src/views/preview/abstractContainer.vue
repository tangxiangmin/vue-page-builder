<script>
import {h} from 'vue'

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
    console.log(config)

    function renderChildren(node) {
      if (!node) return []
      const {children} = node

      if (!Array.isArray(children)) return children

      return children.map(child => {
        if (typeof child === 'string' || !child) return child
        const {type, props} = child
        return h(type, props, renderChildren(child))
      })
    }

    function render(node) {
      const {type, props} = node
      return h(type, props, renderChildren(node))
    }

    return () => {
      return render(config)
    }
  }
}
</script>

<style scoped>

</style>
