
// let globalId = 1
class BaseWidget {
  constructor() {
    this.type = ''
    this.configType = ''

    this.id = +new Date() // todo 随机uuid

    // this.click = {
    //   type: '',
    //   args: ''
    // }

    this.config = this.getConfig()

    this.children = []
  }

  getConfig() {
    return {}
  }
}

export class Page extends BaseWidget {
  constructor(props) {
    super(props)
    this.type = 'pure'
    this.config = {}
    this.children = []
  }

  init(json) {
    try {
      const { config, children } = JSON.parse(json)
      this.config = config
      this.children = children
    } catch (e) {
      console.log(e)
    }
  }
}

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
        style: {}
      }
    }
}

export class ContainerWidget extends BaseWidget {
    static label = '容器'
    constructor() {
      super()
      this.name = ContainerWidget.label
      this.type = 'div'
      this.configType = 'CustomContainerConfig'
    }

    getConfig() {
      return {
        nested: false,
        style: {
          height: '100px',
          background: '#dedede'
        }
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
        style: { }
      }
    }
}

export const componentList = [
  { title: '基础控件', list: [ImageWidget, ContainerWidget, TextWidget] },
  { title: '定制控件', list: [] }
]

