<template>
  <section class="sub-layout">
    <header class="sub-header">
      <h2>生态环境中心</h2>
      <p>聚焦实时监测、保护成效与治理执行。</p>
    </header>

    <nav class="sub-tabs">
      <RouterLink to="/ecology/realtime">实时监测</RouterLink>
      <RouterLink to="/ecology/protection">生态保护</RouterLink>
      <RouterLink to="/ecology/governance">治理执行</RouterLink>
    </nav>

    <div class="sub-content">
      <RouterView />
    </div>
  </section>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.sub-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
}

.sub-header {
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--panel-bg);
}

.sub-header h2 {
  margin: 0;
}

.sub-header p {
  margin: 6px 0 0;
  color: var(--text-secondary);
}

.sub-tabs {
  display: flex;
  gap: 8px;
}

.sub-tabs a {
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  text-decoration: none;
  cursor: pointer;
}

.sub-tabs a.router-link-active {
  color: #001b3a;
  background: var(--color-primary);
}

.sub-content {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
</style>
