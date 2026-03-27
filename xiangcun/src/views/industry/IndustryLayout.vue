<template>
  <section class="sub-layout">
    <header class="sub-header">
      <h2>产业分析中心</h2>
      <p>围绕产值、产业链和非遗产业化，提供多维分析。</p>
    </header>

    <nav class="sub-tabs">
      <RouterLink to="/industry/overview">产业总览</RouterLink>
      <RouterLink to="/industry/chain">产业链进度</RouterLink>
      <RouterLink to="/industry/heritage">非遗产业化</RouterLink>
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
