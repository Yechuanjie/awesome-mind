<template>
  <div class="home flex column middle center">
    <div class="content"> </div>
  </div>
</template>

<script setup lang="ts" name="">
import userStore from '@/store/userStore'

const store = userStore()
const { userInfo } = storeToRefs(store)

onMounted(() => {
  store.login().then(() => {
    console.info('userInfo.value.id', userInfo.value?.id)
  })
})
</script>

<style scoped lang="scss">
.home {
  min-height: 100vh;
  background-image: linear-gradient(to bottom, #e6e6e6, #b7f0f7);
  .content {
    width: 400px;
    text-align: center;
    h1 {
      color: $theme-color;
      font-size: 60px;
      font-weight: 700;
    }
  }
}
</style>
