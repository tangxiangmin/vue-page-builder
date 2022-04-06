export default function json2sfc(vnode) {
  return `
<script>
import {h, defineComponent} from 'vue'

let simpleMap = {
  'CustomContainer': 'div',
  'CustomImage': 'img',
  'CustomText': 'span'
}

function renderChildren(node) {
  if (!node) return []
  const {children} = node

  if (!Array.isArray(children)) return children

  return children.map(render)
}

function render(node) {
  const {type, config} = node
  if (type === 'CustomText') {
    return h('span', config, config.content)
  }
  const realType = simpleMap[type] || type


  return h(realType, config, {default: () => renderChildren(node)})
}

    
export default defineComponent({
  name: "test",
  setup(){
    return {
    }
  },
  render(){
    const config = ${JSON.stringify(vnode)}
     return render(config)
  }
});
<\/script>

<style scoped lang="scss">

<\/style>`
}