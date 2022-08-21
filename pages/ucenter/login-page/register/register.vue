<template>
	<view class="uni-container">
    <!-- 顶部文字 -->
    <view class="top-title">
      <login-title-box text="注册"></login-title-box>
    </view>
		<uni-forms ref="form" :value="formData" :rules="rules" validate-trigger="submit" err-show-type="undertext">
			<uni-forms-item name="username" required>
				<uni-easyinput  class="easyinput" :placeholder="$t('register.usernamePlaceholder')" v-model="formData.username" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="nickname">
				<uni-easyinput  class="easyinput" :placeholder="$t('register.nicknamePlaceholder')" v-model="formData.nickname" trim="both"  />
			</uni-forms-item>
			<uni-forms-item name="password" v-model="formData.password" required>
				<uni-easyinput  class="easyinput" :placeholder="$t('register.passwordDigitsPlaceholder')" type="password" v-model="formData.password" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="pwd2" v-model="formData.pwd2" required>
				<uni-easyinput  class="easyinput" :placeholder="$t('register.passwordAgain')" type="password" v-model="formData.pwd2" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="captcha" required>
				<uni-captcha scene="register" v-model="formData.captcha"></uni-captcha>
			</uni-forms-item>
			<uni-agreements @setAgree="agree = $event"></uni-agreements>
			<button plain class="send-btn" :disabled="!canSubmit" :type="canSubmit?'primary':'default'" @click="submit">{{$t('register.registerAndLogin')}}</button>
		</uni-forms>
	</view>
</template>

<script>
import rules from './validator.js';
import mixin from '../common/login-page.mixin.js';
	export default {
		mixins:[mixin],
		data() {
			return {
				formData: {
					"username": "",
					"nickname": "",
					"password":"",
					"pwd2":"",
					"captcha":""
				},
				rules,
				agree:false,
			}
		},
		computed:{
			canSubmit(){
				return this.formData.username.length && this.formData.password.length && this.formData.captcha.length == 4 && this.agree
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		onLoad() {
			// uni.setNavigationBarTitle({
			// 	title: this.$t('register.navigationBarTitle')
			// })
		},
		methods: {
			/**
			 * 触发表单提交
			 */
			submit() {
				if(!this.agree){
					return uni.showToast({
						title: this.$t('common.noAgree'),
						icon: 'none'
					});
				}
				uni.showLoading({
					mask: true
				})
				this.$refs.form.validate().then((res) => {
						this.submitForm(res)
					}).catch((errors) => {
						console.log(errors);
					})
					.finally(() => {
						uni.hideLoading()
					})
			},
			submitForm(params) {
				uniCloud.callFunction({
					name:'uni-id-cf',
					data:{
						action:'register',
						params,
					},
					success: ({result}) => {
						console.log(result);
						if(result.code === 0){
							this.loginSuccess(result)
						}else{
							uni.showModal({
								content: result.msg,
								showCancel: false
							});
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import url("../common/login-page.css");
	.uni-container {
		padding: 15px;
    padding-top: 5px;
	}
	.send-btn{
		margin-top: 15px;
    height: 80rpx;
    font-size: 30rpx;
	}
	.uni-container ::v-deep .uni-forms-item__label{
		width: 15px !important;
	}
  .top-title {
    margin-bottom: 30rpx;
  }
</style>
