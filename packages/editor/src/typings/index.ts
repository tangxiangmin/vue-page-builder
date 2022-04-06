export interface IPage {
  id: string,
  content: string,
  name: string
}

export interface IWidget {
  id: string,
  content: string,
  name: string
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
