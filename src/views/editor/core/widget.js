class BaseWidget {
  constructor() {
    this.id = ''
    this.click = {
      type: '',
      args: ''
    }
  }

  getTemplate() {
    return {}
  }
}

export class ImageWidget extends BaseWidget {
  name = '图片'
  type = 'CustomImage'

  getTemplate() {
    return {
      src: 'http://localhost:9999/assets/images/sell/baseTrial/v5_2/1.png',
      style: 'max-width:100%'
    }
  }
}

export class ContainerWidget extends BaseWidget {
  name = '容器'
  type = 'div'

  getTemplate() {
    return {
      style: {
        height: '100px',
        width: '100%',
        background: 'red'
      }
    }
  }
}

export class TextWidget extends BaseWidget {
  name = '文字'
  type = 'CustomText'

  getTemplate() {
    return {
      content: 'hello',
      absolute: true,
      style: { position: 'absolute', zIndex: 99 }
    }
  }
}

export class PhoneCodeWidget extends BaseWidget {
  name = '手机验证码表单'
  type = 'PhoneCode'

  getTemplate() {
    return {
      confirmBtnText: '确认'
    }
  }
}

export class Page {
  constructor() {
    this.type = 'page' // 区分不同的页面类型，如兑换码售卖、打包课售卖、常规课售卖页等
    this.children = []
  }

  addWidget(template) {
    this.children.push(template)
  }
}

// 导出widget列表
export const WidgetList = [ImageWidget, ContainerWidget, TextWidget, PhoneCodeWidget]
