<template>
  <div id="index" ref="appRef">
    <div class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <div class="d-flex jc-center">
          <dv-decoration-10 class="dv-dec-10" />
          <div class="d-flex jc-center">
            <dv-decoration-8 class="dv-dec-8" :color="['#568aea', '#000000']" />
            <div class="title">
              <span class="title-text">{{ title }}</span>
              <dv-decoration-6
                class="dv-dec-6"
                :reverse="true"
                :color="['#50e3c2', '#67a1e5']"
              />
            </div>
            <dv-decoration-8
              class="dv-dec-8"
              :reverse="true"
              :color="['#568aea', '#000000']"
            />
          </div>
          <dv-decoration-10 class="dv-dec-10-s" />
        </div>

        <!-- 第二行 -->
        <div class="d-flex jc-between px-2">
          <div class="d-flex aside-width">
            <div class="react-left ml-4 react-l-s">
              <span class="react-before"></span>
              <span class="text">{{ subtitle[0] }}</span>
            </div>
            <div class="react-left ml-3">
              <span class="text">{{ subtitle[1] }}</span>
            </div>
          </div>
          <div class="d-flex aside-width">
            <div class="react-right bg-color-blue mr-3">
              <span class="text fw-b">{{ subtitle[2] }}</span>
            </div>
            <div class="react-right mr-4 react-l-s">
              <span class="react-after"></span>
              <span class="text">
                {{ timeInfo.dateYear }} {{ timeInfo.dateWeek }}
                {{ timeInfo.dateDay }}
              </span>
            </div>
          </div>
        </div>

        <div class="body-box">
          <!-- 第三行数据 -->
          <div class="content-box">
            <div>
              <dv-border-box-12>
                <center-left1 />
              </dv-border-box-12>
            </div>
            <div>
              <dv-border-box-12>
                <center-left2 />
              </dv-border-box-12>
            </div>
            <!-- 中间 -->
            <div>
              <center />
            </div>
            <!-- 中间 -->
            <div>
              <center-right1 />
            </div>
            <div>
              <dv-border-box-13>
                <center-right2 />
              </dv-border-box-13>
            </div>
          </div>

          <!-- 第四行数据 -->
          <div class="bototm-box">
            <dv-border-box-13>
              <bottom-left />
            </dv-border-box-13>
            <dv-border-box-12>
              <bottom-right />
            </dv-border-box-12>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
} from 'vue'
import { formatTime } from '@/utils/index'
import { WEEK } from '@/constant/index'
import useIndex from '@/utils/useDraw'
import { title, subtitle, moduleInfo } from '@/constant/index'
import CenterLeft1 from '../centerLeft1/index.vue'
import CenterLeft2 from '../centerLeft2/index.vue'
import Center from '../center/index.vue'
import CenterRight1 from '../centerRight1/index.vue'
import CenterRight2 from '../centerRight2/index.vue'
import BottomLeft from '../bottomLeft/index.vue'
import BottomRight from '../bottomRight/index.vue'

export default defineComponent({
  components: {
    CenterLeft1,
    CenterLeft2,
    Center,
    CenterRight1,
    CenterRight2,
    BottomLeft,
    BottomRight
  },
  setup() {
    // * 加载标识
    const loading = ref<boolean>(true)
    // * 时间内容
    const timeInfo = reactive({
      setInterval: 0,
      dateDay: '',
      dateYear: '',
      dateWeek: ''
    })
    // * 适配处理
    const { appRef, calcRate, windowDraw } = useIndex()
    // 生命周期
    onMounted(() => {
      cancelLoading()
      handleTime()
      // todo 屏幕适应
      windowDraw()
      calcRate()
    })

    onBeforeUnmount(() => {
      clearInterval(timeInfo.setInterval)
    })

    // methods
    // todo 处理 loading 展示
    const cancelLoading = () => {
      setTimeout(() => {
        loading.value = false
      }, 500)
    }

    // todo 处理时间监听
    const handleTime = () => {
      timeInfo.setInterval = setInterval(() => {
        const date = new Date()
        timeInfo.dateDay = formatTime(date, 'HH: mm: ss')
        timeInfo.dateYear = formatTime(date, 'yyyy-MM-dd')
        timeInfo.dateWeek = WEEK[date.getDay()]
      }, 1000)
    }

    // return
    return {
      loading,
      timeInfo,
      appRef,
      title,
      subtitle,
      moduleInfo
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/index.scss';
</style>
