<script lang="ts">
// @ts-ignore
import {loadRemoteComponent} from '@vite-plugin-remote-module';

import {defineComponent, h, onMounted, shallowRef} from "vue";

export default defineComponent({
  name: "remoteWidget",
  props: {
    url: {
      type: String,
      default: ''
    },
    passedProps: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  setup(props, context) {
    const compRef = shallowRef(null)

    onMounted(() => {
      if (!props.url) return
      loadRemoteComponent(props.url).then((comp: object) => {
        compRef.value = comp
      })
    })

    return () => {
      if (!compRef.value) return h('div', {class: 'remote-loading'}, ['远程模块加载中...'])
      return h(compRef.value, props.passedProps, context.slots)
    }
  }
})
</script>

<style scoped lang="scss">
.remote-loading {
  height: 100px;
  line-height: 100px;
  text-align: center;
}

</style>
