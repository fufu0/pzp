<template>
  <view>
    <view class="introduce-card">
      <view class="introduce-body">
        <view class="introduce-img">
          <image src="https://pic.imgdb.cn/item/62fa295016f2c2beb1e13839.jpg" mode="aspectFill"></image>
        </view>
        <view class="introduce-text">
          <view class="introduce-title">
            兼职诈骗
          </view>
          <text class="introduce-main">
            兼职诈骗是十大诈骗类型之一。 网上兼职诈骗，也被称为刷信誉诈骗，大多是以简单的任务，高额的佣金兼职诈骗是十大诈骗类型之一。高额的佣金兼职诈骗是十大诈骗类型之一
          </text>
        </view>
      </view>
      <view class="introduce-foot">
        <text>诈骗小百科</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"introduce-card",
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="less">
  .introduce-card {
    box-sizing: border-box;
    padding: 40rpx 25rpx 14rpx 25rpx;
    height: 324rpx;
    background: #FFFFFF;
    border-radius: 20rpx;
    
    .introduce-body {
      display: flex;
      height: 216rpx;
      
      .introduce-img {
        image {
          display: block;
          width: 226rpx;
          height: 216rpx;
          margin-right: 15rpx;
        }
      }
      .introduce-text {
        // 小程序端有问题
        padding: 0;
        .introduce-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 5rpx;
        }
        .introduce-main {
          display:-webkit-box;
          font-size: 12px;
          line-height: 1.7;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient:vertical; 
          -webkit-line-clamp:4; 
        }
      }
    }
    .introduce-foot {
      margin-top: 20rpx;
      font-size: 12px;
      color: #707070;
    }
  }
</style>