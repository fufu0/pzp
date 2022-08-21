<template>
  <view>
    <view class="content body" v-for="(item,i) in data" :key="i">
      <view style="color: #60B963">
        <uni-dateformat class="data" :date="item.date" format="yyyy/MM/dd" />
      </view>
      <view style="color: #878787">{{item.phone}}</view>
      <view style="color: #878787">{{item.type}}</view>
      <view class="more" @click="popupMore(item.phone,item.type,item.desc)">查看</view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"zp-show-content",
    props: {
      data: {
        required: true
      },
    },
    emits: ["popup"],
    setup(props,context) {
      function popupMore(phone,type,desc) {
        context.emit("popup",phone,type,desc)
      }
      
      return {
        popupMore
      }
    }
  }
</script>

<style lang="less">
      .content {
        display: flex;
        width: 100%;
        // justify-content: space-between;
        font-size: 11px;
        
        view {
          margin-right: 10rpx;
          width: 25%;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          
          .data {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
      
          &.more{
            text-decoration: underline;
            color: #6fa4e1;
          }
        }
      }
      .body {
        position: relative;
        padding-top: 31rpx;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -6rpx;
          left: -28rpx;
          height: 1rpx;
          width: 670rpx;
          background-color: rgba(0,0,0,0.2000);
        }
      }
</style>