// let globalId = 1
export default class BaseWidget {
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

  initFromJSON(json) {
    try {
      const { config, children } = JSON.parse(json)

      this.config = config
      this.children = children.map(child => {
        return child.clone()
      })
    } catch (e) {
      console.log(e)
    }
  }

  clone() {
    const { config, children } = this
    const instance = new this.constructor()
    const json = JSON.stringify({ config, children })

    instance.initFromJSON(json)
    return instance
  }
}
