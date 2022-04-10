
<script>
import {h, defineComponent} from 'vue'
import RemoteWidget from "./remoteWidget.vue";
import '@remote/http://localhost:7001/api/widget/file/28.vue'
import '@remote/http://localhost:7001/api/widget/file/28.vue'


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
  return h(realType, config, renderChildren(node))
}

    
export default defineComponent({
  name: "App",
  setup(){
    return {
    }
  },
  render(){
    const config = {"children":[{"type":"RemoteWidget","name":"hello world","id":1649430472557,"config":{"nested":false,"url":"http://localhost:7001/api/widget/file/28.vue","props":"","configUrl":"http://localhost:7001/api/widget/file_config/28.vue","text":"123213"},"children":[]},{"type":"RemoteWidget","name":"hello world","id":1649576747285,"config":{"url":"http://localhost:7001/api/widget/file/28.vue","configUrl":"http://localhost:7001/api/widget/file_config/28.vue"},"children":[]}]}
     return render(config)
  }
});
</script>

<style scoped lang="scss">

</style>