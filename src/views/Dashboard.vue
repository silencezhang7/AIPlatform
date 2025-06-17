<template>
  <div class="dashboard-root">
    <!-- 顶部统计卡片 -->
    <div class="dashboard-stat-row">
      <el-card class="dashboard-stat-card" shadow="never">
        <div class="stat-title">调用总量(次)</div>
        <div class="stat-value-row">
          <span class="stat-value">15478</span>
          <CallTotalSvg class="stat-chart"/>
        </div>
        <div class="stat-growth stat-growth-up">
          <span>↑ 3179.48%</span>
        </div>
      </el-card>
      <el-card class="dashboard-stat-card" shadow="never">
        <div class="stat-title">最近3天调用(次)</div>
        <div class="stat-value-row">
          <span class="stat-value">2490</span>
          <Call3DaySvg class="stat-chart"/>
        </div>
        <div class="stat-growth stat-growth-down">
          <span>↓ 23.71%</span>
        </div>
      </el-card>
      <el-card class="dashboard-stat-card" shadow="never">
        <div class="stat-title">最近7天调用(次)</div>
        <div class="stat-value-row">
          <span class="stat-value">7309</span>
          <Call7DaySvg class="stat-chart"/>
        </div>
        <div class="stat-growth stat-growth-down">
          <span>↓ 23.71%</span>
        </div>
      </el-card>
      <el-card class="dashboard-stat-card" shadow="never">
        <div class="stat-title">最近30天调用(次)</div>
        <div class="stat-value-row">
          <span class="stat-value">15452</span>
          <Call30DaySvg class="stat-chart"/>
        </div>
        <div class="stat-growth stat-growth-down">
          <span>↓ 23.71%</span>
        </div>
      </el-card>
    </div>

    <!-- 第二行：概览统计和折线趋势 -->
    <div class="dashboard-row">
      <el-card class="dashboard-col" shadow="never">
        <div class="dashboard-title">调用概览统计</div>
        <el-descriptions :column="1" border>
          <el-descriptions-item label="充值级">0</el-descriptions-item>
          <el-descriptions-item label="消费级">15405</el-descriptions-item>
          <el-descriptions-item label="管理级">0</el-descriptions-item>
          <el-descriptions-item label="系统级">0</el-descriptions-item>
          <el-descriptions-item label="测试级">73</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card class="dashboard-col dashboard-col-lg" shadow="never">
        <div class="dashboard-title dashboard-title-row">
          <span>消费级接口调用次数走势</span>
          <div class="dashboard-tabs">
            <span :class="{active: chartTab===0}" @click="chartTab=0">今天</span>
            <span :class="{active: chartTab===1}" @click="chartTab=1">7天</span>
            <span :class="{active: chartTab===2}" @click="chartTab=2">15天</span>
            <span :class="{active: chartTab===3}" @click="chartTab=3">30天</span>
          </div>
        </div>
        <v-chart :option="lineOption" autoresize style="height: 260px;"/>
      </el-card>
    </div>

    <!-- 第三行 饼图+自定义渠道表 -->
    <div class="dashboard-row">
      <el-card class="dashboard-col dashboard-col-pie" shadow="never">
        <div class="dashboard-title">模型调用统计</div>
        <v-chart :option="pieOption" autoresize style="height: 300px; margin-top:10px;"/>
      </el-card>
      <el-card class="dashboard-col dashboard-col-table" shadow="never">
        <div class="dashboard-title">自定义渠道列表</div>
        <el-table :data="tableData" border style="width:100%;margin-top:12px;">
          <el-table-column prop="id" label="#" width="60"/>
          <el-table-column prop="name" label="渠道名称"/>
          <el-table-column prop="modelCount" label="模型数量" width="100"/>
          <el-table-column prop="callCount" label="调用次数" width="120"/>
          <el-table-column prop="createAt" label="创建日期" width="180"/>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent, h } from 'vue'
import { use } from 'echarts/core'
import VChart from 'vue-echarts'
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  LineChart,
  PieChart
} from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent
} from 'echarts/components'

