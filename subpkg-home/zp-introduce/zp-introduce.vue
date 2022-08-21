<template>
    <view class="introduce-box">
        <!-- 卡片区域 -->
        <introduce-card></introduce-card>
        <!-- 介绍与目录区域 -->
        <view class="introduce-container">
          <top-taskbar 
            :radiusLeft="0" 
            :radiusRight="1" 
            @clickBar="clickBar" 
            :topStyle="topActive"
          ></top-taskbar>
          
            <view class="introduce-body">
              <swiper 
                class="introduce-swiper" 
                :current="moduleCurrent" 
                @change="changeTopStyle"
                :duration="duration"
              >
                <swiper-item class="swiper-item">
                  <!-- 介绍区域 -->
                  <view class="introduce-text">
                    <text>
                    兼职诈骗是十大诈骗类型之一。 网上兼职诈骗，也被称为刷信誉诈骗，大多是以简单的任务，高额的佣金兼职诈骗是十大诈骗类型之一。高额的佣金兼职诈骗是十大诈骗类型之一兼职诈骗是十大诈骗类型之一。 网上兼职诈骗，也被称为刷信
                    </text>
                  </view>
                  <!-- 介绍区域 -->
                </swiper-item> 
                <swiper-item class="swiper-item">  
                  <!-- 目录区域 -->
                  <view class="introduce-catalog">
                    <view class="catalog-list">
                      <view 
                        class="catalog-item" 
                        v-for="(item,i) in 4" 
                        :key="i"
                        @click="navClickHandler"
                      >
                        <text>受害人群</text>
                        <uni-icons type="forward" size="18"></uni-icons>
                      </view>
                    </view>
                  </view>
                  <!-- 目录区域 -->
                </swiper-item>
              </swiper>
            </view>
        </view>
    </view>
</template>

<script>
  import {reactive} from 'vue'
  import {moduleSwiper,clickBar, changeTopStyle,topStyle} from '/hooks/topTaskBar.js'
  import {toRefs} from 'vue'
  export default {
    setup() {
      // 一、 轮播图相关数据与方法
      const swiper = reactive({
            duration:500
      })
      
      // 二. 定义跳转到诈骗详细介绍页面的方法
      function navClickHandler() {
          uni.navigateTo({
            url:"/subpkg-home/zp-intro-detail/zp-intro-detail"
          })
      }
      
      return {
        // 轮播图相关数据与方法
        ...toRefs(swiper),
        // 诈骗详细介绍页面的方法
        navClickHandler,
        // 模块切换相关
        ...toRefs(moduleSwiper),
        ...toRefs(topStyle),
        clickBar,
        changeTopStyle
      }
    },
    onReady() {
      this.moduleCurrent = 0;
      this.duration = 0;
      setTimeout(() => {
        this.duration = 500;
      },0)
    },

  }
</script>

<style lang="less">
  html,body,page {
    height: 100vh;
  }
  // 主体区域
  .introduce-box {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 22rpx 30rpx 0 30rpx;
    background: rgba(217,217,217,0.6);
  }
  
  .introduce-container {
    display: flex;
    flex-direction: column;
    margin-top: 20rpx;
    flex: 1;
    border-radius: 20rpx 20rpx 0 0;
    background: #FFFFFF;
    
    .introduce-body,.introduce-swiper,.swiper-item {
      height: 100%;
    }
  }
  
  // 介绍区域
  .introduce-text {
    padding: 20rpx;
    
    text {
      font-size: 13px;
      line-height: 1.6;
    }
  }
  
  // 目录区域
  .introduce-catalog {
    padding-top: 2rpx;
    .catalog-list {
      padding: 0 10rpx;
      .catalog-item {
        display: flex;
        justify-content: space-between;
        padding: 0 20rpx;
        border-bottom: 1px solid  rgba(0,0,0,0.1);
        text {
          font-size: 14px;
          padding: 22rpx 0;
        }
      }
    }
  }
</style>
