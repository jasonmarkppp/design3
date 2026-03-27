<template>
  <section class="panel-grid">
    <article class="card">
      <h3>PM2.5 趋势（近6月）</h3>
      <ECharts :option="pmLineOption" height="300px" />
    </article>
    <article class="card">
      <h3>实时温湿度</h3>
      <ECharts :option="gaugeOption" height="300px" />
    </article>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue'
import ECharts from '../../components/ECharts.vue'
import { getDashboardData } from '../../api/dataService'

const dashboard = reactive({
  ecologyTrend: [],
  environment: { temperature: 0, humidity: 0, pm25: 0 },
})

const pmLineOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  grid: { top: 30, left: 44, right: 20, bottom: 30 },
  xAxis: { type: 'category', data: dashboard.ecologyTrend.map((i) => i.month), axisLabel: { color: '#b8d3ff' } },
  yAxis: { type: 'value', axisLabel: { color: '#b8d3ff' } },
  series: [{ type: 'line', smooth: true, data: dashboard.ecologyTrend.map((i) => i.pm25), lineStyle: { color: '#00f2fe' } }],
}))

const gaugeOption = computed(() => ({
  tooltip: { trigger: 'item' },
  series: [
    {
      type: 'gauge',
      min: 0,
      max: 100,
      radius: '82%',
      detail: { formatter: '{value}°C', color: '#e9f4ff' },
      data: [{ value: dashboard.environment.temperature, name: '温度' }],
      axisLine: { lineStyle: { color: [[0.5, '#1f4eff'], [0.8, '#00c6ff'], [1, '#00f2fe']], width: 12 } },
    },
    {
      type: 'gauge',
      center: ['50%', '78%'],
      min: 0,
      max: 100,
      radius: '42%',
      detail: { formatter: '{value}%', color: '#a9c4e8', fontSize: 14 },
      data: [{ value: dashboard.environment.humidity, name: '湿度' }],
      axisLine: { lineStyle: { color: [[1, '#3ea6ff']], width: 8 } },
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
