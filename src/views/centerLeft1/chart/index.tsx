import { defineComponent, reactive } from 'vue'
import Draw from './draw'

export default defineComponent({
  components: {
    Draw
  },
  setup() {
    const cdata = reactive({
      xData: ['数据1', '数据2', '数据3', '数据4', '数据5', '数据6'],
      seriesData: [
        { value: 10, name: '数据1' },
        { value: 5, name: '数据2' },
        { value: 15, name: '数据3' },
        { value: 25, name: '数据4' },
        { value: 20, name: '数据5' },
        { value: 35, name: '数据6' }
      ]
    })

    return () => {
      return <div>
        <Draw cdata={cdata} />
      </div>
    }
  }
})