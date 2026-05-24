<template>
  <div class="chart-wrap" v-if="chartData.length">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Chart from 'chart.js/auto'
import type { ChartPoint, ViewMode } from '@/types/weather'

const props = defineProps({
  chartData: {
    type: Array as () => ChartPoint[],
    required: true,
    default: () => []
  },
  viewMode: {
    type: String as () => ViewMode,
    required: true,
    default: 'day'
  }
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

const renderChart = () => {
  if (!canvasRef.value || !props.chartData.length) {
    return
  }

  chartInstance?.destroy()

  chartInstance = new Chart(canvasRef.value, {
    type: 'line',
    data: {
      labels: props.chartData.map((point) => point.label),
      datasets: [
        {
          label: props.viewMode === 'day' ? 'Temperature (°C)' : 'Avg temperature (°C)',
          data: props.chartData.map((point) => point.temp),
          borderColor: '#4361ee',
          backgroundColor: 'rgba(67, 97, 238, 0.12)',
          pointBackgroundColor: '#4361ee',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointHoverBackgroundColor: '#f72585',
          pointHoverBorderColor: '#fff',
          fill: true,
          tension: 0.35,
          pointRadius: 5,
          pointHoverRadius: 7
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 600,
        easing: 'easeOutQuart'
      },
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#5c6370',
            font: { family: 'Outfit', size: 11 }
          }
        },
        y: {
          beginAtZero: false,
          grid: {
            color: 'rgba(67, 97, 238, 0.08)'
          },
          ticks: {
            color: '#5c6370',
            font: { family: 'Outfit', size: 11 }
          }
        }
      }
    }
  })
}

watch(
  () => [props.chartData, props.viewMode],
  () => renderChart(),
  { deep: true }
)

onMounted(() => renderChart())

onBeforeUnmount(() => {
  chartInstance?.destroy()
})
</script>

<style scoped>
.chart-wrap {
  width: 100%;
  height: 220px;
  margin-top: 12px;
  padding: 12px 8px 4px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.8);
}
</style>
