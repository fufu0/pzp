<template>
  <view>
    <uni-search-bar
      :radius="radius" 
      cancelButton="none"
      :placeholder="placeholder"
      :bgColor="bgc"
      @confirm="searchPhone"
    >
       <template v-slot:searchIcon>
         <view class="circle" v-if="icon">
          <uni-icons  color="#fff" size="18" type="search" />
          </view>
          <view v-if="!icon"></view>
        </template>     
    </uni-search-bar>
  </view>
</template>

<script>
  import {reactive,toRefs} from 'vue'
  export default {
    name:"search-bar",
    emits: ["confirmBar"],
    props: {
      // 背景颜色
      bgc: {
        type: String,
        default: '#fff'
      },
       // 圆角尺寸
      radius: {
        type: Number,
        // 单位是 px
        default: 18
      },
      icon: {
        type: Boolean,
        // 单位是 px
        default: true
      },
      placeholder: {
        type: String,
        // 单位是 px
        default: "在此输入疑似诈骗电话"
      },
    },
    setup(props,context) {
      function searchPhone(e) {
        context.emit("confirmBar",e.value)
      }
      
      return {
        searchPhone
      }
    }
  }
</script>

<style lang="less">
  .uni-searchbar {
            .circle {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 25px;
              height: 25px;
              background: rgba(154,191,250,0.7000);
              border-radius: 50%;
            }
        }
</style>