import BaseWidget from './baseWidget'


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
      url: '',
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
      this.config.configUrl = configLink
    }
  }

  return CustomRemoteWidget
}

export const widgetList = [
  {title: '内置控件', list: [RemoteWidget]}
  // { title: '自定义控件', list: [{ label: '选项卡' }] },
  // { title: '高阶控件', list: [{ label: '数据源' }] }
]

