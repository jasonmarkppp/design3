<template>
  <section v-if="isReady" class="panel-grid">
    <article class="card">
      <h3>产业链环节完成度（雷达）</h3>
      <ECharts :option="radarOption" height="300px" />
    </article>
    <article class="card">
      <h3>环节完成度（横向柱状）</h3>
      <ECharts :option="barOption" height="300px" />
    </article>
  </section>
  <section v-else class="panel-loading">产业链数据加载中...</section>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import ECharts from '../../components/ECharts.vue'
import { getDashboardData } from '../../api/dataService'

const dashboard = reactive({ industryChainProgress: [] })
const isReady = ref(false)
const safeChain = computed(() => {
  if (dashboard.industryChainProgress.length > 0) return dashboard.industryChainProgress
  return [
    { name: '产前服务', value: 0 },
    { name: '规模种养', value: 0 },
    { name: '精深加工', value: 0 },
    { name: '冷链物流', value: 0 },
    { name: '电商销售', value: 0 },
    { name: '品牌运营', value: 0 },
  ]
})

const radarOption = computed(() => ({
  tooltip: { trigger: 'item' },
  radar: {
    indicator: safeChain.value.map((item) => ({ name: item.name, max: 100 })),
    axisName: { color: '#d6e9ff' },
  },
  series: [
    {
      type: 'radar',
      data: [{ value: safeChain.value.map((item) => item.value), name: '完成度' }],
      areaStyle: { color: 'rgba(0,242,254,0.18)' },
      lineStyle: { color: '#00f2fe' },
    },
  ],
}))

const barOption = computed(() => ({
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  grid: { top: 20, left: 90, right: 20, bottom: 30 },
  xAxis: { type: 'value', axisLabel: { color: '#b8d3ff' } },
  yAxis: {
    type: 'category',
    data: safeChain.value.map((item) => item.name),
    axisLabel: { color: '#b8d3ff' },
  },
  series: [
    {
      type: 'bar',
      data: safeChain.value.map((item) => item.value),
      itemStyle: { color: '#3ea6ff', borderRadius: [0, 8, 8, 0] },
    },
  ],
}))

onMounted(async () => {
  Object.assign(dashboard, await getDashboardData())
  isReady.value = true
})
</script>

<style scoped>
.panel-loading {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
}

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
