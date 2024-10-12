<template>
  <div
    class="canvas-page"
    @mousedown="startDrag"
    @mousemove="drag"
    @mouseup="endDrag"
    @mouseleave="endDrag"
    @touchstart="startTouch"
    @touchmove="moveTouch"
    @touchend="endTouch"
  >
    <div ref="canvasContainer" class="canvas-container">
      <svg ref="svg" class="canvas"></svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as d3 from 'd3'

// 定义状态
const svg = ref<SVGSVGElement | null>(null)
const canvasContainer = ref<HTMLDivElement | null>(null)

let isDragging = false // 是否正在拖动
let startX: number | null = null
let startY: number | null = null
let currentTranslateX = 0 // 当前平移X值
let currentTranslateY = 0 // 当前平移Y值
const spacing = 32 // 圆点间隔

// 绘制背景
const drawBackground = () => {
  const width = canvasContainer.value!.clientWidth
  const height = canvasContainer.value!.clientHeight

  // 清空现有圆点
  d3.select(svg.value).selectAll('*').remove()

  // 动态绘制背景圆点
  for (let x = -currentTranslateX % spacing; x < width; x += spacing) {
    for (let y = -currentTranslateY % spacing; y < height; y += spacing) {
      d3.select(svg.value)
        .append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 1) // 圆点半径
        .style('fill', '#d2d2d2') // 圆点颜色
    }
  }
}

// 鼠标拖动
const startDrag = (event: MouseEvent) => {
  isDragging = true
  startX = event.clientX
  startY = event.clientY
}

const drag = (event: MouseEvent) => {
  if (!isDragging || startX === null || startY === null) return

  const currentX = event.clientX
  const currentY = event.clientY

  // 计算移动距离
  const dx = currentX - startX
  const dy = currentY - startY

  // 更新画布位置
  updateCanvasPosition(dx, dy)

  // 更新起始拖动点
  startX = currentX
  startY = currentY

  // 更新背景
  drawBackground()
}

const endDrag = () => {
  isDragging = false // 停止拖动
  startX = null
  startY = null
}

// 触摸拖动
const startTouch = (event: TouchEvent) => {
  if (event.touches.length === 1) {
    // 确保是单指触摸
    isDragging = true
    startX = event.touches[0].clientX
    startY = event.touches[0].clientY
  }
}

const moveTouch = (event: TouchEvent) => {
  if (!isDragging || startX === null || startY === null) return

  const currentX = event.touches[0].clientX
  const currentY = event.touches[0].clientY

  // 计算移动距离
  const dx = currentX - startX
  const dy = currentY - startY

  // 更新画布位置
  updateCanvasPosition(dx, dy)

  // 更新起始拖动点
  startX = currentX
  startY = currentY

  // 更新背景
  drawBackground()
}

const endTouch = () => {
  isDragging = false // 停止拖动
  startX = null
  startY = null
}

// 更新画布位置的通用方法
const updateCanvasPosition = (dx: number, dy: number) => {
  currentTranslateX += dx
  currentTranslateY += dy

  d3.select(svg.value).attr('transform', `translate(${currentTranslateX}, ${currentTranslateY})`)
}

const resizeCanvas = () => {
  drawBackground() // 调整画布大小时重新绘制背景
}

onMounted(() => {
  drawBackground() // 初始化背景
  window.addEventListener('resize', resizeCanvas)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped lang="scss">
.canvas-page {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .canvas-container {
    position: relative;
    flex-grow: 1;
    overflow: hidden; /* 隐藏超出边界的部分 */
    .canvas {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1; /* 确保SVG在最上层 */
    }
  }
}
</style>
