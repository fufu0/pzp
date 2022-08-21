<template>
	<view class="center">
		<!-- 用户资料区域 -->
		<view class="user-area">
		  <view class="user-bgc"></view>
		  <view class="user-container"  @click.capture="toUserInfo">
		    <view class="user-data">
		      <view class="user-avatar">
		        <view class="cloud" v-if="userInfo.avatar_file&&userInfo.avatar_file.url">
              <cloud-image width="160rpx" height="160rpx" :src="userInfo.avatar_file.url"></cloud-image>
            </view>
		        <image v-else src="/static/my-tab/qq-avatar.jpg"></image>
		      </view>
		      <view class="user-name-arae">
		        <view class="name">
		          <text v-if="hasLogin">{{userInfo.nickname||userInfo.username||userInfo.mobile}}></text>
		          <text class="uer-name" v-else>未登录</text>
		        </view>
		        <view class="arae">
		          <text>ip：{{userInfo.last_login_ip}}</text>
		        </view>
		      </view>
		    </view>
		    <view class="user-edit">
		      <text>编辑</text>
		    </view>
		  </view>
		</view>
		  
		<!-- 功能列表区域 -->
		<view class="func-area">
		  <view class="func-list">
		    <view class="func-item collect">
		      <image src="/static/my-tab/collect.png" mode=""></image>
		      <text>收藏</text>
		    </view>
		    <view class="func-item footprint" @click="navigateToFp">
		      <image src="/static/my-tab/footprint.png"></image>
		      <text>足迹</text>
		    </view>
		    <view class="func-item result">
		      <image src="/static/my-tab/result.png"></image>
		      <text>结果</text>
		    </view>
		    <view class="func-item note">
		      <image src="/static/my-tab/note.png"></image>
		      <text>笔记</text>
		    </view>
		  </view>
		</view>
		  
		<!-- 设置区域 -->
		<view class="set-area">
		  <view class="set-list">
		    <navigator
		      class="set-item"
		      v-for="(item,index) in ucenterList" 
		      :key="index"
		      :url="item.to" 
		      @click="ucenterListClick(item)"
		    >
		      <text>{{item.title}}</text>
		      <uni-icons type="forward" size="18"></uni-icons>
		    </navigator> 
		  </view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
	import callCheckVersion from '@/uni_modules/uni-upgrade-center-app/utils/call-check-version';
	// #ifdef APP
	import UniShare from '@/uni_modules/uni-share/js_sdk/uni-share.js';
	const uniShare = new UniShare()
	// #endif
	const db = uniCloud.database();
	export default {
		// #ifdef APP
		onBackPress({from}) {
			if(from=='backbutton'){
				this.$nextTick(function(){
					uniShare.hide()
				})
				return uniShare.isShow;
			}
		},
		// #endif
		data() {
			return {
				gridList: [{
						"text": this.$t('mine.showText'),
						"icon": "chat"
					},
					{
						"text": this.$t('mine.showText'),
						"icon": "cloud-upload"
					},
					{
						"text": this.$t('mine.showText'),
						"icon": "contact"
					},
					{
						"text": this.$t('mine.showText'),
						"icon": "download"
					}
				],
				ucenterList: [
						// // #ifdef APP-PLUS
						// {
						// 	"title": "问题反馈",
						// 	// "event": 'signInByAd',
      //         "to": '/uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback'
						// },
						// // #endif
						// {
						// 	"title": "问题反馈",
						// 	// "event": 'signIn',
              // "to": '/uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback'
						// },
						// #ifdef APP-PLUS
						{
							"title": this.$t('mine.toEvaluate'),
							"event": 'gotoMarket',
						},
						//#endif
						// {
						// 	"title":this.$t('mine.readArticles'),
						// 	"to": '/pages/ucenter/read-news-log/read-news-log'
						// },
						// {
						// 	"title": this.$t('mine.myScore'),
						// 	"to": '',
						// 	"event": 'getScore'
						// }
						// // #ifdef APP-PLUS
						// , {
						// 	"title": this.$t('mine.invite'),
						// 	"event": 'share'
						// }
						// // #endif
					{
						"title": this.$t('mine.feedback'),
						"to": '/uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback'
					}, {
						"title": this.$t('mine.settings'),
						"to": '/pages/ucenter/settings/settings'
					},
					{
						"title": this.$t('mine.about'),
						"to": '/pages/ucenter/about/about'
					}
				],
				listStyles: {
					"height": "150rpx", // 边框高度
					"width": "150rpx", // 边框宽度
					"border": { // 如果为 Boolean 值，可以控制边框显示与否
						"color": "#eee", // 边框颜色
						"width": "1px", // 边框宽度
						"style": "solid", // 边框样式
						"radius": "100%" // 边框圆角，支持百分比
					}
				}
			}
		},
		onLoad() {
			// console.log(313,this.userInfo,this.hasLogin);
			//#ifdef APP-PLUS
			this.ucenterList.push({
				title:this.$t('mine.checkUpdate'),// this.this.$t('mine.checkUpdate')"检查更新"
				rightText: this.appVersion.version + '-' + this.appVersion.versionCode,
				event: 'checkVersion',
				icon: 'loop',
				showBadge: this.appVersion.hasNew
			})
			//#endif
		},
		computed: {
			...mapGetters({
				userInfo: 'user/info',
				hasLogin: 'user/hasLogin'
			})
			// #ifdef APP-PLUS
			,
			appVersion() {
				return getApp().appVersion
			}
			// #endif
			,
			appConfig() {
				return getApp().globalData.config
			}
		},
		methods: {
			...mapMutations({
				setUserInfo: 'user/login'
			}),
      // 去阅读记录
      navigateToFp() {
        uni.navigateTo({
        	url: "/pages/ucenter/read-news-log/read-news-log"
        })
      },
			toSettings() {
				uni.navigateTo({
					url: "/pages/ucenter/settings/settings"
				})
			},
			signIn() { //普通签到
				this.$refs.signIn.open()
			},
			signInByAd(){ //看激励视频广告签到
				this.$refs.signIn.showRewardedVideoAd()
			},
			/**
			 * 个人中心项目列表点击事件
			 */
			ucenterListClick(item) {
				if (!item.to && item.event) {
					this[item.event]();
				}
			},
			async checkVersion() {
				let res = await callCheckVersion()
				console.log(res);
				if (res.result.code > 0) {
					checkUpdate()
				} else {
					uni.showToast({
						title: res.result.message,
						icon: 'none'
					});
				}
			},
			toUserInfo() {
				uni.navigateTo({
					url: '/pages/ucenter/userinfo/userinfo'
				})
			},
			tapGrid(index) {
				uni.showToast({
					// title: '你点击了，第' + (index + 1) + '个',
					title: this.$t('mine.clicked') + " " + (index + 1) ,
					icon: 'none'
				});
			},
			/**
			 * 去应用市场评分
			 */
			gotoMarket() {
				// #ifdef APP-PLUS
				if (uni.getSystemInfoSync().platform == "ios") {
					// 这里填写appstore应用id
					let appstoreid = this.appConfig.marketId.ios; // 'id1417078253';
					plus.runtime.openURL("itms-apps://" + 'itunes.apple.com/cn/app/wechat/' + appstoreid + '?mt=8');
				}
				if (uni.getSystemInfoSync().platform == "android") {
					var Uri = plus.android.importClass("android.net.Uri");
					var uri = Uri.parse("market://details?id=" + this.appConfig.marketId.android);
					var Intent = plus.android.importClass('android.content.Intent');
					var intent = new Intent(Intent.ACTION_VIEW, uri);
					var main = plus.android.runtimeMainActivity();
					main.startActivity(intent);
				}
				// #endif
			},
			/**
			 * 获取积分信息
			 */
			getScore() {
				if (!this.userInfo) return uni.showToast({
					title: this.$t('mine.checkScore'),
					icon: 'none'
				});
				uni.showLoading({
					mask: true
				})
				db.collection("uni-id-scores")
					.where('"user_id" == $env.uid')
					.field('score,balance')
					.orderBy("create_date", "desc")
					.limit(1)
					.get()
					.then((res) => {
						console.log(res);
						const data = res.result.data[0];
						let msg = '';
						msg = data ? (this.$t('mine.currentScore')+ data.balance) : this.$t('mine.noScore');
						uni.showToast({
							title: msg,
							icon: 'none'
						});
					}).finally(()=>{
						uni.hideLoading()
					})
			},
			async share() {
				let {
					result
				} = await uniCloud.callFunction({
					name: 'uni-id-cf',
					data: {
						action: 'getUserInviteCode'
					}
				})
				console.log(result);
				let myInviteCode = result.myInviteCode || result.userInfo.my_invite_code
				console.log(myInviteCode);
				let {
					appName,
					logo,
					company,
					slogan
				} = this.appConfig.about
				// #ifdef APP-PLUS
				uniShare.show({
					content: { //公共的分享类型（type）、链接（herf）、标题（title）、summary（描述）、imageUrl（缩略图）
						type: 0,
						href: this.appConfig.h5.url +
							`/#/pages/ucenter/invite/invite?code=uniInvitationCode:${myInviteCode}`,
						title: appName,
						summary: slogan,
						imageUrl: logo +
							'?x-oss-process=image/resize,m_fill,h_100,w_100' //压缩图片解决，在ios端分享图过大导致的图片失效问题
					},
					menus: [{
							"img": "/static/app-plus/sharemenu/wechatfriend.png",
							"text": this.$t('common.wechatFriends'),
							"share": {
								"provider": "weixin",
								"scene": "WXSceneSession"
							}
						},
						{
							"img": "/static/app-plus/sharemenu/wechatmoments.png",
							"text": this.$t('common.wechatBbs'),
							"share": {
								"provider": "weixin",
								"scene": "WXSceneTimeline"
							}
						},
						{
							"img": "/static/app-plus/sharemenu/weibo.png",
							"text": this.$t('common.weibo'),
							"share": {
								"provider": "sinaweibo"
							}
						},
						{
							"img": "/static/app-plus/sharemenu/qq.png",
							"text": "QQ",
							"share": {
								"provider": "qq"
							}
						},
						{
							"img": "/static/app-plus/sharemenu/copyurl.png",
							"text": this.$t('common.copy'),
							"share": "copyurl"
						},
						{
							"img": "/static/app-plus/sharemenu/more.png",
							"text": this.$t('common.more'),
							"share": "shareSystem"
						}
					],
					cancelText: this.$t('common.cancelShare'),
				}, e => { //callback
					console.log(e);
				})
				// #endif
			}
		}
	}
