import { onMounted, onUnmounted, reactive } from '@vue/composition-api'

const isTouchable = typeof window !== 'undefined' && 'ontouchstart' in window

const TOUCH = {
  start: isTouchable ? 'touchstart' : 'mousedown',
  move: isTouchable ? 'touchmove' : 'mousemove',
  end: isTouchable ? 'touchend' : 'mouseup'
}

function getTouchX(e) {
  return isTouchable ? e.changedTouches[0].clientX : e.clientX
}

export default function() {
  let dom
  const domRef = (el) => {
    dom = el
  }

  const pos = reactive({ left: 0, top: 0 })

  let startX, startY
  let isDrag = false

  const mouseDown = (e) => {
    console.log('start')
    isDrag = true
    e.preventDefault()
    startX = e.clientX
    startY = e.clientY
  }
  const mouseMove = (e) => {
    if (!isDrag) return
    const { clientX, clientY } = e

    pos.left = clientX - startX
    pos.top = clientY - startY
  }

  const mouseUp = () => {
    isDrag = false
  }

  onMounted(() => {
    if (!dom) return

    dom.addEventListener(TOUCH.start, mouseDown)
    document.addEventListener(TOUCH.move, mouseMove)
    document.addEventListener(TOUCH.end, mouseUp)
  })
  onUnmounted(() => {
    if (!dom) return
    dom.removeEventListener(TOUCH.start, mouseDown)
    document.removeEventListener(TOUCH.move, mouseMove)
    document.removeEventListener(TOUCH.end, mouseUp)
  })

  return {
    domRef,
    pos
  }
}
