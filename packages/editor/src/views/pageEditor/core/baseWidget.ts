// let globalId = 1
import {IWidgetConfig} from "../../../typings";

type BaseWidgetConfig = {
  [prop: string]: any
}

export default class BaseWidget implements IWidgetConfig {
  type: string
  name: string

  id: string | number
  config: BaseWidgetConfig
  children: IWidgetConfig[]

  constructor() {
    this.type = ''
    this.name = ''

    this.id = +new Date() // todo 随机uuid

    this.config = this.getConfig()

    this.children = []
  }

  getConfig(): BaseWidgetConfig {
    return {}
  }
}