// SVG 图标组件
const CallTotalSvg = defineComponent({
  name: 'CallTotalSvg',
  render() {
    return h('svg', {
      width: '72',
      height: '36',
      viewBox: '0 0 72 36',
      fill: 'none',
      innerHTML: `<path d="M4 32C18 16 32 8 50 16C60 20 68 12 68 12" stroke="#4165E8" stroke-width="3" fill="none"/><path d="M4 32Q18 16 50 16Q60 20 68 12" fill="url(#paint0_linear)" fill-opacity="0.08"/><defs><linearGradient id="paint0_linear" x1="4" y1="32" x2="68" y2="12" gradientUnits="userSpaceOnUse"><stop stop-color="#4165E8" /><stop offset="1" stop-color="#4165E8" stop-opacity="0.1"/></linearGradient></defs>`
    })
  }
})
const Call3DaySvg = defineComponent({
  name: 'Call3DaySvg',
  render() {
    return h('svg', {
      width: '72',
      height: '36',
      viewBox: '0 0 72 36',
      fill: 'none',
      innerHTML: `<path d="M4 32C18 10 32 24 50 28C60 30 68 16 68 16" stroke="#FF6565" stroke-width="3" fill="none"/><path d="M4 32Q18 10 50 28Q60 30 68 16" fill="url(#paint1_linear)" fill-opacity="0.08"/><defs><linearGradient id="paint1_linear" x1="4" y1="32" x2="68" y2="16" gradientUnits="userSpaceOnUse"><stop stop-color="#FF6565" /><stop offset="1" stop-color="#FF6565" stop-opacity="0.1"/></linearGradient></defs>`
    })
  }
})
const Call7DaySvg = defineComponent({
  name: 'Call7DaySvg',
  render() {
    return h('svg', {
      width: '72',
      height: '36',
      viewBox: '0 0 72 36',
      fill: 'none',
      innerHTML: `<path d="M4 32C18 18 32 14 50 22C60 26 68 14 68 14" stroke="#38C489" stroke-width="3" fill="none"/><path d="M4 32Q18 18 50 22Q60 26 68 14" fill="url(#paint2_linear)" fill-opacity="0.08"/><defs><linearGradient id="paint2_linear" x1="4" y1="32" x2="68" y2="14" gradientUnits="userSpaceOnUse"><stop stop-color="#38C489" /><stop offset="1" stop-color="#38C489" stop-opacity="0.1"/></linearGradient></defs>`
    })
  }
})
const Call30DaySvg = defineComponent({
  name: 'Call30DaySvg',
  render() {
    return h('svg', {
      width: '72',
      height: '36',
      viewBox: '0 0 72 36',
      fill: 'none',
      innerHTML: `<path d="M4 32C18 24 32 28 50 18C60 12 68 24 68 24" stroke="#FFB44C" stroke-width="3" fill="none"/><path d="M4 32Q18 24 50 18Q60 12 68 24" fill="url(#paint3_linear)" fill-opacity="0.08"/><defs><linearGradient id="paint3_linear" x1="4" y1="32" x2="68" y2="24" gradientUnits="userSpaceOnUse"><stop stop-color="#FFB44C" /><stop offset="1" stop-color="#FFB44C" stop-opacity="0.1"/></linearGradient></defs>`
    })
  }
})

use([
  CanvasRenderer,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent
])

const chartTab = ref(1)

const lineOption = ref({
  tooltip: {
    trigger: 'axis',
    valueFormatter: (value: any) => value + '次'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [
      '2025-06-11日','2025-06-12日','2025-06-13日','2025-06-14日','2025-06-15日','2025-06-16日','2025-06-17日'
    ]
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value}次'
    }
  },
  grid: { left: 20, right: 20, top: 40, bottom: 24, containLabel: true },
  series: [{
    name: '调用次数',
    type: 'line',
    smooth: true,
    areaStyle: {
      color: 'rgba(56,196,137,0.12)'
    },
    lineStyle: { width: 3, color: '#38C489' },
    itemStyle: { color: '#38C489' },
    data: [1200,1200,1705,200,600,1400,1200]
  }]
})

