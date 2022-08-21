<template>
  <view>
    <!-- 顶部任务栏 -->
    <view class="taskbar-box">
      <top-taskbar @clickBar="clickBar" :topStyle="topActive"></top-taskbar>
    </view>
    
    <!-- search -->
    <view class="search-body">
      <swiper class="search-swiper" :current="moduleCurrent" @change="changeTopStyle">
              <!-- 1 -->
      				<swiper-item class="swiper-item">
                <!-- 搜索模块相关 -->
                <view class="first-module">
                  <!-- 搜索框 -->
                  <view class="search-container">
                      <search-bar></search-bar>
                  </view>
                  
                  <!-- 诈骗号码展示框 -->
                  <view class="show-number">
                    <view class="show-number-container">
                      <view class="show-number-title">
                        <text>
                          以下是用户举报的疑似<text class="red">骗子/骚扰号码</text>列表，请大家注意提高警惕，不要上当受骗！
                        </text>
                      </view>
                      <view class="show-number-body">
                        <view class="content">
                          <text>举报时间</text>
                          <text>诈骗号码</text>
                          <text>诈骗类型</text>
                          <text>诈骗详情</text>
                        </view>
                        <view class="content body" v-for="(item,i) in 10" :key="i">
                          <text style="color: #60B963">2022/8/14</text>
                          <text style="color: #878787">2222222222222222</text>
                          <text style="color: #878787">兼职诈骗</text>
                          <text class="more">查看</text>
                        </view>
                      </view>  
                      <view class="Loadmore">
                        <text>点击查看更多</text>
                      </view>
                    </view>
                  </view>
                </view>
                <!-- 搜索模块相关 -->
              </swiper-item>   
              <swiper-item class="swiper-item">        
                <!-- 添加模块相关 -->
                <view class="second-module">
                    <uni-forms>
                      <uni-section title="电话号码" type="line">
                        <uni-forms-item name="name">
                          <uni-easyinput type="number" placeholder="请输入要举报的诈骗号码" trim />
                        </uni-forms-item>
                      </uni-section>
                      <uni-section title="诈骗类型" type="line">
                        <view @click="selectClick">
                        <uni-forms-item name="name">
                                  <uni-data-select
                                    v-model="select.value"
                                    :localdata="select.range"
                                    placeholder="请选择诈骗类型"
                                    @change="selectChange"
                                  >
                                  </uni-data-select>
                      </uni-forms-item>
                      </view> 
                    </uni-section>
                    <uni-section title="添加您的描述（疑似诈骗的理由）：" type="line" v-show="textarea">
                        <uni-forms-item name="name">
                              <uni-easyinput class="area" type="textarea" placeholder="理由" trim/>
                        </uni-forms-item>
                    </uni-section>
                  </uni-forms>
                  <view class="submit">
                    <button size="mini" type="primary" plain>发布</button>
                  </view>
                </view>
                <!-- 添加模块相关 -->
              </swiper-item>
        </swiper>
     </view>
  </view>
</template>

<script>
  import {moduleSwiper,clickBar, changeTopStyle,topStyle} from '/hooks/topTaskBar.js'
  import { getCurrentInstance,reactive,ref,computed,toRefs } from 'vue'
  export default {
    name: "search",
    setup() {
      // 一、下拉框数据相关
      const select = reactive({
          value: '',
          range: [
            { value: 0, text: "公检法诈骗" },
            { value: 1, text: "网恋诈骗" },
            { value: 2, text: "兼职诈骗" },
            { value: 3, text: "网购诈骗" },
          ]
      })
      
      // 由于微信小程序原生组件层级问题，控制textarea的隐藏与显示
      const isTxtShow = reactive({
        textarea: true
      })
      function selectChange() {
        isTxtShow.textarea = true;
        console.log(isTxtShow.textarea);
      }
      let num = 0;
      function selectClick() {
        num++
        console.log(num);
        if (num === 1) {
          isTxtShow.textarea = false;
        } else if (num === 2) {
          num = 0
          isTxtShow.textarea = true;
        }
      }
      
      return {
        select,
        selectChange,
        selectClick,
        ...toRefs(isTxtShow),
        ...toRefs(moduleSwiper),
        ...toRefs(topStyle),
        clickBar,
        changeTopStyle
      }
    }
  }
</script>

<style lang="less">
    html,body,page,.search-body,.search-swiper {
      height: 100vh - 9;
      .swiper-item {
        overflow: auto;
      }
    }
    
    .first-module {
      height: 100vh - 9;
      background: linear-gradient(180deg, #7BB4F9 0%, rgba(126, 161, 249, 0.477273) 11.5%, rgba(199, 134, 250, 0) 38.33%);
    }
    // 顶部任务栏相关
    .taskbar-box {
      position: sticky;
      top: 0;
      z-index: 999;
    }
    
    // 搜索框相关
    .search-container {
      padding: 14rpx 20rpx 0;
    }
    
    // 号码展示列表
    .show-number {
      display: flex;
      justify-content: center;
      padding: 0 40rpx;
      
      .show-number-container {
        min-height: 600rpx;
        background: #FFFFFF;
        box-shadow: 0px 6px 16px 1px rgba(0,0,0,0.1);
        border-radius: 18px;
        
          .show-number-title {
            padding: 18rpx 32rpx 14rpx 28rpx;
            border-bottom: 1px solid #BCCFFC;
            
            text {
              font-size: 12px;
              font-weight: bold;
              
              .red {
                color: #6fa4e1;
              }
            }
          }
          
          .show-number-body {
            padding: 30rpx 28rpx 40rpx 28rpx;
            font-size: 11px;
            
            .content {
              display: flex;
              width: 100%;
              // justify-content: space-between;
              font-size: 11px;
              
              text {
                width: 25%;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                
                &.more{
                  text-decoration: underline;
                  color: #6fa4e1;
                }
              }
            }
            .body {
              position: relative;
              padding-top: 24rpx;
              
              &::after {
                content: '';
                position: absolute;
                bottom: -6rpx;
                left: -28rpx;
                height: 1rpx;
                width: 690rpx;
                background-color: rgba(0,0,0,0.2000);
              }
            }
          }
      }
    }
    .Loadmore {
      display: flex;
      justify-content: center;
      margin-bottom: 80rpx;
        
        text {
          font-size: 11px;
          color: #82B0E7;
          text-decoration: underline;
        }
    }

    // 添加诈骗号码列表区域
    .second-module {
      padding: 30rpx 25rpx 0;
      
      .uni-forms-item {
        margin-bottom: 20rpx;
      }
      
      .submit {
        display: flex;
        justify-content: flex-end;
        margin-top: 30rpx;
        
        button {
          margin-right: 20rpx;
        }
      }
    }
</style>
