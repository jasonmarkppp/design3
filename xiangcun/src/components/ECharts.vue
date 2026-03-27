<template>
  <div ref="chartRef" class="echart" :style="{ width, height }"></div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  option: {
    type: Object,
    required: true,
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '100%',
  },
})

const chartRef = ref(null)
let chartInstance = null

function renderChart() {
  if (!chartRef.value) return
  if (!chartInstance) {
    // 首次渲染时初始化实例，后续复用同一个实例提升性能
    chartInstance = echarts.init(chartRef.value)
  }
  // true 表示每次使用新配置覆盖旧配置，避免残留 series
  chartInstance.setOption(props.option, true)
}

function resizeChart() {
  if (chartInstance) {
    chartInstance.resize()
  }
}

defineExpose({
  getInstance: () => chartInstance,
})

watch(
  () => props.option,
  () => renderChart(),
  { deep: true },
)

onMounted(() => {
  renderChart()
  window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  if (chartInstance) {
    // 组件卸载时释放实例，防止内存泄漏
    chartInstance.dispose()
    chartInstance = null
  }
})
</script>

<style scoped>
.echart {
  height: 100%;
  min-height: 0;
}
</style>
