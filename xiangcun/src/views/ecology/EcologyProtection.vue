<template>
  <section class="panel-grid">
    <article class="card">
      <h3>水质/绿化率趋势</h3>
      <ECharts :option="trendOption" height="300px" />
    </article>
    <article class="card">
      <h3>生态风险预警</h3>
      <ul class="alert-list">
        <li v-for="item in dashboard.ecologyAlerts" :key="item.point" :class="item.level === '中' ? 'warn' : 'safe'">
          <span>{{ item.point }}</span>
          <span>风险: {{ item.level }}</span>
          <span>{{ item.status }}</span>
        </li>
      </ul>
    </article>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue'
import ECharts from '../../components/ECharts.vue'
import { getDashboardData } from '../../api/dataService'

const dashboard = reactive({ ecologyTrend: [], ecologyAlerts: [] })

const trendOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  legend: { textStyle: { color: '#b8d3ff' } },
  grid: { top: 36, left: 44, right: 20, bottom: 30 },
  xAxis: { type: 'category', data: dashboard.ecologyTrend.map((i) => i.month), axisLabel: { color: '#b8d3ff' } },
  yAxis: { type: 'value', axisLabel: { color: '#b8d3ff' } },
  series: [
    { name: '水质指数', type: 'line', smooth: true, data: dashboard.ecologyTrend.map((i) => i.waterQuality) },
    { name: '绿化率', type: 'line', smooth: true, data: dashboard.ecologyTrend.map((i) => i.greenRate) },
  ],
  color: ['#00f2fe', '#2ee6a0'],
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

.alert-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.alert-list li {
  display: grid;
  grid-template-columns: 1fr 90px 100px;
  gap: 10px;
  margin-bottom: 8px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.alert-list li.warn {
  border-color: rgba(255, 196, 0, 0.45);
  background: rgba(255, 196, 0, 0.08);
}

.alert-list li.safe {
  border-color: rgba(46, 230, 160, 0.45);
  background: rgba(46, 230, 160, 0.08);
}
</style>
