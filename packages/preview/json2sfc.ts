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
import AbstractContainer from '../shared/abstractContainer.vue'

${importStr}

export default defineComponent({
  name: "App",
  render(){
     const config = ${vnode}
     return h(AbstractContainer,{config})
  }
});
<\/script>

<style scoped lang="scss">

<\/style>`
}
