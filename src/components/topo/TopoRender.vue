<template>
    <div class="topo-render" :style="layerStyle" v-if="configData.layer">
        <div v-for="(component,index) in configData.components" :key="index">
            <div class="topo-render-wrapper"
                    :key="index"
                    @click="doClickComponent(component)"
                    @dblclick="doDbClickComponent(component)"
                    :class="{'topo-render-wrapper-clickable': component.action.length > 0 }"
                    v-show="component.style.visible == undefined? true:component.style.visible"
                    :style="{
                        left: component.style.position.x + 'px',
                        top: component.style.position.y + 'px',
                        width: component.style.position.w + 'px',
                        height: component.style.position.h + 'px',
                        backgroundColor: component.style.backColor,
                        zIndex: component.style.zIndex,
                        borderWidth: component.style.borderWidth + 'px',
                        borderStyle: component.style.borderStyle,
                        borderColor: component.style.borderColor,
                        transform: component.style.transform? `rotate(${component.style.transform}deg)`:'rotate(0deg)',
                    }">
                <component v-bind:is="parseView(component)" :detail="component" ref="spirit" />
            </div>
        </div>
    </div>
</template>

<script>
import TopoBase from './TopoBase'

import topoUtil from './util/topo-util'

export default {
  name: 'TopoRender',
  extends: TopoBase,
  components: {

  },
  computed: {
    layerStyle: function () {
      const styles = []
      if (this.configData.layer.backColor) {
        styles.push(`background-color: ${this.configData.layer.backColor}`)
      }
      if (this.configData.layer.backgroundImage) {
        styles.push(`background-image: url("${this.configData.layer.backgroundImage}")`)
      }
      if (this.configData.layer.width > 0) {
        styles.push(`width: ${this.configData.layer.width}px`)
      }
      if (this.configData.layer.height > 0) {
        styles.push(`height: ${this.configData.layer.height}px`)
      }
      const style = styles.join(';')
      return style
    }
  },
  data () {
    return {
      configData: {

      }
    }
  },
  methods: {
    parseView (component) {
      return topoUtil.parseViewName(component)
    },
    doClickComponent (component) {
      for (let i = 0; i < component.action.length; i++) {
        const action = component.action[i]
        if (action.type === 'click') {
          this.handleComponentActuib(action)
        }
      }
    },
    doDbClickComponent (component) {
      for (let i = 0; i < component.action.length; i++) {
        const action = component.action[i]
        if (action.type === 'dblclick') {
          this.handleComponentActuib(action)
        }
      }
    },
    handleComponentActuib (action) {
      const _this = this
      if (action.action === 'visible') {
        if (action.showItems.length > 0) {
          action.showItems.forEach(identifier => {
            _this.showComponent(identifier, true)
          })
        }
        if (action.hideItems.length > 0) {
          action.hideItems.forEach(identifier => {
            _this.showComponent(identifier, false)
          })
        }
      } else if (action.action === 'service') {
        _this.sendFun(action)
      }
    },
    showComponent (identifier, visible) {
      console.log('show:' + identifier + ',visible:' + visible)
      const spirits = this.$refs.spirit
      for (let i = 0; i < spirits.length; i++) {
        const spirit = spirits[i]
        if (spirit.detail.identifier === identifier) {
          spirit.detail.style.visible = visible
          break
        }
      }
    }
  },
  mounted () {
    // 这里只是纯前端项目，实际应该从后台拿取数据
    const temp = localStorage.getItem('topoData')
    this.configData = JSON.parse(temp)
  }
}
</script>

<style lang="scss">
    .topo-render {
        overflow: auto;
        background-color: white;
        background-clip: padding-box;
        background-origin: padding-box;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
        height: 100%;

        .topo-render-wrapper {
            position: absolute;
        }

        .topo-render-wrapper-clickable {
            cursor: pointer;
        }
    }
</style>
