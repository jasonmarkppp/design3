<template>
  <section class="panel-grid">
    <article class="card">
      <h3>治理执行率（仪表盘）</h3>
      <ECharts :option="gaugeOption" height="300px" />
    </article>
    <article class="card">
      <h3>治理执行率（柱状图）</h3>
      <ECharts :option="barOption" height="300px" />
    </article>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue'
import ECharts from '../../components/ECharts.vue'
import { getDashboardData } from '../../api/dataService'

const dashboard = reactive({ ecologyGovernance: [] })

const averageRate = computed(() => {
  if (dashboard.ecologyGovernance.length === 0) return 0
  const total = dashboard.ecologyGovernance.reduce((sum, item) => sum + item.value, 0)
  return Math.round(total / dashboard.ecologyGovernance.length)
})

const gaugeOption = computed(() => ({
  tooltip: { trigger: 'item' },
  series: [
    {
      type: 'gauge',
      min: 0,
      max: 100,
      radius: '86%',
      detail: { formatter: '{value}%', color: '#e9f4ff', fontSize: 22 },
      data: [{ value: averageRate.value, name: '平均执行率' }],
      axisLine: { lineStyle: { color: [[0.5, '#1f4eff'], [0.8, '#00c6ff'], [1, '#00f2fe']], width: 12 } },
    },
  ],
}))

const barOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  grid: { top: 30, left: 44, right: 20, bottom: 30 },
  xAxis: {
    type: 'category',
    data: dashboard.ecologyGovernance.map((item) => item.name),
    axisLabel: { color: '#b8d3ff', interval: 0, rotate: 12 },
  },
  yAxis: { type: 'value', axisLabel: { color: '#b8d3ff' }, max: 100 },
  series: [
    {
      type: 'bar',
      data: dashboard.ecologyGovernance.map((item) => item.value),
      itemStyle: { color: '#00f2fe', borderRadius: [8, 8, 0, 0] },
    },
  ],
}))

onMounted(async () => {
  Object.assign(dashboard, await getDashboardData())
})
</script>

<style scoped>
.panel-grid {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  min-height: 0;
}

.card {
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--panel-bg);
}

.card h3 {
  margin: 0 0 8px;
}
</style>
