import { defineComponent, reactive } from 'vue'
import Draw from './draw'

export default defineComponent({
  components: {
    Draw
  },
  setup() {
    const cdata = reactive([
      {
        // 名字需要与 “common/map/fujian.js” 地图数据文件里面定义的一一对应，不能是 “福州” 或者 “闽” 之类的缩写
        name: '福州市',
        value: 10,
        elseData: {
          // 这里放置地图 tooltip 里想显示的数据
        }
      },
      {
        name: '厦门市',
        value: 9,
      },
      {
        name: '漳州市',
        value: 8,
      },
      {
        name: '泉州市',
        value: 7,
      },
      {
        name: '三明市',
        value: 6,
      },
      {
        name: '莆田市',
        value: 5,
      },
      {
        name: '南平市',
        value: 4,
      },
      {
        name: '龙岩市',
        value: 3,
      },
      {
        name: '宁德市',
        value: 2,
      }
    ])

    return () => {
      return <div>
        <Draw cdata={cdata} />
      </div>
    }
  }
})