<template>
  <div class="flipper">
    <span class="label">{{ label }}</span>
    <span class="value">{{ displayValue.toLocaleString() }}</span>
    <span class="unit">{{ unit }}</span>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  label: { type: String, default: '乡村年总产值' },
  value: { type: Number, default: 0 },
  unit: { type: String, default: '万元' },
})

const displayValue = ref(0)
let timer = null

function animateValue(target) {
  clearInterval(timer)
  const start = displayValue.value
  const duration = 1200
  const frame = 30
  let elapsed = 0

  timer = setInterval(() => {
    elapsed += frame
    const progress = Math.min(elapsed / duration, 1)
    displayValue.value = Math.floor(start + (target - start) * progress)
    if (progress >= 1) {
      clearInterval(timer)
      timer = null
    }
  }, frame)
}

watch(
  () => props.value,
  (val) => animateValue(val),
  { immediate: true },
)

onMounted(() => animateValue(props.value))
onBeforeUnmount(() => clearInterval(timer))
</script>

<style scoped>
.flipper {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid rgba(0, 242, 254, 0.35);
  border-radius: 10px;
  background: linear-gradient(90deg, rgba(0, 242, 254, 0.16), rgba(77, 119, 255, 0.06));
}

.label {
  color: var(--text-secondary);
}

.value {
  color: var(--color-primary);
  font-weight: 700;
  font-size: 26px;
  letter-spacing: 1px;
}

.unit {
  color: var(--text-primary);
}
</style>