const pieOption = ref({
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {d}%'
  },
  legend: {
    orient: 'vertical',
    right: 10,
    top: 30,
    itemWidth: 12,
    itemHeight: 12
  },
  color: [
    '#4165E8', '#38C489', '#FFB44C', '#FF8F6B', '#5CA5FF',
    '#1ED6FF', '#F7C846', '#B376E6', '#9299A1', '#FFB44C', '#FF8F6B'
  ],
  series: [
    {
      type: 'pie',
      radius: ['60%', '80%'],
      avoidLabelOverlap: false,
      label: { show: false },
      emphasis: {
        label: {
          show: true,
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      labelLine: { show: false },
      data: [
        { value: 53, name: 'Qwen2.5-32B-Int8' },
        { value: 420, name: 'deepSeek-R1' },
        { value: 68, name: 'deepseek-r1-0528' },
        { value: 86, name: 'DeepSeek-R1-0528-Qwen3-8B' },
        { value: 85, name: 'deepSeek-R1-32B' },
        { value: 77, name: 'deepseek-v3' },
        { value: 66, name: 'gpt-3.5-turbo' },
        { value: 39, name: 'gpt-4o-mini' },
        { value: 12, name: 'gpt-4o-mini-2024-07-18' },
        { value: 300, name: 'Hammer-7b' },
        { value: 120, name: 'qwen-max' },
        { value: 73, name: 'qwen-plus' }
      ]
    }
  ]
})

const tableData = [
  { id: 2, name: 'Qwen2.5-72B（测试）', modelCount: 1, callCount: 5053, createAt: '2025-05-15 06:18:21' },
  { id: 3, name: 'Qwen3-30B-A3B（生产）', modelCount: 1, callCount: 6537, createAt: '2025-06-02 05:25:53' },
  { id: 4, name: 'DeepSeek-R1-Distill-Qwen-32B(生产)', modelCount: 1, callCount: 820, createAt: '2025-06-03 02:40:32' },
  { id: 6, name: 'Qwen2.5-32B-Int8(生产)', modelCount: 1, callCount: 1340, createAt: '2025-06-03 02:43:35' },
  { id: 8, name: '通义千问', modelCount: 7, callCount: 1241, createAt: '2025-06-05 05:45:50' },
  { id: 9, name: 'Qwen3-1.7B(测试)', modelCount: 1, callCount: 166, createAt: '2025-06-06 05:38:23' },
  { id: 11, name: 'Qwen2.5-72B(生产)', modelCount: 1, callCount: 195, createAt: '2025-06-09 06:25:10' },
  { id: 12, name: 'OpenAI', modelCount: 2, callCount: 12, createAt: '2025-06-10 02:20:15' }
]
</script>

<style scoped>
.dashboard-root {
  padding: 18px 14px 32px 18px;
  background: #f6f7fb;
  min-height: 100vh;
}
.dashboard-stat-row {
  display: flex;
  gap: 18px;
  margin-bottom: 18px;
}
.dashboard-stat-card {
  flex: 1;
  min-width: 225px;
  padding: 20px 28px 16px 22px;
  border-radius: 8px;
  background: #fff;
  position: relative;
}
.stat-title {
  font-weight: 600;
  font-size: 16px;
  color: #484D56;
  margin-bottom: 8px;
}
.stat-value-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.stat-value {
  font-size: 36px;
  font-weight: bold;
  color: #23272E;
  line-height: 1.1;
}
.stat-chart {
  width: 72px;
  height: 36px;
  margin-left: 8px;
}
.stat-growth {
  font-size: 14px;
  margin-top: 7px;
  font-weight: 500;
}
.stat-growth-up { color: #38C489; }
.stat-growth-down { color: #FF6565; }

.dashboard-row {
  display: flex;
  gap: 18px;
  margin-bottom: 18px;
}
.dashboard-col {
  background: #fff;
  border-radius: 8px;
  flex: 1;
  min-width: 250px;
  padding: 18px 20px 18px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.dashboard-col-lg {
  flex: 2.5;
  min-width: 500px;
}
.dashboard-title {
  font-size: 18px;
  font-weight: 700;
  color: #484D56;
  margin-bottom: 16px;
}
.dashboard-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.dashboard-tabs {
  display: flex;
  gap: 16px;
}
.dashboard-tabs span {
  font-size: 15px;
  color: #91949A;
  cursor: pointer;
  padding-bottom: 2px;
}
.dashboard-tabs .active {
  color: #4A72FF;
  border-bottom: 2px solid #4A72FF;
  font-weight: 600;
}
.dashboard-col-pie {
  flex: 1.1;
  min-width: 320px;
  padding-bottom: 8px;
}
.dashboard-col-table {
  flex: 2;
  min-width: 520px;
  padding-bottom: 8px;
}
</style>