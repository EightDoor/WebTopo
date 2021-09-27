<template>
<canvas ref="elCanvas" :width="detail.style.position.w" :height="detail.style.position.h">
    Your browser does not support the HTML5 canvas tag.
</canvas>
</template>

<script>
import canvasView from './ViewCanvas'

export default {
  name: 'ViewLineWave',
  extends: canvasView,
  methods: {
    drawLine (ctx, width, height, lineWidth, color) {
      const len = Math.sqrt(width * width + height * height)
      // 起点
      this.ctx.beginPath()
      let x = 0
      let y = 0
      const amplitude = 5
      // 振幅
      const frequency = 5
      // 频率
      while (x < len) {
        y = amplitude * Math.sin(x / frequency)
        this.ctx.lineTo(x, y)
        x = x + 1
      }
      ctx.stroke()
    },
    onResize () {
      const w = this.detail.style.position.w
      const h = this.detail.style.position.h
      const el = this.$refs.elCanvas
      const ctx = el.getContext('2d')
      ctx.clearRect(0, 0, w, h)
      const color = this.getForeColor()
      let lineWidth = this.detail.style.lineWidth
      if (!lineWidth || typeof lineWidth !== 'number') {
        lineWidth = 2
      }
      this.drawLine(ctx, w, h, lineWidth, color)
    }
  },
  mounted () {
    this.onResize()
  }
}
</script>
