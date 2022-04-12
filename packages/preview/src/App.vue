
<script>
import {h, defineComponent} from 'vue'
import AbstractContainer from '../shared/abstractContainer.vue'

import '@remote/http://localhost:7001/api/widget/file/1.vue'


export default defineComponent({
  name: "App",
  setup(){
    return {
    }
  },
  render(){
     const config = {"children":[{"type":"RemoteWidget","name":"hello world","id":1649684899476,"config":{"url":"http://localhost:7001/api/widget/file/1.vue","configUrl":"http://localhost:7001/api/widget/file_config/1.vue"},"children":[]}]}
     return h(AbstractContainer,{config})
  }
});
</script>

<style scoped lang="scss">

</style>