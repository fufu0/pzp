<template>
  <view class="moni-body">
    <view class="circle-list">
      <view class="cirle circle-one"></view>
      <view class="cirle circle-two"></view>
      <view class="cirle circle-three"></view>
      <view class="cirle circle-four"></view>
      <view class="cirle circle-five"></view>
      <view class="cirle circle-six"></view>
    </view>
    
    <!-- 模拟展示区域 -->
    <view class="moni-show-area">
      <view class="moni-show">
        <text>随 机 模 拟</text>
      </view>
    </view>
    
    <!-- 模拟列表区 -->
    <view class="moni-func-area">
      <view class="moni-search">
       <uni-icons type="search" size="32" color="#AFB5B9"></uni-icons>
        <view class="search">
          <search-bar
            bgc="rgba(238,237,255,0.5000)"
            :radius="5"
            :icon="false"
            placeholder="输入想要模拟的诈骗类型"
          >
          </search-bar>
        </view>
      </view>
      <!-- 模拟列表区域 -->
      <view class="moni-list-container">
        <unicloud-db v-slot:default="{data, loading, error, options}" collection="zp-inteoduce">
          <view v-if="error">{{error.message}}</view>
          <view v-else>
            <view class="moni-list">
              <view 
                class="moni-item" 
                v-for="(item,i) in data" 
                :key="i"
                :style="{backgroundImage: 'url(https://pic.imgdb.cn/item/62f9e72b16f2c2beb11ccfd9.jpg)'}"
                @click="navClickHandler"
              >
                <text>{{item.name}}</text>
              </view>
            </view>
          </view>
        </unicloud-db>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    setup() {
      // 一. 定义跳转到情境选项的方法
      function navClickHandler() {
          uni.navigateTo({
            url:"/subpkg-moni/moni-option/moni-option"
          })
      }
      
      // async function callco() {
      //   const col = uniCloud.importObject("clod")
      //   let res = await col.say("aa")
      //   console.log(res);
      // }
      
      return {
        //跳转情境选项的方法
        navClickHandler,
      }
    }
  }
</script>

<style lang="less">
  html,body,page {
    height: 100vh;
  }
  
  .moni-body {
    position: relative;
    height: 100vh;
    background:  linear-gradient(180deg, #398EF3 0%, rgba(90, 134, 245, 0.47) 11.5%, rgba(179, 88, 251, 0) 38.33%);
    // 背景圆圈
    .circle-list {
      .cirle {
        position: absolute;
        border-radius: 50%;
        border: 1px solid rgba(255,255,225,0.3);
        // z-index: -1;
      }
      
      .circle-one {
        top: -20rpx;
        left: 426rpx;
        width: 78rpx;
        height: 78rpx;
        background: linear-gradient(161.57deg, rgba(255, 167, 167, 0.4) 32.81%, rgba(196, 158, 226, 0) 105.73%);
      }
      
      .circle-two {
        top: 64rpx;
        right: 10rpx;
        width: 136rpx;
        height: 136rpx;
        background: radial-gradient(108.82% 108.82% at 13.97% 8.09%, rgba(143, 155, 243, 0.5) 0%, rgba(174, 148, 254, 0.5) 27.3%, rgba(199, 154, 243, 0.459768) 43.13%, rgba(201, 213, 255, 0.5) 58.28%, rgba(255, 255, 255, 0.205) 75.9%, rgba(237, 212, 225, 0.205) 89.58%);
      }
      
      .circle-three {
        top: 96rpx;
        left: 8rpx;
        width: 88rpx;
        height: 88rpx;
        background: linear-gradient(161.57deg, rgba(255, 167, 167, 0.4) 32.81%, rgba(196, 158, 226, 0) 105.73%);
      }
      
      .circle-four {
        top: 260rpx;
        left: 136rpx;
        width: 84rpx;
        height: 84rpx;
        background: radial-gradient(108.82% 108.82% at 13.97% 8.09%, rgba(143, 155, 243, 0.5) 0%, rgba(174, 148, 254, 0.5) 27.3%, rgba(199, 154, 243, 0.459768) 43.13%, rgba(201, 213, 255, 0.5) 58.28%, rgba(255, 255, 255, 0.205) 75.9%, rgba(237, 212, 225, 0.205) 89.58%)
      }
      
      .circle-five {
        top: 252rpx;
        left: 250rpx;
        width: 48rpx;
        height: 48rpx;
        background: linear-gradient(161.57deg, rgba(255, 167, 167, 0.4) 32.81%, rgba(196, 158, 226, 0) 105.73%);
      }
      
      .circle-six {
        top: 272rpx;
        right: 68rpx;
        width: 60rpx;
        height: 60rpx;
        background: linear-gradient(247.05deg, rgba(131, 155, 241, 0.5) 12.74%, rgba(196, 158, 226, 0) 108.1%);
      }
    }
  }
  
  // 模拟展示区域
  .moni-show-area {
    display: flex;
    justify-content: center;
    padding-top: 110rpx;

    .moni-show {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 630rpx;
      height: 164rpx;
      background: rgba(255,255,255,0.4);
      backdrop-filter: blur(20px);
      border: 1px solid #fff;
      border-radius: 18rpx;
      
      text {
        font-size: 24px;
        font-weight: bold;
        color: transparent;
        background-image: url(https://pic.imgdb.cn/item/62f9e78416f2c2beb11de3d6.jpg);
        background-position: -216px 128px;
        -webkit-background-clip: text;
        background-clip: text;
      }
    }
  }

  // 模拟列表区域
  .moni-func-area {
    position: sticky;
    margin-top: 40rpx;
    padding: 20rpx 40rpx 15rpx;
    min-height: 500rpx;
    background: #FFFFFF;
    border-radius: 28rpx;
    
    
    // 搜索区域
    .moni-search {
      display: flex;
      padding: 0 10rpx;
      align-items: center;
      justify-content: center;
      
      .search {
        width: 100%;
      }
    }
    //模拟列表区域
    .moni-list-container {
      margin-top: 36rpx;
      .moni-list {
        .moni-item {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 40rpx;
          width: 670rpx;
          height: 160rpx;
          // background-image: url(https://pic.imgdb.cn/item/62f9e72b16f2c2beb11ccfd9.jpg);
          background-size: cover; 
          border-radius: 14rpx;
          box-shadow: 0px 3px 12px 0px rgba(0,0,0,0.1000), inset 0px 0px 20px 5px rgba(0,0,0,0.2500);
          
          text {
            font-size: 22px;
            font-weight: bold;
            color: rgba(255,255,255,0.9);
            text-shadow: 0px 2px 12px rgba(0,0,0,0.25);
            text-stroke: 1px rgba(0,0,0,0.5000);
            letter-spacing: 4px;
          }
        }
      }
    }
  }
</style>
