<template>
  <section v-if="isReady" class="home-screen">
    <div class="column">
      <article class="chart-card">
        <h3>农产品产量趋势</h3>
        <ECharts :option="lineOption" height="100%" />
      </article>
      <article class="chart-card">
        <h3>乡村产业占比</h3>
        <ECharts :option="pieOption" height="100%" />
      </article>
      <article class="chart-card">
        <h3>村民满意度雷达</h3>
        <ECharts :option="radarOption" height="100%" />
      </article>
    </div>

    <div class="center-column">
      <CountFlipper :value="dashboard.annualOutput" />
      <article class="map-card chart-card">
        <h3>乡村地图（点击联动）</h3>
        <ECharts ref="mapChartRef" :option="mapOption" height="100%" />
      </article>
    </div>

    <div class="column">
      <article class="chart-card">
        <h3>行政村人口密度</h3>
        <ECharts :option="barOption" height="100%" />
      </article>
      <article class="chart-card">
        <h3>实时环境仪表盘</h3>
        <ECharts :option="gaugeOption" height="100%" />
      </article>
      <article class="chart-card">
        <h3>农村活跃度热力图</h3>
        <ECharts :option="heatmapOption" height="100%" />
      </article>
    </div>
  </section>
  <section v-else class="home-loading">
    大屏数据加载中...
  </section>
</template>

<script setup>
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import ECharts from '../components/ECharts.vue'
import CountFlipper from '../components/CountFlipper.vue'
import { getDashboardData } from '../api/dataService'

const mapChartRef = ref(null)
const isReady = ref(false)

const dashboard = reactive({
  outputTrend: [],
  industryShare: [],
  villageDensity: [],
  satisfaction: [],
  environment: { temperature: 0, humidity: 0, pm25: 0 },
  mapRegions: [],
  heatmap: { xAxis: [], yAxis: [], values: [] },
  annualOutput: 0,
})

const selectedRegion = ref('')
const safeSatisfaction = computed(() => {
  if (dashboard.satisfaction.length > 0) return dashboard.satisfaction
  return [
    { dimension: '道路交通', value: 0 },
    { dimension: '医疗服务', value: 0 },
    { dimension: '教育资源', value: 0 },
    { dimension: '就业机会', value: 0 },
    { dimension: '生态宜居', value: 0 },
  ]
})

// 折线图：10年产量趋势
const lineOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  grid: { top: 30, left: 46, right: 20, bottom: 30 },
  xAxis: {
    type: 'category',
    data: dashboard.outputTrend.map((item) => item.year),
    axisLabel: { color: '#b8d3ff' },
  },
  yAxis: { type: 'value', axisLabel: { color: '#b8d3ff' } },
  series: [
    {
      type: 'line',
      smooth: true,
      data: dashboard.outputTrend.map((item) => item.value),
      lineStyle: { width: 3, color: '#00f2fe' },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{ offset: 0, color: 'rgba(0,242,254,0.45)' }, { offset: 1, color: 'rgba(0,242,254,0.04)' }],
        },
      },
    },
  ],
}))

const pieOption = computed(() => ({
  tooltip: { trigger: 'item' },
  series: [
    {
      type: 'pie',
      radius: ['34%', '56%'],
      center: ['50%', '46%'],
      data: dashboard.industryShare,
      label: {
        color: '#d6e9ff',
        fontSize: 10,
      },
      labelLine: {
        length: 10,
        length2: 8,
        lineStyle: { color: '#6fa6de' },
      },
      minShowLabelAngle: 6,
      avoidLabelOverlap: true,
      color: ['#00f2fe', '#3ea6ff', '#4e78ff', '#2ee6a0', '#8dc8ff'],
    },
  ],
}))

const radarOption = computed(() => ({
  tooltip: { trigger: 'item' },
  radar: {
    splitNumber: 4,
    indicator: safeSatisfaction.value.map((item) => ({ name: item.dimension, max: 100 })),
    splitArea: { areaStyle: { color: ['rgba(0,242,254,0.04)', 'rgba(78,120,255,0.02)'] } },
    axisName: { color: '#d6e9ff' },
  },
  series: [
    {
      type: 'radar',
      data: [{ value: safeSatisfaction.value.map((item) => item.value), name: '满意度' }],
      areaStyle: { color: 'rgba(0,242,254,0.2)' },
      lineStyle: { color: '#00f2fe' },
    },
  ],
}))

