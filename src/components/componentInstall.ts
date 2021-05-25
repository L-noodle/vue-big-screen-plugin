import type { DefineComponent } from 'vue'

const component = Object.create(null)
/* eslint-disable */
import Echart from './echart/index'

component.install = function (vue: DefineComponent) {
  // ECharts 图表渲染
  vue.component('echart', Echart)
}
export default component
