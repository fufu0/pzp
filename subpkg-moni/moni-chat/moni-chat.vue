<template>
  <view class="chat-body">
    <!-- 聊天框区域 -->
    <view class="user-chat-area" @click="inputBlur">
      <view class="chat-box-list" v-for="(item,i) in 5" :key="i">
        <view class="chat-user">
          <view class="user-img">
            <image src="/static/my-tab/qq-avatar.jpg" mode="aspectFill"></image>
          </view>
          <view class="chat-box robot-box" @click.stop>
            <text>我觉得你什么都好 我觉得你什么都好</text>
          </view>
        </view>
        <view class="chat-user chat-from">
          <view class="chat-box use-box" @click.stop>
            <text>感觉能遇上你是我上辈子的福气~</text>
          </view>
          <view class="user-img">
            <image src="/static/my-tab/qq-avatar.jpg" mode="aspectFill"></image>
          </view>
        </view>
      </view>
    </view>
    <!-- 情境对话框选项区域 -->
    <view class="option-input-arae">
      <!-- 对话框区域 -->
       <view class="input-arae" :class="{active: isChat}">
         <view class="face">
           <image src="/static/chat-icon/face.png"></image>
         </view>
         <input 
          type="text" 
          class="chat" 
          :maxlength="0"
          @click="inputClick"
          placeholder="请在下方选项中选取一项进行回应..."
          placeholder-style="font-size:11px; color: #878787;"
          disabled
          >
         <view class="wait" v-show="!isChat">
            <view class="item-list">
             <view class="item"></view>
             <view class="item"></view>
             <view class="item"></view>
            </view>
         </view>
         <view class="wait input" v-show="isChat">
              <image src="../../static/chat-icon/pen.png"></image>
          </view>
       </view> 
       <view class="option-area" v-show="isChat">
         <view class="option-list">
           <view class="option-item" v-for="(item,i) in 4" :key="i">
             <text>哦哦，那你赶快喊你爸妈打钱？</text>
           </view>
         </view>
       </view>
    </view>
  </view>
</template>

<script>
  import {reactive, toRefs} from 'vue'
  export default {
    setup() {
      // 一、监测输入框是否聚焦的数据
      const inputChat = reactive({
        isChat: false
      })
      function inputClick() {
        inputChat.isChat = true;
      }
      function inputBlur() {
        inputChat.isChat = false;
      }
      
      return {
        // 监测数据库聚焦
        ...toRefs(inputChat),
        inputClick,
        inputBlur
      }
    }
  }
</script>

<style lang="less">
    html,body,page,.chat-body {
      height: 100vh;
    }
  
    .chat-body {
      display: flex;
      flex-direction: column;
    }
    
    // 对话区域
    .user-chat-area {
      padding: 14rpx 0rpx 28rpx 32rpx;
      width: 100%;
      flex: 1;
      
      .chat-box-list {
        display: flex;
        flex-direction: column;
        .chat-user {
          display: flex;
          margin-top: 28rpx;
          
          &.chat-from {
            margin-right: 62rpx;
            align-self: flex-end;
            
            .user-img {
              margin-right: 0;
              margin-left: 50rpx;
            }
            .chat-box {
              position: relative;
              background: #F8EAC8;
              &.use-box {
                  &:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    transform: translate(82%,8%);
                    border-top: 37rpx solid transparent;
                    border-bottom: 37rpx solid transparent;
                    border-left: 35rpx solid #F8EAC8;
                  }
              }
            
            }
          }
          
          .user-img {
            margin-right: 48rpx;
            image {
              width: 80rpx;
              height: 80rpx;
              border-radius: 50%;
            }
          }
          
          .chat-box {
            position: relative;
            display: flex;
            align-items: center;
            // height: fit-content;
            box-sizing: border-box;
            padding: 24rpx;
            width: fit-content;
            max-width: 468rpx;
            border-radius: 20rpx;
            background: #D1E6EF;
            font-size: 14px;
            
            &.robot-box {
              &:before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                transform: translate(-82%,7%);
                border-top: 37rpx solid transparent;
                border-bottom: 37rpx solid transparent;
                border-right: 35rpx solid
#D1E6EF;
              }
            }
          
          }
        }
      }
    }
  
    //情境对话框选项区域
     .option-input-arae {
       position: sticky;
       bottom: 0;
       width: 100%;
       background-color: #ECECEC;
       // 对话框区域
       .input-arae {
         display: flex;
         justify-content: space-between;
         height: 60rpx;
         padding: 26rpx 32rpx 68rpx 32rpx;
         
         &.active {
           padding: 26rpx 32rpx 40rpx 32rpx;
         }
         .face {
           display: flex;
           align-items: center;
           justify-content: center;
           width: 60rpx;
           height: 60rpx;
           border-radius: 50%;
           background-color: rgba(146, 185, 243, 0.87);
           image {
             opacity: 0.7;
             width: 57rpx;
             height: 57rpx;
           }
         }
         .chat {
            box-sizing: border-box;
            width: 508rpx;
            padding-left: 20rpx;
            height: 60rpx;
            background-color: #fff;
            border-radius: 40rpx;
         }
         .wait {
           box-sizing: border-box;
           padding: 0 14rpx;
           width: 86rpx;
           height: 60rpx;
           background: #D9D9D9;
           border-radius: 62rpx;
           
           &.input {
             display: flex;
             align-items: center;
             justify-content: center;
             background-color: #FFD66B;
             
             image {
               opacity: 0.4;
               height: 35rpx;
               width: 35rpx;
             }
           }
           
           .item-list {
             display: flex;
             align-items: center;
             justify-content: space-between;
             height: 100%;
             .item {
               width: 14rpx;
               height: 14rpx;
               background-color: #6F6D6D;
               border-radius: 50%;
             }
           }
         }
       }
     }
     // 选项区域
     .option-area {
       .option-list {
         .option-item:first-child {
           border-radius: 20rpx 20rpx 0px 0px;
         }
         .option-item:last-child {
            border-bottom:none;
         }
         .option-item {
           display: flex;
           align-items: center;
           padding: 0 30rpx 0 38rpx;
           box-sizing: border-box;
           width: 100%;
           height: 108rpx;
           border-bottom: 4px solid #ECECEC;
           background: rgba(255,255,255,0.8);
           text {
             font-size: 16px;
           }
         }
       }
     }
</style>
