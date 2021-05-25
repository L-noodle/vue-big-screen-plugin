## 一、项目描述

- 这里一个基于 Vue3、TypeScript、DataV、ECharts 框架的 " **数据大屏项目** "，使用 '.vue' 和 '.tsx' 文件实现界面，采用新版动态屏幕适配方案，支持数据动态刷新渲染、内部DataV、ECharts图表都支持自由替换。组件详情请点击下方 ECharts 和 DataV 文档。

- [**Vue2 版本请点击这里查看，地图支持自动轮播哦~**](https://gitee.com/MTrun/big-screen-vue-datav)
- [**React 版本请点击这里查看，全新界面超级好看！！！(o ﾟ v ﾟ)ノ**](https://gitee.com/MTrun/react-big-screen)
- 项目按照 1920*1080 比例设计，支持任何尺寸的同比例缩放。
- 项目封装的 ECharts 区域使用了全部引入的方式，增加了打包体积，在实际运用中请使用 **按需引入**。
- 拉取项目之后，建议按照自己的功能区域重命名文件，现以简单的位置进行区分。
- 项目环境：@vue/cli-4.5.13、DataV-2.10、Echarts-5.1.1、Npm-6.14.6、Node-v14.16。
- 请拉取 master 分支的代码，其余分支是开发分支。

## 需要查看详细文档或者最新代码的请点击下方的gitee 地址👇
## [项目 gitee 地址（click here）](https://gitee.com/MTrun/vue-big-screen-plugin)

项目展示
![项目展示](https://images.gitee.com/uploads/images/2020/1208/183608_b893a510_4964818.gif "20201208_221020.gif")


## 二、主要文件介绍

| 文件                | 作用/功能                                                              |
| ------------------- | --------------------------------------------------------------------- |
| main.ts           | 主目录文件，引入注册 自定义组件、DataV 、样式等数据          |
| views/*       | 界面各个区域组件按照位置来命名，index 是项目主结构                 |
| constant/* | 静态数据项，所有的标题和图标都配置在这里                              |
| utils/* | 全局公共函数（包含屏幕适配函数）                 |
| assets/*           | 静态资源目录，放置图片与全局样式（index 文件样式单独放在这里）             |
| components/echart   | 封装的全局图表渲染函数                  |
| components/componentInstall | 全局组件注册位置 |
| common/* | 通用数据配置项（放置 echart 样式与地图数据）                 |
| router/* | 路由配置区域                                                 |
| store/* | Vuex 相关区域                                                |
| src/ *.d.ts | 全局类型声明文件                                             |

## 需要查看详细文档或者最新代码的请点击下方的gitee 地址，谢谢合作！👇
## [项目 gitee 地址（click here）](https://gitee.com/MTrun/vue-big-screen-plugin)