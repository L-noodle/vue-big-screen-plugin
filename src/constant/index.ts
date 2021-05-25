// 星期
export const WEEK = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

// 主题名称与副标题名称
export const title = '大数据可视化平台'
export const subtitle = ['数据分析1', '数据分析2', 'vue-big-screen']

// 各类标题与图标
type ModuleInfo = {
  name: string
  icon: string
}[]

export const moduleInfo: ModuleInfo = [
  // 中间的几个模块
  {
    name: '任务通过率',
    icon: 'icon-chart-bar',
  },
  {
    name: '地图数据',
    icon: 'icon-tongji4',
  },
  {
    name: '产品销售渠道分析',
    icon: 'icon-align-left',
  },
  {
    name: '任务完成排行榜',
    icon: 'icon-zhibiao2',
  },
  // 底部两个模块
  {
    name: '数据统计图',
    icon: 'icon-vector',
  },
  {
    name: '工单修复以及满意度统计图',
    icon: 'icon-fenxi7',
  },
]
