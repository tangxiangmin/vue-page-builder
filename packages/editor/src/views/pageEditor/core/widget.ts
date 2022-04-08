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
      src: '/favicon.ico',
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
  static url = ''

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


export function createWidgetFromRemote(config: any): typeof RemoteWidget {
  const {name, link, configLink} = config

  class CustomRemoteWidget extends RemoteWidget {
    static label = name
    static link = link
    static configLink = configLink

    constructor() {
      super()
      this.name = name
      this.type = 'RemoteWidget'
      this.children = []
      this.config.url = link
    }
  }

  return CustomRemoteWidget
}

export const widgetList = [
  {title: '内置控件', list: [RemoteWidget]}
  // { title: '自定义控件', list: [{ label: '选项卡' }] },
  // { title: '高阶控件', list: [{ label: '数据源' }] }
]

