<template>
  <section class="sub-page">
    <h2>产业分析</h2>
    <p>展示乡村产业结构、产量趋势及重点项目推进情况。</p>
    <ul>
      <li v-for="item in dashboard.heritageList" :key="item.name">
        {{ item.name }}（{{ item.category }}）- 传承人 {{ item.inheritors }} 人
      </li>
    </ul>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getDashboardData } from '../api/dataService'

const dashboard = ref({ heritageList: [] })

onMounted(async () => {
  dashboard.value = await getDashboardData()
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

h2 {
  margin: 0 0 8px;
}

p {
  color: var(--text-secondary);
}

ul {
  margin-top: 16px;
}

li {
  margin: 10px 0;
  cursor: pointer;
}
</style>
