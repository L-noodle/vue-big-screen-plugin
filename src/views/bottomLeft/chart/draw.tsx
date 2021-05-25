import { defineComponent, watch, ref } from 'vue'
import * as echarts from 'echarts'
// 声明类型
const PropsType = {
  cdata: {
    type: Object,
    require: true
  }
} as const

// 定义主体
export default defineComponent({
  props: PropsType,
  setup(props) {
    // 定义 ref
    const chartRef = ref()
    // 配置项
    let options = {}

    // 监听
    watch(
      () => props.cdata,
      (val: any) => {
        options = {
          tooltip: {
            show: true,
            trigger: "axis",
            backgroundColor: "rgba(255,255,255,0.1)",
            axisPointer: {
              type: "shadow",
              label: {
                show: true,
                backgroundColor: "#7B7DDC"
              }
            }
          },
          legend: {
            data: ["已贯通", "计划贯通", "贯通率"],
            textStyle: {
              color: "#B4B4B4"
            },
            top: "0%"
          },
          grid: {
            x: "8%",
            width: "88%",
            top: "5%",
            bottom: '7%'
          },
          xAxis: {
            data: val.category,
            axisLine: {
              lineStyle: {
                color: "#B4B4B4"
              }
            },
            axisTick: {
              show: false
            }
          },
          yAxis: [
            {
              splitLine: { show: false },
              axisLine: {
                lineStyle: {
                  color: "#B4B4B4"
                }
              },

              axisLabel: {
                formatter: "{value} "
              }
            },
            {
              splitLine: { show: false },
              axisLine: {
                lineStyle: {
                  color: "#B4B4B4"
                }
              },
              axisLabel: {
                formatter: "{value} "
              }
            }
          ],
          series: [
            {
              name: "贯通率",
              type: "line",
              smooth: true,
              showAllSymbol: true,
              symbol: "emptyCircle",
              symbolSize: 8,
              yAxisIndex: 1,
              itemStyle: {
                normal: {
                  color: "#F02FC2"
                }
              },
              data: val.rateData
            },
            {
              name: "已贯通",
              type: "bar",
              barWidth: 10,
              itemStyle: {
                normal: {
                  barBorderRadius: 5,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#956FD4" },
                    { offset: 1, color: "#3EACE5" }
                  ])
                }
              },
              data: val.barData
            },
            {
              name: "计划贯通",
              type: "bar",
              barGap: "-100%",
              barWidth: 10,
              itemStyle: {
                normal: {
                  barBorderRadius: 5,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "rgba(156,107,211,0.8)" },
                    { offset: 0.2, color: "rgba(156,107,211,0.5)" },
                    { offset: 1, color: "rgba(156,107,211,0.2)" }
                  ])
                }
              },
              z: -12,
              data: val.lineData
            }
          ]
        }
        // 手动触发更新
        if (chartRef.value) {
          // 通过初始化参数打入数据
          chartRef.value.initChart(options)
        }
      },
      {
        immediate: true,
        deep: true
      }
    )

    return () => {
      const height = "450px"
      const width = "100%"

      return <div>
        <echart ref={chartRef} height={height} width={width} />
      </div>
    }
  }
})

