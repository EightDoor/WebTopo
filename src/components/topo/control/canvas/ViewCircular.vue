<template>
<canvas ref="elCanvas" :width="detail.style.position.w" :height="detail.style.position.h">
Your browser does not support the HTML5 canvas tag.
</canvas>
</template>

<script>
import canvasView from './ViewCanvas'

export default {
  name: 'ViewCircular',
  extends: canvasView,
  methods: {
    drawCircular (x, y, r, start, end, color, type) {
      const el = this.$refs.elCanvas
      const ctx = el.getContext('2d')
      const unit = Math.PI / 180
      ctx.beginPath()
      ctx.arc(x, y, r, start * unit, end * unit)
      // ctx.arc(100, 100, 100, 0, 2 * Math.PI);
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
      const x = w / 2,
        y = h / 2,
        r = ((w / 2) > (h / 2)) ? (h / 2) : (w / 2)
      const color = this.getForeColor()
      // this.drawCircular(0, 0, 0, 0, 360, color, 'fill');
      this.drawCircular(x, y, r - 2, 0, 360, color, 'fill')
    }
  },
  mounted () {
    this.onResize()
  }
}
</script>