// 柱状图：地图点击后高亮对应片区
const barOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  grid: { top: 30, left: 44, right: 18, bottom: 30 },
  xAxis: {
    type: 'category',
    data: dashboard.villageDensity.map((item) => item.region),
    axisLabel: { color: '#b8d3ff', interval: 0 },
  },
  yAxis: { type: 'value', axisLabel: { color: '#b8d3ff' } },
  series: [
    {
      type: 'bar',
      data: dashboard.villageDensity.map((item) => item.density),
      barWidth: 26,
      itemStyle: {
        color: (params) => (dashboard.villageDensity[params.dataIndex]?.region === selectedRegion.value ? '#00f2fe' : '#3e7bff'),
        borderRadius: [6, 6, 0, 0],
      },
    },
  ],
}))

const gaugeOption = computed(() => ({
  tooltip: { trigger: 'item' },
  series: [
    {
      type: 'gauge',
      radius: '88%',
      min: 0,
      max: 100,
      axisLine: { lineStyle: { width: 12, color: [[0.5, '#1f4eff'], [0.8, '#00c6ff'], [1, '#00f2fe']] } },
      progress: { show: true, width: 12 },
      detail: { formatter: '{value}°C', color: '#e9f4ff', fontSize: 20 },
      data: [{ value: dashboard.environment.temperature }],
      title: { offsetCenter: [0, '80%'], color: '#9bbbe0' },
    },
  ],
}))

// 热力图：展示一周内不同片区活跃强度
const heatmapOption = computed(() => ({
  tooltip: { position: 'top' },
  grid: { top: 30, left: 60, right: 60, bottom: 40 },
  xAxis: {
    type: 'category',
    data: dashboard.heatmap.xAxis,
    splitArea: { show: true },
    axisLabel: { color: '#b8d3ff', fontSize: 11, margin: 10 },
  },
  yAxis: {
    type: 'category',
    data: dashboard.heatmap.yAxis,
    splitArea: { show: true },
    axisLabel: { color: '#b8d3ff', fontSize: 11 },
  },
  visualMap: {
    min: 10,
    max: 40,
    orient: 'vertical',
    right: 6,
    top: 'middle',
    itemHeight: 100,
    itemWidth: 8,
    textStyle: { color: '#b8d3ff' },
    inRange: { color: ['#0e2955', '#1f4eff', '#00f2fe'] },
  },
  series: [
    {
      type: 'heatmap',
      data: dashboard.heatmap.values,
      label: { show: false },
      emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 242, 254, 0.45)' } },
    },
  ],
}))

// 中部地图采用散点布局模拟区域分布，满足点击联动要求
const mapOption = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: (params) => `${params.name}<br/>年产值：${params.value?.[2] ?? 0} 万元`,
  },
  grid: { top: 30, left: 20, right: 20, bottom: 20 },
  xAxis: { min: 0, max: 100, show: false, type: 'value' },
  yAxis: { min: 0, max: 100, show: false, type: 'value' },
  series: [
    {
      name: '乡镇节点',
      type: 'scatter',
      symbolSize: 20,
      itemStyle: {
        color: (params) => (params.data.name === selectedRegion.value ? '#00f2fe' : '#4e78ff'),
      },
      label: {
        show: true,
        formatter: '{b}',
        color: '#d9ecff',
        position: 'right',
      },
      data: dashboard.mapRegions.map((item) => ({
        name: item.name,
        value: [item.x, item.y, item.value],
      })),
    },
  ],
}))

watch(
  () => selectedRegion.value,
  (regionName) => {
    if (!regionName) return
    // 联动规则：选中片区抬升，其他片区轻微回落，模拟动态对比效果
    dashboard.villageDensity = dashboard.villageDensity.map((item) => ({
      ...item,
      density: item.region === regionName ? item.density + 30 : Math.max(item.density - 5, 120),
    }))
  },
)

onMounted(async () => {
  // 初始化全量大屏数据
  Object.assign(dashboard, await getDashboardData())
  selectedRegion.value = dashboard.villageDensity[0]?.region || ''
  isReady.value = true

  await nextTick()
  const chartInstance = mapChartRef.value?.getInstance()
  if (!chartInstance) return

  chartInstance.on('click', (params) => {
    // 点击地图节点后触发柱状图联动
    selectedRegion.value = params.name
  })
})
</script>

<style scoped>
.home-loading {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
}

.home-screen {
  display: grid;
  grid-template-columns: 1fr 1.15fr 1fr;
  gap: 14px;
  height: 100%;
  min-height: 0;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 0;
}

.center-column {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 0;
}

.chart-card {
  flex: 1;
  min-height: 0;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--panel-bg);
  box-shadow: var(--panel-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.chart-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.35);
}

.chart-card h3 {
  margin: 0 0 8px;
  color: var(--text-primary);
  font-size: 15px;
  font-weight: 600;
}

.map-card {
  flex: 1;
  min-height: 0;
}
</style>
