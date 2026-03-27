<template>
  <div class="app-shell">
    <header class="top-header">
      <svg class="decor left" viewBox="0 0 120 30" aria-hidden="true">
        <path d="M5 15 Q25 2 45 15 T85 15 T115 15" />
      </svg>
      <h1>乡村振兴数据可视化大屏</h1>
      <svg class="decor right" viewBox="0 0 120 30" aria-hidden="true">
        <path d="M5 15 Q25 28 45 15 T85 15 T115 15" />
      </svg>
    </header>

    <nav class="nav">
      <RouterLink to="/">首页</RouterLink>
      <RouterLink to="/industry">产业分析</RouterLink>
      <RouterLink to="/ecology">生态环境</RouterLink>
    </nav>

    <main class="page-body">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
      <div v-if="loading" class="loading-mask">
        <div class="loader"></div>
        <span>加载中...</span>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'

const loading = ref(false)
const router = useRouter()

router.beforeEach((to, from) => {
  if (to.path !== from.path) loading.value = true
  return true
})

router.afterEach(() => {
  setTimeout(() => {
    loading.value = false
  }, 300)
})
</script>

<style scoped>
.app-shell {
  height: 100vh;
  padding: 10px 16px 16px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.top-header {
  height: 58px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: linear-gradient(90deg, rgba(0, 242, 254, 0.16), rgba(78, 120, 255, 0.08));
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.top-header h1 {
  margin: 0;
  font-size: 24px;
  letter-spacing: 2px;
}

.decor {
  width: 120px;
  height: 30px;
}

.decor path {
  fill: none;
  stroke: var(--color-primary);
  stroke-width: 2;
}

.nav {
  margin: 10px 0;
  padding: 8px 14px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  display: flex;
  gap: 10px;
  background: rgba(8, 28, 58, 0.7);
}

.nav a {
  color: var(--text-secondary);
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 8px;
  transition: all 0.25s;
  cursor: pointer;
}

.nav a.router-link-active {
  color: #001b3a;
  background: var(--color-primary);
}

.page-body {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.loading-mask {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  background: rgba(5, 25, 50, 0.6);
  backdrop-filter: blur(1px);
}

.loader {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 3px solid rgba(0, 242, 254, 0.35);
  border-top-color: var(--color-primary);
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
