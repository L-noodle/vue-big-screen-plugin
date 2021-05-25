import { defineComponent, watch, shallowReactive, nextTick, ref, onUnmounted } from 'vue';

// 声明类型
const PropsType = {
  cdata: {
    type: Array,
    require: true
  }
} as const

// 定义主体
export default defineComponent({
  props: PropsType,
  setup(props) {
    // 配置项
    let options = shallowReactive({})
    // 设置点的位置(经纬度)
    const geoCoordMap = {
      厦门市: [118.11022, 24.490474, 20],
      福州市: [119.206239, 26.275302, 20],
      泉州市: [118.589421, 24.908853, 20],
      漳州市: [117.561801, 24.510897, 20],
      龙岩市: [116.82978, 25.391603, 20],
      莆田市: [119.007558, 25.591011, 20],
      三明市: [117.435001, 26.465444, 20],
      南平市: [118.178459, 27.535627, 20],
      宁德市: [119.527082, 27.15924, 20],
    }
    const seriesData = [
      {
        name: '厦门市',
      },
      {
        name: '福州市',
      },
      {
        name: '泉州市',
      },
      {
        name: '漳州市',
      },
      {
        name: '龙岩市',
      },
      {
        name: '莆田市',
      },
      {
        name: '三明市',
      },
      {
        name: '南平市',
      },
      {
        name: '宁德市',
      },
    ]
    const convertData = function (data) {
      const scatterData = [];
      for (let i = 0; i < data.length; i++) {
        const geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          scatterData.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value),
          });
        }
      }
      return scatterData;
    }
    // 监听
    watch(
      () => props.cdata,
      (val: any) => {
        options = {
          showLegendSymbol: true,
          tooltip: {
            trigger: 'item',
            textStyle: {
              fontSize: 14,
              lineHeight: 22,
            },
            position: point => {
              // 固定在顶部
              return [point[0] + 50, point[1] - 20];
            },
            // 如果需要自定义 tooltip样式，需要使用formatter
            /*
              formatter: params => {
                return `<div style=""> ... </div>`
              }
            */
          },
          // 如果需要根据不同的数据展示深浅不一的颜色，则把这里打开
          // visualMap: {
          //   min: 0,
          //   max: 10,
          //   show: false,
          //   seriesIndex: 0,
          //   // 颜色
          //   inRange: {
          //     color: ['rgba(41,166,206, .5)', 'rgba(69,117,245, .9)'],
          //   },
          // },
          // 底部背景
          geo: [{
            show: true,
            aspectScale: 0.85, //长宽比
            zoom: 1.16,
            top: '10%',
            left: '17%',
            map: '福建',
            roam: false,
            itemStyle: {
              normal: {
                borderColor: '#7ad5ff7f',
                shadowOffsetY: 5,
                shadowBlur: 15,
                areaColor: 'rgba(5,21,35,0.1)'
              }
            }
          }],
          series: [
            {
              name: '相关指数',
              type: 'map',
              aspectScale: 0.85, //长宽比
              zoom: 1.16, //缩放
              mapType: '福建', // 自定义扩展图表类型
              top: '9%',
              left: '16%',
              itemStyle: {
                normal: {
                  // 背景渐变色
                  areaColor: {
                    type: 'linear-gradient',
                    x: 0,
                    y: 300,
                    x2: 0,
                    y2: 0,
                    colorStops: [{
                      offset: 0,
                      color: 'RGBA(19,96,187,1)' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: 'RGBA(7,193,223,1)' // 50% 处的颜色
                    }],
                    global: true // 缺省为 false
                  },
                  borderColor: '#4ECEE6',
                  borderWidth: 1,
                },
                emphasis: {
                  areaColor: '#4f7fff',
                  borderColor: 'rgba(0,242,252,.6)',
                  borderWidth: 2,
                  shadowBlur: 10,
                  shadowColor: '#00f2fc',
                },
              },
              label: {
                formatter: params => `${params.name}`,
                show: true,
                position: 'insideRight',
                textStyle: {
                  fontSize: 14,
                  color: '#efefef',
                },
                emphasis: {
                  textStyle: {
                    color: '#fff',
                  },
                },
              },
              data: val,
            },
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              symbolSize: 7,
              effectType: 'ripple',
              legendHoverLink: false,
              showEffectOn: 'render',
              rippleEffect: {
                period: 4,
                scale: 2.5,
                brushType: 'stroke',
              },
              zlevel: 1,
              itemStyle: {
                normal: {
                  color: '#99FBFE',
                  shadowBlur: 5,
                  shadowColor: '#fff',
                },
              },
              data: convertData(seriesData),
            },
          ],
        }
      },
      {
        immediate: true,
        deep: true
      }
    )
    return () => {
      const height = "360px"
      const width = "330px"

      return <div>
        <echart options={options} height={height} width={width} />
      </div>
    }
  }
})

