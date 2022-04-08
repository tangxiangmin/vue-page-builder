
<script>
import {h, defineComponent} from 'vue'
import RemoteWidget from "./remoteWidget.vue";
import '@remote/http://localhost:7001/api/widget/file/22.vue'
import '@remote/http://localhost:7001/api/widget/file/23.vue'
import '@remote/http://localhost:7001/api/widget/file/24.vue'


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
  const realType = simpleMap[type] || type
  return h(realType, config, {default: () => renderChildren(node)})
}

    
export default defineComponent({
  name: "App",
  setup(){
    return {
    }
  },
  render(){
    const config = {"type":"pure","config":{},"children":[{"type":"RemoteWidget","name":"底部购买按钮","id":1649403015177,"config":{"nested":false,"url":"http://localhost:7001/api/widget/file/22.vue","props":"","configUrl":"http://localhost:7001/api/widget/file_config/22.vue","originPrice":"100","price":"10","day":"4","btnText":"立即领取","btnTip":" 点击前往「XXXX」小程序 <br /> 仅需一步即可领取成功"},"children":[]},{"type":"RemoteWidget","name":"内置-图片","id":1649404197372,"config":{"nested":false,"url":"http://localhost:7001/api/widget/file/23.vue","props":"","configUrl":"http://localhost:7001/api/widget/file_config/23.vue","src":"http://localhost:3000/logo.png"},"children":[]},{"type":"RemoteWidget","name":"内置-文字","id":1649404416380,"config":{"nested":false,"url":"http://localhost:7001/api/widget/file/24.vue","props":"","configUrl":"http://localhost:7001/api/widget/file_config/24.vue","text":"测试文本哈哈哈哈哈"},"children":[]}]}
     return render(config)
  }
});
</script>

<style scoped lang="scss">

</style>