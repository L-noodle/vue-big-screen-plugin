import { defineComponent, watch, ref } from 'vue';
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
    // 定义颜色
    const colorList = {
      linearYtoG: {
        type: "linear",
        x: 0,
        y: 0,
        x2: 1,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "#f5b44d"
          },
          {
            offset: 1,
            color: "#28f8de"
          }
        ]
      },
      linearGtoB: {
        type: "linear",
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: "#43dfa2"
          },
          {
            offset: 1,
            color: "#28f8de"
          }
        ]
      },
      linearBtoG: {
        type: "linear",
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: "#1c98e8"
          },
          {
            offset: 1,
            color: "#28f8de"
          }
        ]
      },
      areaBtoG: {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "rgba(35,184,210,.2)"
          },
          {
            offset: 1,
            color: "rgba(35,184,210,0)"
          }
        ]
      }
    }
    // 配置项
    let options ={}

    // 监听
    watch(
      () => props.cdata,
      (val: any) => {
        options = {
          title: {
            text: "",
            textStyle: {
              color: "#D3D6DD",
              fontSize: 24,
              fontWeight: "normal"
            },
            subtext: val.year + "/" + val.weekCategory[6],
            subtextStyle: {
              color: "#fff",
              fontSize: 16
            },
            top: 50,
            left: 80
          },
          legend: {
            top: 120,
            left: 80,
            orient: "vertical",
            itemGap: 15,
            itemWidth: 12,
            itemHeight: 12,
            data: ["平均指标", "我的指标"],
            textStyle: {
              color: "#fff",
              fontSize: 14
            }
          },
          tooltip: {
            trigger: "item"
          },
          radar: {
            center: ["68%", "27%"],
            radius: "40%",
            name: {
              color: "#fff"
            },
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                color: colorList.linearYtoG,
                opacity: 0.6
              }
            },
            splitLine: {
              lineStyle: {
                color: colorList.linearYtoG,
                opacity: 0.6
              }
            },
            splitArea: {
              areaStyle: {
                color: "#fff",
                opacity: 0.1,
                shadowBlur: 25,
                shadowColor: "#000",
                shadowOffsetX: 0,
                shadowOffsetY: 5
              }
            },
            indicator: [
              {
                name: "服务态度",
                max: val.maxData
              },
              {
                name: "产品质量",
                max: 10
              },
              {
                name: "任务效率",
                max: 12
              },
              {
                name: "售后保障",
                max: 3.5
              }
            ]
          },
          grid: {
            left: 90,
            right: 80,
            bottom: '15%',
            top: "50%"
          },
          xAxis: {
            type: "category",
            position: "bottom",
            axisLine: true,
            axisLabel: {
              color: "rgba(255,255,255,.8)",
              fontSize: 12
            },
            data: val.weekCategory
          },
          // 下方Y轴
          yAxis: {
            name: "工单",
            nameLocation: "end",
            nameGap: 24,
            nameTextStyle: {
              color: "rgba(255,255,255,.5)",
              fontSize: 14
            },
            max: val.maxData,
            splitNumber: 4,

            axisLine: {
              lineStyle: {
                opacity: 0
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#fff",
                opacity: 0.1
              }
            },
            axisLabel: {
              color: "rgba(255,255,255,.8)",
              fontSize: 12
            }
          },
          series: [
            {
              name: "",
              type: "radar",
              symbolSize: 0,
              data: [
                {
                  value: val.radarDataAvg[6],
                  name: "平均指标",
                  itemStyle: {
                    normal: {
                      color: "#f8d351"
                    }
                  },
                  lineStyle: {
                    normal: {
                      opacity: 0
                    }
                  },
                  areaStyle: {
                    normal: {
                      color: "#f8d351",
                      shadowBlur: 25,
                      shadowColor: "rgba(248,211,81,.3)",
                      shadowOffsetX: 0,
                      shadowOffsetY: -10,
                      opacity: 1
                    }
                  }
                },
                {
                  value: val.radarData[6],
                  name: "我的指标",
                  itemStyle: {
                    normal: {
                      color: "#43dfa2"
                    }
                  },
                  lineStyle: {
                    normal: {
                      opacity: 0
                    }
                  },
                  areaStyle: {
                    normal: {
                      color: colorList.linearGtoB,
                      shadowBlur: 15,
                      shadowColor: "rgba(0,0,0,.2)",
                      shadowOffsetX: 0,
                      shadowOffsetY: 5,
                      opacity: 0.8
                    }
                  }
                }
              ]
            },
            {
              name: "",
              type: "line",
              smooth: true,
              symbol: "emptyCircle",
              symbolSize: 8,
              itemStyle: {
                normal: {
                  color: "#fff"
                }
              },
              lineStyle: {
                normal: {
                  color: colorList.linearBtoG,
                  width: 3
                }
              },
              areaStyle: {
                normal: {
                  color: colorList.areaBtoG
                }
              },
              data: val.weekLineData,
              lineSmooth: true,
              markLine: {
                silent: true,
                data: [
                  {
                    type: "average",
                    name: "平均值"
                  }
                ],
                precision: 0,
                label: {
                  normal: {
                    formatter: "平均值: \n {c}"
                  }
                },
                lineStyle: {
                  normal: {
                    color: "rgba(248,211,81,.7)"
                  }
                }
              },
              tooltip: {
                position: "top",
                formatter: "{c} m",
                backgroundColor: "rgba(28,152,232,.2)",
                padding: 6
              }
            },
            {
              name: "占位背景",
              type: "bar",
              itemStyle: {
                normal: {
                  show: true,
                  color: "#000",
                  opacity: 0
                }
              },
              silent: true,
              barWidth: "50%",
              data: val.weekMaxData,
              animation: false
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
      const height = "480px"
      const width = "100%"

      return <div>
        <echart ref={chartRef} height={height} width={width} />
      </div>
    }
  }
})

