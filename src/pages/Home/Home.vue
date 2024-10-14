<template>
  <div class="home-page">
    <div id="mind-canvas"></div>
  </div>
</template>
<script setup lang="ts" name="">
import { AwesomeMind } from '@/awesome-mind'

onMounted(() => init())

const init = () => {
  new AwesomeMind({
    container: document.getElementById('mind-canvas') as HTMLDivElement,
    width: window.innerWidth,
    height: window.innerHeight
  })
}
</script>
<style lang="scss" scoped>
.home-page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  #mind-canvas {
    width: 100vw;
    height: 100vh;
  }
}
</style>
@/awesome-mind
