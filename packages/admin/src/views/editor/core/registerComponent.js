
import Vue from 'vue'

export function getPageComponentName(pageType) {
  return pageType[0].toUpperCase() + pageType.substr(1)
}
// 获取页面配置组件名称
export function getPageConfigComponentName(pageType) {
  return getPageComponentName(pageType) + 'Config'
}

function createRegisterComponent(specialConfig = {}) {
  return (name) => {
    const folder = 'components'
    // 加载预览组件
    const component = require(`../${folder}/${name}/index`).default
    const config = specialConfig[name]
    if (!config || !config.ignoreRegister) {
      const componentName = getPageComponentName(component.name)
      Vue.component(componentName, component)
    }

    // 加载配置组件
    try {
      const config = require(`../${folder}/${name}/config.vue`).default
      const configName = getPageConfigComponentName(component.name)
      Vue.component(configName, config)
    } catch (e) {
      console.log(e)
    }
  }
}

// 移动端预览组件
const componentList = ['customImage', 'customContainer', 'customText']

componentList.forEach(createRegisterComponent({
  // 'CustomContainer': {
  //   ignoreRegister: true
  // }
}))
