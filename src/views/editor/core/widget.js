import BaseWidget from './baseWidget'

export class ImageWidget extends BaseWidget {
    static label = '图片'

    constructor() {
      super()
      this.name = ImageWidget.label

      this.type = 'CustomImage'
      this.configType = 'CustomImageConfig'
    }

    getConfig() {
      return {
        src: require('@/assets/logo.png'),
        style: ''
      }
    }
}

export class ContainerWidget extends BaseWidget {
    static label = '容器'

    constructor() {
      super()
      this.name = ContainerWidget.label
      this.type = 'CustomContainer'
      this.configType = 'CustomContainerConfig'
    }

    getConfig() {
      return {
        nested: false,
        style: 'height:100px;\nbackground:#ccc;'
      }
    }
}

export class TextWidget extends BaseWidget {
    static label = '文字'

    constructor(props) {
      super(props)
      this.name = TextWidget.label
      this.type = 'CustomText'
      this.configType = 'CustomTextConfig'
    }

    getConfig() {
      return {
        content: 'hello',
        absolute: true,
        style: ''
      }
    }
}

export class Page extends BaseWidget {
  constructor(props) {
    super(props)
    this.type = 'pure'
    this.config = {}
    this.children = []
  }

  initFromJSON(json) {
    try {
      const { config, children } = JSON.parse(json)

      this.config = config
      this.children = children
    } catch (e) {
      console.log(e)
    }
  }
}

// 根据模板创建
export function createWidgetFromTemplate(template) {
  const { name, content } = template
  return {
    label: name,
    custom: true,
    create() {
      const widget = new ContainerWidget()
      widget.initFromJSON(content)
      return widget
    }
  }
}

export const componentList = [
  { title: '基础控件', list: [ImageWidget, ContainerWidget, TextWidget] }
  // { title: '自定义控件', list: [{ label: '选项卡' }] },
  // { title: '高阶控件', list: [{ label: '数据源' }] }
]

