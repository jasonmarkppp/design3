<template>
  <section class="panel-grid">
    <article class="card">
      <h3>非遗项目分布</h3>
      <ECharts :option="heritagePieOption" height="300px" />
    </article>
    <article class="card">
      <h3>传承人数量排行榜</h3>
      <ECharts :option="heritageBarOption" height="300px" />
    </article>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue'
import ECharts from '../../components/ECharts.vue'
import { getDashboardData } from '../../api/dataService'

const dashboard = reactive({ heritageList: [] })

const heritagePieOption = computed(() => ({
  tooltip: { trigger: 'item' },
  series: [
    {
      type: 'pie',
      radius: ['34%', '64%'],
      data: dashboard.heritageList.map((item) => ({ name: item.category, value: item.inheritors })),
      label: { color: '#d6e9ff' },
    },
  ],
  color: ['#00f2fe', '#3ea6ff', '#4e78ff', '#2ee6a0'],
}))

const heritageBarOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  grid: { top: 30, left: 44, right: 20, bottom: 30 },
  xAxis: {
    type: 'category',
    data: dashboard.heritageList.map((item) => item.name),
    axisLabel: { color: '#b8d3ff', interval: 0, rotate: 12 },
  },
  yAxis: { type: 'value', axisLabel: { color: '#b8d3ff' } },
  series: [
    {
      type: 'bar',
      data: dashboard.heritageList.map((item) => item.inheritors),
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
