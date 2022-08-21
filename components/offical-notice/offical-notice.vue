<template>
  <view>
    <view class="notice-body" v-for="(item, i) in data" :key="i" @click="toDetail(item._id,item.title)">
      <view class="body-left">
        <view class="content">
          {{item.title}}
        </view>
        <view class="time">
          <text class="left">官方动态</text>
          <uni-dateformat class="last_modify_date" :date="item.last_modify_date"
          	format="yyyy-MM-dd" :threshold="[60000, 2592000000]" />
        </view>
      </view>
      <view class="body-right">
        <image :src="item.avatar" mode="aspectFill"></image>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"offical-notice",
    props: {
      data: {
        required: true
      },
    },
    emits: ["clickNot"],
    setup(props,context) {
      function toDetail(id,title) {
        context.emit("clickNot",id,title)
      }
      
      return {
        toDetail
      }
    }
  }
</script>

<style lang="less">
   .notice-body {
        display: flex;
        align-items: center;
        padding-top: 28rpx;
        padding-bottom: 10rpx;
        border-bottom: 1px solid rgba(0,97,186,0.2);
        
        .body-left {
          margin-right: 30rpx;
          
          .content {
            font-size: 14px;
            display:-webkit-box;
            overflow: hidden; /*超出隐藏*/
            text-overflow: ellipsis;/*隐藏后添加省略号*/
            -webkit-box-orient:vertical; 
            -webkit-line-clamp:2; //想显示多少行
          }
          .time {
              margin-top: 20rpx;
              font-size: 10px;
              color: #848484;
              
              .left {
                margin-right: 20rpx;
              }
          }
        }
        .body-right {
          image {
            width: 160rpx;
            height: 106rpx;
          }
        }
      }
</style>