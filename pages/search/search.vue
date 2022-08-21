<template>
  <view>
    <!-- 顶部任务栏 -->
    <view class="taskbar-box">  
      <top-taskbar @clickBar="clickBar" :topStyle="topActive"></top-taskbar>
    </view>
    
    <!-- search -->
    <view class="search-body">
      <swiper 
        class="search-swiper" 
        :current="moduleCurrent" 
        @change="changeTopStyle"
        :duration="duration"
      >
      				<swiper-item class="swiper-item">
                <!-- 搜索模块相关 -->
                <view class="first-module">
                  <!-- 搜索框 -->
                  <view class="search-container">
                      <search-bar @confirmBar="confirmBar"></search-bar>
                  </view>
                  
                  <!-- 诈骗号码展示框 -->
                  <view class="show-number">
                    <view class="show-number-container">
                      <view class="show-number-title">
                        <text>
                          以下是用户举报的疑似<text class="red">骗子/骚扰号码</text>列表，请大家注意提高警惕，不要上当受骗！
                        </text>
                      </view>
                    <!-- db -->
                  <unicloud-db 
                    v-slot:default="{data, loading, error, options,hasMore}" 
                    collection="zp-phone" 
                    ref="udb"
                    getcount
                    :page-size="pagesize"
                    :page-current="pagecurrent"
                    page-data="replace"
                  >
                    <view v-if="error">{{error.message}}</view>
                    <view v-else>
                      <view class="show-number-body">
                        <view class="content">
                          <view>举报时间</view>
                          <view>诈骗号码</view>
                          <view>诈骗类型</view>
                          <view>诈骗详情</view>
                        </view>
                        <view v-show="!isShowSearch">
                          <zp-show-content 
                            :data="data" 
                            @popup="popupMore"
                          ></zp-show-content>
                        </view>
                        <view v-show="isShowSearch">
                          <zp-show-content 
                            :data="searchData"
                            @popup="popupMore"
                          ></zp-show-content>
                        </view>
                      </view>  
                      <view class="Loadmore" v-show="!isShowSearch">
                        <text @click="loadMore(hasMore,1)" class="up">上一页</text>
                        <text @click="loadMore(hasMore,2)">下一页</text>
                      </view>
                      <view class="Loadmore" v-show="isShowSearch">
                        <text @click="backSearch">返回</text>
                      </view>
                    </view>
                  </unicloud-db>
                  <!-- db -->
                    </view>
                  </view>
                </view>
                <!-- 搜索模块相关 -->
              </swiper-item>
              <!-- 弹出层 -->
              <uni-popup ref="popup" class="pop-container-box">
                <view class="pop-container">
                  <view class="icon" @click="closepop">
                    <uni-icons type="closeempty" size="20" class="close"></uni-icons>                                                    </view>
                  <uni-section title="诈骗号码" type="line">
                      <uni-easyinput disabled :value="detailZpData.phone" :styles="inputStyle"/>
                  </uni-section>
                  <uni-section title="诈骗类型" type="line">
                      <uni-easyinput disabled :value="detailZpData.type" :styles="inputStyle"/>
                  </uni-section>
                  <uni-section title="诈骗描述" type="line">
                      <uni-easyinput type="textarea" disabled :value="detailZpData.desc" :styles="inputStyle"/>
                  </uni-section>
                </view>
              </uni-popup>
              <!-- 弹出层 -->
              <swiper-item class="swiper-item">        
                <!-- 添加模块相关 -->
                <view class="second-module">
                    <uni-forms>
                      <uni-section title="电话号码" type="line">
                        <uni-forms-item name="name">
                          <uni-easyinput type="number" placeholder="请输入要举报的诈骗号码" trim v-model="phoneData"/>
                        </uni-forms-item>
                      </uni-section>
                      <uni-section title="诈骗类型" type="line">
                        <uni-forms-item name="name">
                                  <uni-data-select
                                    v-model="selectData"
                                    :localdata="select.range"
                                    placeholder="请选择诈骗类型"
                                  >
                                  </uni-data-select>
                      </uni-forms-item>
                    </uni-section>
                    <uni-section title="添加您的描述（疑似诈骗的理由）：" type="line" >
                        <uni-forms-item name="name">
                              <uni-easyinput class="area" type="textarea" placeholder="理由,请控制在5到25字之间" trim v-model.lazy="descData"/>
                        </uni-forms-item>
                    </uni-section>
                  </uni-forms>
                  <view class="submit">
                    <button size="mini" type="primary" plain @click="sameFind">发布</button>
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
      // 一、 轮播图相关数据与方法
      const swiper = reactive({
            duration:0
      })
      
      // 二、下拉框数据相关
      const select = reactive({
          value: '',
          range: [
            { value: "兼职诈骗", text: "兼职诈骗" },
            { value: "校园贷诈骗", text: "校园贷诈骗" },
            { value: "扫码送礼诈骗", text: "扫码送礼诈骗" },
            { value: "假冒公检法诈骗", text: "假冒公检法诈骗" },
            { value: "网络游戏诈骗", text: "网络游戏诈骗" },
            { value: "网恋诈骗", text: "网恋诈骗" },
            { value: "其他类型诈骗", text: "其他类型诈骗" }
          ]
      })
      
      // 三、表单数据相关
      const udb = ref(null)
      const dataFrom = reactive({
        phoneData: '',
        selectData :'',
        descData: ''
      })
      // 1. 查询数据库是否有相同的数据
      const db = uniCloud.database();
      const zpPhone = db.collection("zp-phone");
      function sameFind() {
        zpPhone
          .where(`phone == "${dataFrom.phoneData}"`)
        	.get()
          .then((res)=>{
            if (res.result.data.length !== 0) {
              uni.$showMsg("已有用户添加过此号码！")
            } else {
              add(zpPhone)
            }
          }).catch((err)=>{
            uni.$showMsg(`${err.message}`) // 打印错误码
          })
      }
        
      // 2. 添加
      function add(zpPhone) {
        zpPhone.add({
          "phone":dataFrom.phoneData,
          "type":dataFrom.selectData,
          "desc":dataFrom.descData
        }).then((res)=>{
          if (!res.errMsg) {
            uni.$showMsg("发送成功")
            dataFrom.phoneData = "";
            dataFrom.selectData = "";
            dataFrom.descData = "";
            udb.value.loadData({clear: true})
          } else {
            uni.$showMsg(res.errMsg)
          }
        }).catch((err)=>{
          uni.$showMsg(`${err.message}`)
        })
      }
      // 四、 加载更多相关
      const loadData = reactive({
        pagesize: 12,
        pagecurrent: 1,
        isLoad: false
      })
      function loadMore(hasMore,isdown) {
        if (!loadData.isLoad) {
          loadData.isLoad = true;
          if (hasMore && isdown == 2) {
            loadData.pagecurrent ++
          }
          if (loadData.pagecurrent !== 1 && isdown == 1) {
            loadData.pagecurrent --
          }
          // 节流
          setTimeout(() => {
            loadData.isLoad = false;
          }, 1000)
        }    
      }
      
      // 五、 查看详情相关
      const inputStyle = reactive({
        disableColor: "#fff",
        color: "#000"
      })
      const popup = ref(null)
      const detailZpData = reactive({
        phone: '',
        type: '',
        desc: ''
      })
      function popupMore(phone,type,desc) {
        popup.value.open();
        detailZpData.phone = phone;
        detailZpData.type = type;
        detailZpData.desc = desc;
      }
      function closepop() {
        popup.value.close();
      }
      
      // 六、 搜索相关
      const SearchZp = reactive({
        isShowSearch: false,
        searchData: [],
      })
      function confirmBar(e) {
        zpPhone
          .where(`phone == "${e}"`)
        	.get()
          .then((res)=>{
            if (res.result.data.length === 0) {
              uni.$showMsg("无符合的诈骗号码")
            } else {
              SearchZp.searchData = res.result.data
              SearchZp.isShowSearch = true
            }
          }).catch((err)=>{
            uni.$showMsg(`${err.code},${err.message}`)
          })
      }
      function backSearch() {
        SearchZp.isShowSearch = false;
      }
      
      
      return {
        // 轮播图相关数据与方法
        ...toRefs(swiper),
        // 下拉框数据相关
        select,
        // 表单数据相关
        ...toRefs(dataFrom),
        add,
        udb,
        sameFind,
        // 模块切换相关
        ...toRefs(moduleSwiper),
        ...toRefs(topStyle),
        clickBar,
        changeTopStyle,
        // 加载更多相关
        ...toRefs(loadData),
        loadMore,
        // 查看详情相关
        popupMore,
        popup,
        closepop,
        detailZpData,
        inputStyle,
        // 搜索相关
        confirmBar,
        ...toRefs(SearchZp),
        backSearch
      }
    },
    onShow() {
      this.moduleCurrent = 0;
      this.duration = 0;
      setTimeout(() => {
        this.duration = 500;
      },0)
    },
    onHide() {
      this.popup.close()
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
      // display: flex;
      // justify-content: center;
      padding: 0 40rpx;
      padding-bottom: 80rpx;
      
      .show-number-container {
        padding-bottom: 60rpx;
        min-height: 100rpx;
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
              
              view {
                margin-right: 10rpx;
                width: 25%;
                text-align: center;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
      }
    }
    .Loadmore {
      display: flex;
      justify-content: center;
        
        text {
          font-size: 11px;
          color: #82B0E7;
          text-decoration: underline;
          
          &.up {
            margin-right: 20rpx;
          }
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
    
    .pop-container-box {
      .pop-container {
        position: relative;
        padding: 20rpx 30rpx 40rpx 30rpx;
        width: 500rpx;
        background-color: #fff;
        border-radius: 20rpx;
        // transform: translateY(-10%);
        
        .icon {
          pointer-events: auto;
          position: absolute;
          top: 30rpx;
          right: 20rpx;
          z-index: 999;
        }
        
        .uni-section {
            background-color: transparent;
            
            .uni-input-input {
                color: #000;
            }
        }
      }
    }
</style>
