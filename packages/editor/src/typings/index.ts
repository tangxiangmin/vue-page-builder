export interface IPage {
  id?: string,
  content: string,
  name: string,
  link?: string
}

export type IWidget = {
  id?: string,
  content: string,
  configContent: string,
  name: string,
  link?: string,
  configLink?: string
}

export interface IWidgetConfig {
  id: string | number,
  name: string
  type: string,
  children: IWidgetConfig[],
  config: {
    nested: boolean,
    [prop: string]: any
  },
}
