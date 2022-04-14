import BaseWidget from './baseWidget'
import {IWidget} from '../../../typings'

interface RemoteWidgetConfig {
  url: string,
  configUrl: string,
  // 远程组件接收到的props
  props: {
    [prop: string]: any
  }
}

export class RemoteWidget extends BaseWidget {
  static label = '远程模块'

  constructor() {
    super()
    this.name = RemoteWidget.label
    this.type = 'RemoteWidget'
  }

  getConfig(): RemoteWidgetConfig {
    return {
      url: '',
      configUrl: '',
      props: {}
    }
  }
}


export function createWidgetFromRemote(config: IWidget): typeof RemoteWidget {
  const {name, link, configLink} = config

  class CustomRemoteWidget extends RemoteWidget {
    static label = name

    constructor() {
      super()
      this.name = name
    }

    getConfig(): RemoteWidgetConfig {
      return {
        url: link,
        configUrl: configLink,
        props: {}
      }
    }
  }

  return CustomRemoteWidget
}

export const widgetList = [
  {title: '内置控件', list: [RemoteWidget]}
  // { title: '自定义控件', list: [{ label: '选项卡' }] },
  // { title: '高阶控件', list: [{ label: '数据源' }] }
]

