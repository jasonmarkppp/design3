<template>
  <section class="panel-grid">
    <article class="card">
      <h3>各片区产业产值（堆叠柱）</h3>
      <ECharts :option="stackBarOption" height="300px" />
    </article>
    <article class="card">
      <h3>产业结构占比</h3>
      <ECharts :option="pieOption" height="300px" />
    </article>
    <article class="card full">
      <h3>重点项目推进（点击高亮）</h3>
      <ul class="project-list">
        <li
          v-for="item in dashboard.industryProjects"
          :key="item.name"
          :class="{ active: activeProject === item.name }"
          @click="activeProject = item.name"
        >
          <span>{{ item.name }}</span>
          <span>{{ item.progress }}%</span>
          <span>{{ item.investment }} 万元</span>
        </li>
      </ul>
    </article>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import ECharts from '../../components/ECharts.vue'
import { getDashboardData } from '../../api/dataService'

const dashboard = reactive({
  industryOutputByTown: [],
  industryShare: [],
  industryProjects: [],
})
const activeProject = ref('')

const stackBarOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  legend: { textStyle: { color: '#b8d3ff' } },
  grid: { top: 36, left: 44, right: 20, bottom: 30 },
  xAxis: {
    type: 'category',
    data: dashboard.industryOutputByTown.map((item) => item.town),
    axisLabel: { color: '#b8d3ff' },
  },
  yAxis: { type: 'value', axisLabel: { color: '#b8d3ff' } },
  series: [
    { name: '种植', type: 'bar', stack: 'total', data: dashboard.industryOutputByTown.map((i) => i.planting) },
    { name: '畜牧', type: 'bar', stack: 'total', data: dashboard.industryOutputByTown.map((i) => i.animal) },
    { name: '文旅', type: 'bar', stack: 'total', data: dashboard.industryOutputByTown.map((i) => i.tourism) },
  ],
  color: ['#00f2fe', '#3ea6ff', '#4e78ff'],
}))

const pieOption = computed(() => ({
  tooltip: { trigger: 'item' },
  series: [
    {
      type: 'pie',
      radius: ['34%', '66%'],
      data: dashboard.industryShare,
      label: { color: '#d6e9ff' },
    },
  ],
  color: ['#00f2fe', '#3ea6ff', '#4e78ff', '#2ee6a0', '#8dc8ff'],
}))

onMounted(async () => {
  Object.assign(dashboard, await getDashboardData())
  activeProject.value = dashboard.industryProjects[0]?.name || ''
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

.full {
  grid-column: 1 / 3;
}

.project-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.project-list li {
  display: grid;
  grid-template-columns: 1fr 80px 100px;
  gap: 12px;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
}

.project-list li.active {
  border-color: var(--color-primary);
  background: rgba(0, 242, 254, 0.12);
}
</style>
