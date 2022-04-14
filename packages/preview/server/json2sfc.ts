import {IRemoteWidget} from '../src/types'

// 找到依赖的所有远程组件
function findRemoteWidgetList(list: IRemoteWidget[]): string[] {
  const urlSet = new Set<string>()
  find(list)
  return Array.from(urlSet)

  function find(list: IRemoteWidget[]) {
    list.forEach((row: IRemoteWidget) => {
      const {config: {url}, children} = row
      urlSet.add(url)
      if (children.length) {
        find(children)
      }
    })
  }
}

export default function json2sfc(vnode: string): string {
  const data: IRemoteWidget = JSON.parse(vnode)
  const remoteWidgetList = findRemoteWidgetList(data.children.filter(row => row.type === 'RemoteWidget'))

  // 提前加载需要的动态模块
  let importStr = ''
  let widgetMapStr = '{'
  remoteWidgetList.forEach((url: string, index: number) => {
    const name = `RemoteWidget${index}`
    importStr += `import ${name} from '@remote/${url}'\n`
    widgetMapStr += `'${url}':${name},`
  })
  widgetMapStr += '}'

  return `
<script>
import {h, defineComponent} from 'vue'
import AbstractContainer from '@/abstractContainer.vue'

${importStr}

const remoteWidgetMap = ${widgetMapStr}

export default defineComponent({
  name: "App",
  render(){
     const widget = ${vnode}
     return h(AbstractContainer,{widget,remoteWidgetMap})
  }
});
<\/script>

<style scoped lang="scss">

<\/style>`
}
