<template>
  <div ref="wrap" class="resize" :class="{'resize-active':isActive}" :style="style">
    <slot />
    <template v-if="isActive">
      <div v-for="item in posList" :key="item" :data-dir="item" :class="['resize_stick', 'resize_stick-'+item]" />
    </template>
  </div>
</template>

<script>
// 暂时只支持PC端鼠标操作
const isTouchable = typeof window !== 'undefined' && 'ontouchstart' in window

const TOUCH = {
  start: isTouchable ? 'touchstart' : 'mousedown',
  move: isTouchable ? 'touchmove' : 'mousemove',
  end: isTouchable ? 'touchend' : 'mouseup'
}

// 移动方向
const DIRECTION = {
  none: -1,
  horizontal: 1,
  vertical: 2,
  all: 3
}

function getTouchX(e) {
  return isTouchable ? e.changedTouches[0].clientX : e.clientX
}

function getTouchY(e) {
  return isTouchable ? e.changedTouches[0].clientY : e.clientY
}

export default {
  name: 'Resize',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      posList: ['tl', 'tm', 'tr', 'ml', 'mr', 'bl', 'bm', 'br'],
      width: 0,
      height: 0
    }
  },
  computed: {
    style() {
      if (!this.isActive) return
      if (!this.width && !this.height) return
      return { width: this.width, height: this.height }
    }
  },
  watch: {
    isActive(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.calcInitSize()
        })
      }
    },
    style(newVal) {
      this.$emit('resize', { ...newVal })
    }
  },
  mounted() {
  },
  beforeDestroy() {
    document.removeEventListener(TOUCH.move, this.mouseMove)
    document.removeEventListener(TOUCH.end, this.mouseUp)
  },
  methods: {
    calcInitSize() {
      const dom = this.$refs.wrap.children[0]
      // console.log(dom)
      this.width = dom.clientWidth + 'px'
      this.height = dom.clientHeight + 'px'
      // console.log(this.style)
      this.initResize()
    },
    initResize() {
      const oWrap = this.$refs.wrap

      const getHandleDirection = (e) => {
        const { target } = e
        const { dir } = target.dataset
        const horizontal = ['ml', 'mr']
        const vertical = ['tm', 'bm']
        const all = ['tl', 'tr', 'bl', 'br']

        if (horizontal.includes(dir)) {
          return DIRECTION.horizontal
        } else if (vertical.includes(dir)) {
          return DIRECTION.vertical
        } else if (all.includes(dir)) {
          return DIRECTION.all
        }
        return DIRECTION.none
      }

      const init = () => {
        const originHeight = oWrap.clientHeight
        const originWidth = oWrap.clientWidth

        let startY
        let startX

        let isDrag = false
        let offset = 0
        let offsetX = 0

        let direction
        // 事件处理函数
        const mouseStart = e => {
          direction = getHandleDirection(e)
          if (direction === DIRECTION.none) return

          startY = getTouchY(e) - offset
          startX = getTouchX(e) - offsetX
          isDrag = true
          e.preventDefault()
        }

        const mouseMove = e => {
          if (!isDrag) {
            return
          }

          const diffY = getTouchY(e) - startY
          const diffX = getTouchX(e) - startX

          const targetHeight = originHeight + diffY + 'px'
          const targetWidth = originWidth + diffX + 'px'

          if (direction === DIRECTION.horizontal) {
            this.width = targetWidth
          } else if (direction === DIRECTION.vertical) {
            this.height = targetHeight
          } else if (direction === DIRECTION.all) {
            this.width = targetWidth
            this.height = targetHeight
          }

          e.preventDefault()
        }

        const mouseUp = e => {
          if (!isDrag) return
          offset = getTouchY(e) - startY
          offsetX = getTouchX(e) - startX

          isDrag = false
        }

        oWrap.removeEventListener(TOUCH.start, this.mouseStart)
        document.removeEventListener(TOUCH.move, this.mouseMove)
        document.removeEventListener(TOUCH.end, this.mouseUp)

        this.mouseStart = mouseStart
        this.mouseMove = mouseMove
        this.mouseUp = mouseUp

        oWrap.addEventListener(TOUCH.start, this.mouseStart)
        document.addEventListener(TOUCH.move, this.mouseMove)
        document.addEventListener(TOUCH.end, this.mouseUp)
      }

      init()
    }
  }
}
</script>

<style scoped lang="scss">
.resize {
  position: relative;
  &-active {
    z-index: 1;
  }

  &_stick {
    position: absolute;

    width: 8px;
    height: 8px;

    box-sizing: border-box;
    font-size: 1px;
    background: #fff;
    border: 1px solid #6c6c6c;
    box-shadow: 0 0 2px #bbb;

    &-tl {
      top: -4px;
      left: -4px;
      cursor: nwse-resize;
    }

    &-tm {
      top: -4px;
      left: 0;
      right: 0;
      margin: 0 auto;
      cursor: ns-resize;
    }

    &-tr {
      top: -4px;
      right: -4px;
      cursor: nesw-resize;
    }

    &-ml {
      top: 0;
      left: -4px;
      bottom: 0;
      margin: auto 0;
      cursor: ew-resize;
    }

    &-mr {
      top: 0;
      right: -4px;
      bottom: 0;
      margin: auto 0;
      cursor: ew-resize;
    }

    &-bl {
      bottom: -4px;
      left: -4px;
      cursor: nesw-resize;
    }

    &-bm {
      bottom: -4px;
      left: 0;
      right: 0;
      margin: 0 auto;
      cursor: ns-resize;
    }

    &-br {
      bottom: -4px;
      right: -4px;
      cursor: nwse-resize;
    }
  }
}

</style>
