export default function json2sfc(vnode: string) {
  const data = JSON.parse(vnode)
  // @ts-ignore
  const remoteWidgetList = data.children.filter(row => row.type === 'RemoteWidget').map(row => {
    return row.config.url
  })

  // 提前加载需要的动态模块
  const importStr = remoteWidgetList.reduce((acc: string, url: string) => {
    acc += `import '@remote/${url}'\n`
    return acc
  }, '')

  return `
<script>
import {h, defineComponent} from 'vue'
import RemoteWidget from "./remoteWidget.vue";
${importStr}

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
    const config = ${vnode}
     return render(config)
  }
});
<\/script>

<style scoped lang="scss">

<\/style>`
}
