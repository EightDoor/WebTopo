<template>
<canvas ref="elCanvas" :width="detail.style.position.w" :height="detail.style.position.h">
Your browser does not support the HTML5 canvas tag.
</canvas>
</template>

<script>
import canvasView from './ViewCanvas'

export default {
  name: 'ViewTriangle',
  extends: canvasView,
  methods: {
    drapTriangle (x1, y1, x2, y2, x3, y3, color, type) {
      const el = this.$refs.elCanvas
      const ctx = el.getContext('2d')
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.lineTo(x3, y3)
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
      const x1 = w / 2,
        y1 = 0,
        x2 = 0,
        y2 = h,
        x3 = w,
        y3 = h
      const color = this.getForeColor()
      this.drapTriangle(x1, y1, x2, y2, x3, y3, color, 'fill')
    }
  },
  mounted () {
    this.onResize()
  }
}
</script>
