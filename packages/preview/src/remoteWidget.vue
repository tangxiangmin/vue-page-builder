<script>
import {loadRemoteComponent} from '@vite-plugin-remote-module';

import {defineComponent, h, onMounted, shallowRef} from "vue";

console.log('remove widget')
export default defineComponent({
  name: "remoteWidget",
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const compRef = shallowRef(null)

    onMounted(() => {
      if (!props.url) return
      loadRemoteComponent(props.url).then(comp => {
        console.log(comp)
        compRef.value = comp
      })
    })
    return () => {
      if (!compRef.value) return null
      return h(compRef.value)
    }
  }
})
</script>

<style scoped>

</style>
