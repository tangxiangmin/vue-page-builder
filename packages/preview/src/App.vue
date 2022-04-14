
<script>
import {h, defineComponent} from 'vue'
import AbstractContainer from '../shared/abstractContainer.vue'

import '@remote/http://localhost:7001/api/widget/file/1.vue'
import '@remote/http://localhost:7001/api/widget/file/2.vue'
import '@remote/http://localhost:7001/api/widget/file/3.vue'


export default defineComponent({
  name: "App",
  render(){
     const widget = {"children":[{"type":"RemoteWidget","name":"hello world","id":1649858851282,"config":{"url":"http://localhost:7001/api/widget/file/1.vue","configUrl":"http://localhost:7001/api/widget/file_config/1.vue","props":{"msg":"sdfdasf"}},"children":[]},{"type":"RemoteWidget","name":"slot测试","id":1649841971508,"config":{"url":"http://localhost:7001/api/widget/file/2.vue","configUrl":"http://localhost:7001/api/widget/file_config/2.vue","props":{"msg":"123sdfd"}},"children":[{"type":"RemoteWidget","name":"list-item","id":1649858270528,"config":{"url":"http://localhost:7001/api/widget/file/3.vue","configUrl":"http://localhost:7001/api/widget/file_config/3.vue","props":{}},"children":[]}]}]}
     return h(AbstractContainer,{widget})
  }
});
</script>

<style scoped lang="scss">

</style>