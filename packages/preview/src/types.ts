export interface IRemoteWidgetConfig {
  url: string,
  configUrl: string,
  // 远程组件接收到的props
  props: {
    [prop: string]: any
  }
}

export interface IRemoteWidget {
  type: string,
  children: IRemoteWidget[],
  config: IRemoteWidgetConfig
}
