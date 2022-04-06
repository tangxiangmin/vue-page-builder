import BaseWidget from './baseWidget'


export class ImageWidget extends BaseWidget {
  static label = '图片'

  constructor() {
    super()
    this.name = ImageWidget.label

    this.type = 'CustomImage'
  }

  getConfig() {
    return {
      nested: false,
      src: location.protocol + '//' + location.host + require('@/assets/logo.png'),
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

  constructor() {
    super()
    this.name = TextWidget.label
    this.type = 'CustomText'
  }

  getConfig() {
    return {
      nested: false,
      content: 'hello',
      style: ''
    }
  }
}

export class RemoteWidget extends BaseWidget {
  static label = '远程模块'

  constructor(props: any = {}) {
    super()
    this.name = RemoteWidget.label
    this.type = 'RemoteWidget'
    this.children = []
    this.config.url = props.url
  }

  getConfig() {
    return {
      nested: false,
      url: '',
      props: ''
    }
  }
}

export class Page extends BaseWidget {
  constructor() {
    super()
    this.type = 'pure'
    this.children = []
    // 页面数据源
    // todo remove test
    // this.data = JSON.stringify({'msg': 'hello world'})
  }

  initFromJSON(json: string) {
    try {
      const {config, children} = JSON.parse(json)

      this.config = config
      this.children = children
    } catch (e) {
      console.log(e)
    }
  }
}

// 根据模板创建
export function createWidgetFromTemplate(template: any) {
  const {name, content} = template
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

export function createWidgetFromRemote(config: any) {
  const {name, url} = config
  return {
    label: name,
    custom: true,
    create() {
      return new RemoteWidget({url})
    }
  }
}

export const componentList = [
  {title: '基础控件', list: [ImageWidget, ContainerWidget, TextWidget, RemoteWidget]}
  // { title: '自定义控件', list: [{ label: '选项卡' }] },
  // { title: '高阶控件', list: [{ label: '数据源' }] }
]

