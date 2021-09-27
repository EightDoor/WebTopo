<template>
<canvas ref="elCanvas" :width="detail.style.position.w" :height="detail.style.position.h">
Your browser does not support the HTML5 canvas tag.
</canvas>
</template>

<script>
import canvasView from './ViewCanvas'

export default {
  name: 'ViewRect',
  extends: canvasView,
  methods: {
    drawRect (x, y, width, height, radius, color, type) {
      const el = this.$refs.elCanvas
      const ctx = el.getContext('2d')
      ctx.beginPath()
      ctx.moveTo(x, y + radius)
      ctx.lineTo(x, y + height - radius)
      ctx.quadraticCurveTo(x, y + height, x + radius, y + height)
      ctx.lineTo(x + width - radius, y + height)
      ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
      ctx.lineTo(x + width, y + radius)
      ctx.quadraticCurveTo(x + width, y, x + width - radius, y)
      ctx.lineTo(x + radius, y)
      ctx.quadraticCurveTo(x, y, x, y + radius)
      ctx[type + 'Style'] = color
      ctx.closePath()
      ctx[type]()
    },
    onResize () {
      const w = this.detail.style.position.w
      const h = this.detail.style.position.h
      const el = this.$refs.elCanvas
      const ctx = el.getContext('2d')
      ctx.clearRect(0, 0, w, h)
      const radius = this.detail.style.radius ? this.detail.style.radius : 0
      const color = this.getForeColor()
      this.drawRect(4, 4, w - 8, h - 8, radius, color, 'fill')
    }
  },
  mounted () {
    this.onResize()

    if (!this.editMode) {
      const _this = this
      let i = 0
      debugger
      this.SimpleEventBus.on('first-event', function (msg) {
        if (msg % 2) {
          _this.detail.style.foreColor = 'blue'
        } else {
          _this.detail.style.foreColor = 'red'
        }
        _this.onResize()
      })
      // 这里模拟服务器发送消息
      setInterval(() => {
        this.SimpleEventBus.emit('first-event', i)
        i++
      }, 500)
    }
  }
}
</script>
