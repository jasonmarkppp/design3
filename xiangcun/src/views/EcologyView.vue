<template>
  <section class="sub-page">
    <h2>生态环境</h2>
    <p>实时监测温度、湿度与空气质量，追踪乡村绿色发展。</p>
    <div class="metrics">
      <div class="metric">温度：{{ env.temperature }}°C</div>
      <div class="metric">湿度：{{ env.humidity }}%</div>
      <div class="metric">PM2.5：{{ env.pm25 }}</div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getDashboardData } from '../api/dataService'

const env = ref({ temperature: 0, humidity: 0, pm25: 0 })

onMounted(async () => {
  const data = await getDashboardData()
  env.value = data.environment
})
</script>

<style scoped>
.sub-page {
  min-height: calc(100vh - 124px);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--panel-bg);
}

.metrics {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.metric {
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: rgba(0, 242, 254, 0.1);
  cursor: pointer;
}
</style>
