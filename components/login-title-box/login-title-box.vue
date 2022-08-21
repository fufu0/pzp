<template>
  <view>
    <view class="title-box">
      <view class="titlebox">
        <text class="title">{{text}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"login-title-box",
    props: {
      // 背景颜色
      text: {
        type: String,
        default: '登录'
      }
    },
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="less">
  .title-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .titlebox {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 172rpx;
      height: 90rpx;
      background: linear-gradient(170deg, #7DB9FF 17%, #D4E1F5 100%);
      border-radius: 60rpx 60rpx 60rpx 60rpx;
      
      text {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
</style>