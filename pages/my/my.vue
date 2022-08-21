<template>
  <view>
    <!-- 用户资料区域 -->
    <view class="user-area">
      <view class="user-bgc"></view>
      <view class="user-container">
        <view class="user-data">
          <view class="user-avatar">
            <cloud-image width="160rpx" height="160rpx" v-if="userInfo.avatar_file&&userInfo.avatar_file.url" :src="userInfo.avatar_file.url"></cloud-image>
            <image v-else src="/static/my-tab/qq-avatar.jpg"></image>
          </view>
          <view class="user-name-arae">
            <view class="name">
              <text v-if="hasLogin">{{userInfo.nickname||userInfo.username||userInfo.mobile}}></text>
              <text v-else class="uer-name">未登录。。</text>
            </view>
            <view class="arae">
              <text>ip属地：浙江</text>
            </view>
          </view>
        </view>
        <view class="user-edit" @click.capture="toUserInfo">
          <text>编辑</text>
        </view>
      </view>
    </view>
  
    <!-- 功能列表区域 -->
    <view class="func-area">
      <view class="func-list">
        <view class="func-item collect">
          <image src="/static/my-tab/collect.png" mode=""></image>
          <text>收藏</text>
        </view>
        <view class="func-item footprint">
          <image src="/static/my-tab/footprint.png"></image>
          <text>足迹</text>
        </view>
        <view class="func-item result">
          <image src="/static/my-tab/result.png"></image>
          <text>结果</text>
        </view>
        <view class="func-item note">
          <image src="/static/my-tab/note.png"></image>
          <text>笔记</text>
        </view>
      </view>
    </view>
  
    <!-- 设置区域 -->
    <view class="set-area">
      <view class="set-list">
        <navigator
          class="set-item"
          v-for="(item,index) in ucenterList" 
          :key="index"
          :url="item.to" 
          @click="ucenterListClick(item)"
        >
          <text>{{item.title}}</text>
          <uni-icons type="forward" size="18"></uni-icons>
        </navigator> 
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    },
    methods: {
      
    }
  }
</script>

<style lang="less">
    // 用户资料区域
    .user-area {
      .user-bgc {
        width: 100%;
        height: 284rpx;
        background: rgba(147,200,249,0.8000);
        border-radius: 0px 0px 30px 30px;
      }
      .user-container {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 0 50rpx;
        height: 160rpx;
        transform: translateY(-18%);
        
        .user-data {
          display: flex;
          align-items: center;
          .user-avatar {
            image,cloud-image {
              margin-right: 20rpx;
              width: 160rpx;
              height: 160rpx;
              border-radius: 50%;
              transform: translateY(-20%);
            }
          }
          .user-name-arae {
            .name{
              font-size: 18px;
              font-weight: bold;
               text {
                  display: inline-block;
                  max-width: 300rpx;
                 // 文字不允许换行（单行文本）
                 white-space: nowrap;
                 // 溢出部分隐藏
                 overflow: hidden;
                 // 文本溢出后，使用 ... 代替
                 text-overflow: ellipsis;
               }
            }
            .arae{
              margin-top: 5rpx;
              font-size: 10px;
              color: rgba(0,0,0,0.6000);
            }
          }
        }
        .user-edit {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 108rpx;
          height: 52rpx;
          background: #F1F1F1;
          border-radius: 74rpx;
          border: 1px solid rgba(0,0,0,0.3000);
          text {
            font-size: 12px;
            color: rgba(0,0,0,0.7);
          }
        }
      }
    }
    
    // 功能列表区域
    .func-area {
      
      .func-list {
        display: flex;
        justify-content: space-around;
        padding: 0 20rpx;
        .func-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 140rpx;
          height: 152rpx;
          border-radius: 56rpx;
          background-color: #F1F1F1;
          
          &.collect {
            background: radial-gradient(97.86% 83.02% at 10% 14.47%, rgba(255, 39, 39, 0.8) 0%, rgba(255, 111, 49, 0.8) 37.5%, rgba(255, 201, 120, 0.8) 100%);
            
            image {
              width: 80rpx;
              height: 80rpx;
            }
          }
          &.footprint {
            background: radial-gradient(132.24% 132.24% at 62.14% 119.08%, rgba(35, 192, 22, 0.8) 0%, rgba(74, 220, 71, 0.8) 42.71%, rgba(90, 231, 240, 0.8) 100%);
            
            image {
              width: 70rpx;
              height: 70rpx;
            }
            text {
              transform: translateY(25%);
            }
          }
          &.result {
            background: radial-gradient(137.14% 116.34% at -25% 55.92%, rgba(29, 77, 249, 0.7) 0%, rgba(119, 107, 255, 0.7) 37.5%, rgba(255, 244, 147, 0.7) 100%);
            
            image {
              width: 95rpx;
              height: 95rpx;
            }
            text {
              transform: translateY(-10%);
            }
          }
          &.note {
            background: radial-gradient(100.66% 100.66% at 120.71% 108.55%, rgba(214, 126, 255, 0.8) 0%, rgba(162, 130, 255, 0.8) 37.5%, rgba(142, 228, 255, 0.8) 100%);
            image {
              width: 75rpx;
              height: 75rpx;
              transform: translateY(8%);
            }
            text {
              transform: translateY(28%);
            }
          }

          text {
            font-size: 10px;
            font-weight: bold;
            color: #FFFFFF;
          }
        }
      }
    }
    
    // 设置区域
    .set-area {
      margin-top: 50rpx;
      padding: 0 40rpx;
      .set-list {
        border-top: 1px solid rgba(0,0,0,0.1000);
        padding: 0 20rpx;
        .set-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18rpx 0;
          text {
            font-size: 14px;
          }
          uni-icons {}
        }
      }
    }
</style>
