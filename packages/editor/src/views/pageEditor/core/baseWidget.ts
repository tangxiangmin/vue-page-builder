// let globalId = 1
import {IWidgetConfig} from "../../../typings";

type BaseWidgetConfig = {
  nested: boolean,
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

    // this.click = {
    //   type: '',
    //   args: ''
    // }

    this.config = this.getConfig()

    this.children = []
  }

  getConfig(): BaseWidgetConfig {
    return {
      nested: false
    }
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

  clone() {
    const {config, children} = this
    // @ts-ignore
    const instance = new this.constructor()
    const json = JSON.stringify({config, children})

    instance.initFromJSON(json)
    return instance
  }
}
