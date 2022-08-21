<template>
  <view>
      <view class="taskbar-container">
        <view 
          class="taskbar" 
          :class="{
            active: activeIndex === i,
            noactive: activeIndex !== i,
            radiusleft: radiusLeft === i,
            radiusright: radiusRight === i
          }" 
          @click="clickTop(i)" 
          v-for="(item,i) in 2" :key="i"
        >
          <text>官方公告</text>
        </view>
      </view>
  </view>
</template>

<script>
  import { reactive,ref,toRefs,computed } from 'vue'
  export default {
    name:"top-taskbar",
    emits: ['clickBar'],
    props: {
      topStyle: {
        type: Number
      },
      radiusLeft: {
        type: Number,
        default: -1
      },
      radiusRight: {
        type: Number,
        default: -1
      }
    },
    setup(props,context) {
      // 动态绑定样式
      const isActive = reactive({
        activeIndex: computed(() => {
          return props.topStyle
        })
      })
      
      function clickTop(i) {
        context.emit('clickBar', i)
        // isActive.activeIndex = i;
      }
      
      return {
        ...toRefs(isActive),
        clickTop
      }
    }
  }
</script>

<style lang="less">
  .taskbar-container {
    display: flex;
    width: 100%;
    height: 100rpx;
    
    .taskbar {
      width: 50%;
      text-align: center;
      line-height: 100rpx;
      font-size: 14px;
      font-weight: bold;
      color: rgba(0,0,0,0.7000);
    }
    .active {
      background: radial-gradient(118.37% 118.37% at 42.78% 0%, #67ADFF 0%, #91C4FF 19.79%, #B0D5FF 34.38%, #F5F9FD 73.44%, #F5F9FD 100%);
      color: #1F65B8;
    }
    .noactive {
      background-color: #fff;
      border-bottom: 1px solid rgba(0,0,0,0.2000);
    }
    .radiusleft{
      border-radius: 20rpx 0 0 0;
    }
    .radiusright{
      border-radius: 0 20rpx 0 0;
    }
  }
</style>