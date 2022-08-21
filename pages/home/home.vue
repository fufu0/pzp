<template>
    <!-- 顶部任务栏 -->
    <view class="taskbar-box">
      <top-taskbar @clickBar="clickBar" :topStyle="topActive"></top-taskbar>
    </view>
    <!-- home -->
    <view class="home-body">
      <swiper 
        class="home-swiper" 
        :current="moduleCurrent" 
        @change="changeTopStyle"
        :duration="duration"
      >
      			<swiper-item class="swiper-item">
                <!-- 官方公告模块 -->
                <view class="first-module">
                  <!-- 轮播图区域 -->
              <unicloud-db ref="bannerdb" v-slot:default="{data, loading, error, options}" collection="opendb-banner"
                field="_id,bannerfile,open_url,title">
                <!-- 当无banner数据时显示占位图 -->
                <image v-if="!(loading||data.length)" class="banner-image" src="/static/grid/empty.png" mode="aspectFill" :draggable="false" />
                  <uni-swiper-dot 
                    :info="data" 
                    :current="current" 
                    field="content" 
                    :mode="mode" 
                    @clickItem="clickItem" 
                    :dots-styles="dotStyle
                  ">
                    <view class="swiperOut">
                      <swiper
                        class="swiper" 
                        circular 
                        autoplay 
                        :interval="3000"
                        :duration="500"
                        @change="change"
                        :current="swiperDotIndex"
                      >
                      				<swiper-item v-for="(item, index) in data" :key="item._id">
                      					<navigator class="swiper-item"  hover-class="none">
                                  <image :src="item.bannerfile.url" mode="aspectFill" alt=""/>
                                </navigator>
                      				</swiper-item>
                      </swiper>
                    </view>
                  </uni-swiper-dot>
                </unicloud-db>
                  <!-- 轮播图区域 -->
                  <!-- 官方公告区域 -->
                  <view class="notice-container">
                    <view class="notice">
                      <view class="notice-title">
                          <view class="title">
                            <text>官方动态</text>
                          </view>
                      </view>
                      <!-- 公告主体区域  -->
                     <unicloud-db v-slot:default="{data, loading, error, options}" collection="opendb-news-articles">
                       <view v-if="error">{{error.message}}</view>
                       <view v-else>
                         <view class="body-list">
                           <offical-notice :data="data" @clickNot="navigateToDetail"></offical-notice>
                         </view>
                       </view>
                     </unicloud-db>
                    </view>
                  </view>
                  <!-- 官方公告区域 -->
                </view>
                <!-- 官方公告模块 -->
      			</swiper-item>   
            <swiper-item>
              <!-- 骗局曝光模块 -->
              <view class="second-module">
                <view class="zp-kind">
                  <unicloud-db v-slot:default="{data, loading, error, options}" collection="zp-inteoduce">
                    <view v-if="error">{{error.message}}</view>
                    <view v-else>
                      <view class="zpkind-list">
                        <view 
                          class="zpkind-item" 
                          v-for="(item, i) in data"
                          :key="i" 
                          @click="navClickHandler"
                        >
                          <view class="item-container">
                            <view class="name">
                              <text>{{item.id}}. {{item.name}}</text>
                            </view>
                            <view class="point">
                              <uni-icons type="forward" size="32" color="#8EB9FF"></uni-icons>
                            </view>
                          </view>
                        </view>
                      </view>
                    </view>
                  </unicloud-db>
                </view>
              </view>
              <!-- 骗局曝光模块 -->
            </swiper-item>
      </swiper>
    </view>
    
</template>

<script>
  import { getCurrentInstance,reactive,ref,computed,toRefs,onBeforeMount } from 'vue'
  import {moduleSwiper,clickBar, changeTopStyle,topStyle} from '/hooks/topTaskBar.js'
  export default {
    setup() {
      // 一、 轮播图相关数据与方法
      const swiper = reactive({
            current: 0,
        		mode: 'round',
            swiperDotIndex: 0,
            dotStyle: {
              
            },
            duration:0
      })
      // 改变轮播图动画间隔
      // onBeforeMount(() => {
      //   swiper.duration = 500;
      // })
      function change(e) {
        	swiper.current = e.detail.current;
      }
      function clickItem(e) {
        // 自定义指示点点击切换swiper好像跟autoplay有冲突
        console.log(e);
        swiper.swiperDotIndex = e
      }
      
      // 二. 定义跳转到诈骗介绍页面的方法
      function navClickHandler() {
          uni.navigateTo({
            url:"/subpkg-home/zp-introduce/zp-introduce?index=0"
          })
      }
      
      // 三、定义跳转到公告详细页面的方法
      function navigateToDetail(id,title) {
        console.log(1);
        uni.navigateTo({
          url:`/pages/list/detail?id=${id}&title=${title}`
        })
      }
      
      return {
        // 轮播图相关数据与方法
        ...toRefs(swiper),
        change,
        clickItem,
        // 模块切换相关数据与方法
        ...toRefs(moduleSwiper),
        ...toRefs(topStyle),
        clickBar,
        changeTopStyle,
        // 定义跳转到诈骗介绍页面的方法
        navClickHandler,
        // 定义跳转到公告详细页面的方法
        navigateToDetail
      }
    },
    onShow() {
      this.moduleCurrent = 0;
      this.duration = 0;
      setTimeout(() => {
        this.duration = 500;
      },0)
    }
  }
</script>

<style lang="less">
  html,body,page,.home-body,.home-swiper {
    height: 100vh - 9;
    .swiper-item {
      overflow: auto;
    }
  }
  
  // 轮播图相关
  .swiperOut {
    display: flex;
    justify-content: space-around;
    
    .swiper {
      margin-top: 38rpx;
      width: 670rpx;
      // height: 440rpx;
      height: 440rpx;
      
      swiper-item {
        border-radius: 5%;
        
        .swiper-item,image {
          height: 100%;
          width: 100%;
          overflow: hidden;
        }
      }
    }
  }
  
  // 顶部任务栏相关
  .taskbar-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  
  // 公告区域相关  
  .notice-container {
    display: flex;
    justify-content: center;
    margin-top: 34rpx;
    margin-bottom: 30rpx;
    
    .notice{
      box-sizing: border-box;
      padding: 40rpx;
      width: 670rpx;
      min-height: 320rpx;
      background: #FFFFFF;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 3px 1px;
      border-radius: 24rpx;
      
      .notice-title{
        padding-bottom: 0rpx;
        font-size: 14px;
        font-weight: bold;
        
        .title {
          padding-bottom: 16rpx;
          border-bottom: 1px solid rgba(0,0,0,0.6900);
        }
      }
   
    }
  }

  .zp-kind {
    display: flex;
    justify-content: center;
    margin-top: 60rpx;
    .zpkind-list {
      .zpkind-item {
        margin-bottom: 30rpx;
        width: 670rpx;
        height: 108rpx;
        background: linear-gradient(270deg, #79AFFF -2.69%, rgba(255, 255, 255, 0) 90.9%);;
        box-shadow: 0px 6px 16px 1px rgba(0,0,0,0.1000);
        border-radius: 45px;
        
          .item-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            padding: 0 20rpx 0 40rpx;
            
            .name {
              font-size: 14px;
              font-weight: bold;
            }
            .point {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 72rpx;
              height: 72rpx;
              background: rgba(255,255,255,0.8000);
              box-shadow: inset 0px 7px 9px -2px rgba(0,0,0,0.2000);
              border-radius: 50%;
            }
          }
      }
    }
  }
</style>
