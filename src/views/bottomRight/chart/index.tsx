import { defineComponent, reactive, onMounted, ref } from 'vue';
import Draw from './draw'

export default defineComponent({
  components: {
    Draw
  },
  setup() {
    const drawTiming = ref(0)
    const cdata = reactive({
      year: null,
      weekCategory: [],
      radarData: [],
      radarDataAvg: [],
      maxData: 12000,
      weekMaxData: [],
      weekLineData: []
    })

    // methods
    const setData = () => {
      // 清空轮询数据
      cdata.weekCategory = [];
      cdata.weekMaxData = [];
      cdata.weekLineData = [];
      cdata.radarData = [];
      cdata.radarDataAvg = [];

      const dateBase = new Date();
      cdata.year = dateBase.getFullYear();
      // 周数据
      for (let i = 0; i < 7; i++) {
        // 日期
        const date = new Date();
        cdata.weekCategory.unshift([date.getMonth() + 1, date.getDate() - i].join("/"));

        // 折线图数据
        cdata.weekMaxData.push(cdata.maxData);
        const distance = Math.round(Math.random() * 11000 + 500);
        cdata.weekLineData.push(distance);

        // 雷达图数据
        // 我的指标
        const averageSpeed = +(Math.random() * 5 + 3).toFixed(3);
        const maxSpeed = averageSpeed + +(Math.random() * 3).toFixed(2);
        const hour = +(distance / 1000 / averageSpeed).toFixed(1);
        const radarDayData = [distance, averageSpeed, maxSpeed, hour];
        cdata.radarData.unshift(radarDayData);

        // 平均指标
        const distanceAvg = Math.round(Math.random() * 8000 + 4000);
        const averageSpeedAvg = +(Math.random() * 4 + 4).toFixed(3);
        const maxSpeedAvg = averageSpeedAvg + +(Math.random() * 2).toFixed(2);
        const hourAvg = +(distance / 1000 / averageSpeed).toFixed(1);
        const radarDayDataAvg = [
          distanceAvg,
          averageSpeedAvg,
          maxSpeedAvg,
          hourAvg
        ];
        cdata.radarDataAvg.unshift(radarDayDataAvg);
      }

    }

    // 定时函数
    const drawTimingFn = () => {
      setData();
      drawTiming.value = setInterval(() => {
        setData();
      }, 6000);
    }

    // 生命周期
    onMounted(() => {
      drawTimingFn()
    })

    return () => {
      return <div>
        <Draw cdata={cdata} />
      </div>
    }
  }
})