export default class PreviewMessage {
  constructor(frame, targetOrigin) {
    this.targetFrame = frame
    // this.targetWindow = targetWindow
    this.targetOrigin = targetOrigin

    this.eventMap = {}

    window.addEventListener('message', this.listener, false)
  }

  listener = (e) => {
    if (!e.data) return
    const { type, data } = e.data
    if (!type) return
    const handlers = this.eventMap[type]
    if (!Array.isArray(handlers) || !handlers.length) return
    handlers.forEach(handler => handler(data))
  }

  on(type, handler) {
    if (!Array.isArray(this.eventMap[type])) {
      this.eventMap[type] = []
    }
    this.eventMap[type].push(handler)
  }

  emit(type, data) {
    const params = { type, data }
    if (this.targetFrame) {
      this.targetFrame.contentWindow.postMessage(params, this.targetOrigin)
    } else {
      window.parent.postMessage(params, this.targetOrigin)
    }
  }

  destroy() {
    window.removeEventListener('message', this.listener, false)
  }
}
