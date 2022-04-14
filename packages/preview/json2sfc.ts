import {IRemoteWidget} from './shared/types'

function findRemoteWidgetList(list: IRemoteWidget[], urlSet: Set<string>) {
  list.forEach(row => {
    const {config: {url}, children} = row
    urlSet.add(url)
    if (children.length) {
      findRemoteWidgetList(children, urlSet)
    }
  })
}

export default function json2sfc(vnode: string) {
  const data: IRemoteWidget = JSON.parse(vnode)
  const remoteWidgetList = data.children.filter(row => row.type === 'RemoteWidget')

  const list = new Set<string>()

  findRemoteWidgetList(remoteWidgetList, list)

  // 提前加载需要的动态模块
  const importStr = Array.from(list).reduce((acc: string, url: string) => {
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
     const widget = ${vnode}
     return h(AbstractContainer,{widget})
  }
});
<\/script>

<style scoped lang="scss">

<\/style>`
}
