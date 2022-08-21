<template>
  <view class="intro-detail-body">
    <view class="intro-body">
      <view class="intro-title">
        <view class="img">
          <image src="https://pic.imgdb.cn/item/62fa295016f2c2beb1e13839.jpg" mode="aspectFill"></image>
          <text>
            兼职诈骗是十大诈骗类型之一。
兼职诈骗的受害人群往往以大学生为主兼职诈骗的受害人群往往以大学生为主兼职诈骗的受害人群往往
          </text>
        </view>
      </view>
      <view class="intro-part-list">
        <view class="intro-part" 
          v-for="(item,i) in 3"
          :key="i"
        >
          <view class="part-title">
            <view class="title">
              <text>受害人统计</text>
            </view>
          </view>
          <text>
            兼职诈骗是十大诈骗类型之一。
            截至2022年，兼职诈骗的受害者群体已经累计达到
          </text>
          <view class="img">
            <image src="https://pic.imgdb.cn/item/62fa295016f2c2beb1e13839.jpg" mode="aspectFill"></image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="less">
  html,body,page {
    height: 100vh;
  }
  // 主体区域
  .intro-detail-body {
    padding: 24rpx 30rpx 30rpx 30rpx;
  }
  
  // 介绍内容区域
  .intro-body {
    padding: 36rpx 40rpx 40rpx 50rpx;
    min-height: 1500rpx;
    background: #FFFFFF;
    box-shadow: 0px 4px 15px 0px rgba(0,0,0,0.2000);
    border-radius: 20rpx;
    
    .intro-title {
      margin-bottom: 8rpx;
      .img {
        image {
          display: block;
          margin-bottom: 36rpx;
          width: 600rpx;
          height: 246rpx;
          border-radius: 20rpx;
        }
        text {
          font-size: 12px;
        }
      }
    }
    .intro-part-list {
      .intro-part {
        margin-bottom: 15rpx;
        .part-title {
          display: flex;
          justify-content: center;
          padding: 34rpx 0;
          
          .title {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 190rpx;
            height: 50rpx;
            background: linear-gradient(180deg, #7BB8FF -52%, #FFFFFF 100%);
            border-radius: 4rpx;
            
            text {
              font-size: 12px;
              color: #0B4990;
            }
          }
        }
        text{
          font-size: 12px;
        }
        .img {
          display: flex;
          justify-content: center;
          image {
            margin-top: 36rpx;
            width: 418rpx;
            height: 296rpx;
            border-radius: 20rpx;
          }
        }
      }
    }
  }
  
</style>
