import './widget'

const baseConfig = {
  id: '',
  click: {
    type: '', // 点击类型
    args: '', // 点击参数
    logType: '', // 埋点类型
    logParams: '' // 埋点参数
  }
}

const image = {
  name: '图片',
  type: 'CustomImage',
  configType: 'CustomImageConfig',
  getTemplate() {
    return {
      ...baseConfig,
      src: require('@/assets/logo.png'),
      style: {}
    }
  }
}
const container = {
  name: '容器',
  type: 'div',
  configType: 'CustomContainerConfig',
  getTemplate() {
    return {
      ...baseConfig,
      children: [],
      nested: false,
      style: {
        height: '100px',
        background: '#dedede'
      }
    }
  }
}

const text = {
  name: '文字',
  type: 'CustomText',
  configType: 'CustomTextConfig',
  getTemplate() {
    return {
      ...baseConfig,
      content: 'hello',
      style: {}
      // absolute: true,
      // style: { position: 'absolute', zIndex: 99 }
    }
  }
}

export const componentList = [
  { title: '基础控件', list: [image, container, text] },
  { title: '定制控件', list: [] }
]

export function createTemplate() {
  return {
    type: 'pure',
    config: {},
    children: []
  }
}