</script>

<style lang="less" scoped>
    // 用户资料区域
    .user-area {
      .user-bgc {
        width: 100%;
        height: 284rpx;
        background: rgba(147,200,249,0.8000);
        border-radius: 0px 0px 30px 30px;
      }
      .user-container {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 0 50rpx;
        height: 160rpx;
        transform: translateY(-18%);
        
        .user-data {
          display: flex;
          align-items: center;
          .user-avatar {
            .cloud {
              width: 160rpx;
              height: 160rpx;
              margin-right: 20rpx;
              transform: translate(-5%,-20%);
            }
            image {
              width: 160rpx;
              height: 160rpx;
              border-radius: 50%;
              margin-right: 20rpx;
            }
          }
          .user-name-arae {
            .name{
              font-size: 18px;
              font-weight: bold;
               text {
                  display: inline-block;
                  max-width: 300rpx;
                 // 文字不允许换行（单行文本）
                 white-space: nowrap;
                 // 溢出部分隐藏
                 overflow: hidden;
                 // 文本溢出后，使用 ... 代替
                 text-overflow: ellipsis;
               }
            }
            .arae{
              margin-top: 5rpx;
              font-size: 10px;
              color: rgba(0,0,0,0.6000);
            }
          }
        }
        .user-edit {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 108rpx;
          height: 52rpx;
          background: #F1F1F1;
          border-radius: 74rpx;
          border: 1px solid rgba(0,0,0,0.3000);
          text {
            font-size: 12px;
            color: rgba(0,0,0,0.7);
          }
        }
      }
    }
    
    // 功能列表区域
    .func-area {
      
      .func-list {
        display: flex;
        justify-content: space-around;
        padding: 0 20rpx;
        .func-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 140rpx;
          height: 152rpx;
          border-radius: 56rpx;
          background-color: #F1F1F1;
          
          &.collect {
            background: radial-gradient(97.86% 83.02% at 10% 14.47%, rgba(255, 39, 39, 0.8) 0%, rgba(255, 111, 49, 0.8) 37.5%, rgba(255, 201, 120, 0.8) 100%);
            
            image {
              width: 80rpx;
              height: 80rpx;
            }
          }
          &.footprint {
            background: radial-gradient(132.24% 132.24% at 62.14% 119.08%, rgba(35, 192, 22, 0.8) 0%, rgba(74, 220, 71, 0.8) 42.71%, rgba(90, 231, 240, 0.8) 100%);
            
            image {
              width: 70rpx;
              height: 70rpx;
            }
            text {
              transform: translateY(25%);
            }
          }
          &.result {
            background: radial-gradient(137.14% 116.34% at -25% 55.92%, rgba(29, 77, 249, 0.7) 0%, rgba(119, 107, 255, 0.7) 37.5%, rgba(255, 244, 147, 0.7) 100%);
            
            image {
              width: 95rpx;
              height: 95rpx;
            }
            text {
              transform: translateY(-10%);
            }
          }
          &.note {
            background: radial-gradient(100.66% 100.66% at 120.71% 108.55%, rgba(214, 126, 255, 0.8) 0%, rgba(162, 130, 255, 0.8) 37.5%, rgba(142, 228, 255, 0.8) 100%);
            image {
              width: 75rpx;
              height: 75rpx;
              transform: translateY(8%);
            }
            text {
              transform: translateY(28%);
            }
          }

          text {
            font-size: 10px;
            font-weight: bold;
            color: #FFFFFF;
          }
        }
      }
    }
    
    // 设置区域
    .set-area {
      margin-top: 50rpx;
      padding: 0 40rpx;
      .set-list {
        border-top: 1px solid rgba(0,0,0,0.1000);
        padding: 0 20rpx;
        .set-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18rpx 0;
          text {
            font-size: 14px;
          }
          uni-icons {}
        }
      }
    }
</style>