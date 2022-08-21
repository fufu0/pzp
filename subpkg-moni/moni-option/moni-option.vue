<template>
  <view>
    <button type="primary" plain @click="navClickHandler">选项一</button>
  </view>
</template>

<script>
  export default {
    setup() {
      // 一. 定义跳转到情境对话的方法
      function navClickHandler() {
          uni.navigateTo({
            url:"/subpkg-moni/moni-chat/moni-chat"
          })
      }
      
      return {
        // 跳转到情境对话的方法
        navClickHandler
      }
    }
  }
</script>

<style lang="less">

</style>
