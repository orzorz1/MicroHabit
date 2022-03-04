<template>
	<view>
		<view style="position: absolute;">
		<!-- 头像 -->
		<view class="avatar">
			<view class="font_left">头像</view>
			<image :src="userInfo.avatar"></image>
		</view>
		<!-- 账户信息 -->
		<view class="accInfo">
			<view class="Info">
				<view class="font_left">昵称</view>
				<view @tap="changeUsername" class="btn">
				<view class="font_right">{{userInfo.username}}</view>
				<image src="../../../../static/icon/arrow.png" style="width: 2.2vh;height: 2.2vh;"></image>
				</view>
			</view>
			<view class="divLine"></view>
			<view class="Info">
				<view class="font_left">性别</view>
				<view @tap="changeSexual" class="btn">
				<view class="font_right">{{userInfo.sexual}}</view>
				<image src="../../../../static/icon/arrow.png" style="width: 2.2vh;height: 2.2vh;"></image>
				</view>
			</view>
			<view class="divLine"></view>
			<view class="Info">
				<view class="font_left">生日</view>
				<view @tap="changeBirthday" class="btn">
				<view class="font_right">{{userInfo.birthday}}</view>
				<image src="../../../../static/icon/arrow.png" style="width: 2.2vh;height: 2.2vh;"></image>
				</view>
			</view>
			<view class="divLine"></view>
			<view class="Info">
				<view class="font_left">修改密码</view>
				<view @tap="changePassword" class="btn">
				<image src="../../../../static/icon/arrow.png" style="width: 2.2vh;height: 2.2vh;"></image>
				</view>
			</view>
		</view>
		<!-- 绑定账号 -->
		<view style="width: 90vw;margin-left: 5vw;border-radius: 20px; background-color: #eef9ff;">
			<view class="id" v-for='account in userInfo.accounts'>
				<view class="font_left">{{account.id_type}}</view>
				<view class="font_right" style="margin-right: 5vw;">{{account.id}}</view>
			</view>
		</view>
		<view class="Info" style="margin-top: 5vh;" @tap="setSex" v-if='((newBirthday==="2000-6-8")&&(newUsername==="twt")&&(newSexual==="其他"))' ></view>
		</view>
		<!-- 退出登录 -->
		<view class="exit">
			<view style="text-decoration: underline;color: red; font-size: 2.5vh;" @tap="exit">退出登录</view>
		</view>
		<!-- 修改信息时的遮罩层 -->
		<view class="mask1" v-if="changebirthday||changesexual||changeusername"></view>
		<!-- 修改username弹窗 -->
		<view v-if="changeusername" class="changeUsername">
			<view class="top">
				<view style="margin-left: 15vw;" @tap="close">取消</view>
				<view style="font-size: 2.2vh;font-weight: 500;">输入昵称</view>
				<view style="margin-right: 15vw; color: #3f8dcf;" @tap="setUsername">确定</view>
			</view>
			<!-- username输入框 -->
			<view>
				<input class="input_username" placeholder="请输入昵称" maxlength="10" v-model="newUsername"/>
			</view>
		</view>
		<!-- 修改密码弹窗 -->
		<view v-if="changepassword" class="changeUsername" style="height:25vh ;">
			<view class="top">
				<view style="margin-left: 15vw;" @tap="close">取消</view>
				<view style="font-size: 2.2vh;font-weight: 500;">更改密码</view>
				<view style="margin-right: 15vw; color: #3f8dcf;" @tap="setPassword">确定</view>
			</view>
			<!-- username输入框 -->
			<view>
				<input class="input_username" style="margin-top: 2vh;" placeholder="请输入原密码" maxlength="16" v-model="originalPassword"/>
				<input class="input_username" style="margin-top: 2vh;" placeholder="请输入新密码" maxlength="16" v-model="newPassword"/>
			</view>
		</view>
		<!-- 修改性别弹窗 -->
		<view v-if="changesexual" class="changeSexual">
			<view class="top">
				<view style="margin-left: 5vw;" @tap="close">取消</view>
				<view style="font-size: 2.2vh;font-weight: 500;">选择性别</view>
				<view style="margin-right: 5vw; color: #3f8dcf;" @click="setSexual">确定</view>
			</view>
			<!-- 性别选择器-->
			<picker-view class="sexualPicker" @change="chooseSexual">
				<picker-view-column>
					<view v-for="sex in sexuals">{{sex}}</view>
				</picker-view-column>
			</picker-view>
		</view>
		<!-- 修改生日弹窗 -->
		<view v-if="changebirthday" class="changeBirthday">
			<view class="top">
				<view style="margin-left: 5vw;" @tap="close">取消</view>
				<view style="font-size: 2.2vh;font-weight: 500;">选择生日</view>
				<view style="margin-right: 5vw; color: #3f8dcf;" @click="setBirthday">确定</view>
			</view>
			<!-- 日期选择器 -->
			<picker-view class="birthdayPicker" @change="chooseDate" :value="now">
				<picker-view-column>
					<view v-for="Y in YYYY">{{Y}}年</view>
				</picker-view-column>
				<picker-view-column>
					<view v-for="M in MM">{{M}}月</view>
				</picker-view-column>
				<picker-view-column>
					<view v-for="D in DD">{{D}}日</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>

<script>
	import md5 from "js-md5";
	import { mapState, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				// 控制修改页弹出
				changeusername:false,
				changesexual:false,
				changebirthday:false,
				changepassword:false,
				
				sexuals:['保密','男','女','其他'],
				newSexual:'保密',
				newUsername:'',
				originalPassword:'',
				newPassword:'',
				
				//日期选择器用到的数据
				YYYY:[],
				MM:[1,2,3,4,5,6,7,8,9,10,11,12],
				DD:[],
				now:[],
				newBirthday:'',
				
			}
		},
		//时间选择器使用，获取当前时间
		created() {
			let date = new Date()
			let tempY = []
			this.newBirthday=(date.getFullYear()-22)+'-'+(date.getMonth()+1)+'-'+(date.getDate())
			this.now.push(date.getFullYear()-1922)
			this.now.push(date.getMonth())
			this.now.push(date.getDate()-1)
			for(let i=1900;i<=date.getFullYear();i++){
				tempY.push(i)
			}
			this.YYYY = tempY
			for(let i=1;i<=31;i++){
				this.DD.push(i)
			}
		},
		computed: {
		    ...mapState(['userInfo','url']),
		},
		methods: {
			//调整滚轮,使日期均存在,且不超过当前日期
			chooseDate(e){
				let val = e.detail.value
				let date = new Date(val[0]+1900,val[1]+1,0)
				let tempM = []
				let tempD = []
				let now = this.now
				// 列出12个月
				for(let i=1;i<=12;i++){
					tempM.push(i)
				}
				this.MM=tempM
				//获取当前月的最大天数，并列出日期
				for(let i=1;i<=date.getDate();i++){
					tempD.push(i)
				}
				this.DD=tempD
				
				//如果选择的年等于当前年，只列出1到当前月
				if(val[0]+1900===1922+now[0]){
					tempM = []
					for(let i=1;i<=now[1]+1;i++){
						tempM.push(i)
					}
					this.MM=tempM
				}
				//如果选择的年等于当前年且选中的月等于当前月，只列出1到当前日
				if(val[0]+1900===1922+now[0] && val[1]===now[1]){
					tempD = []
					for(let i=1;i<=now[2]+1;i++){
						tempD.push(i)
					}
					this.DD=tempD
				}
				// 将选择的日期转化为YYYY-MM-DD
				this.newBirthday = (val[0]+1900)+"-"+(val[1]+1)+"-"+(val[2]+1)
			},
			
			setBirthday(){
				this.close()
				this.$store.commit('birthday',this.newBirthday)
			},
			
			chooseSexual(e){
				this.newSexual=this.sexuals[e.detail.value[0]]
			},
			setSexual(){
				this.close()
				this.$store.commit('sexual',this.newSexual)
			},
			setSex(){
				uni.navigateTo({url:'/components/hi'})
			},
			setUsername(){
				let that = this
				wx.request({
					url: this.url+'/users/change_name?user_name='+this.userInfo.username+'&&user_name_new='+this.newUsername,
					header: {
						'Content-Type': 'application/json'
					},				
					success: function(res) {
						if(res.data.code===0){
							uni.showToast({
								title: '修改成功',
								icon:'none',
								duration: 2000
							});
							that.close()
							that.$store.commit('username',that.newUsername)
						}else{
							uni.showToast({
								title: '用户名已存在',
								icon:'none',
								duration: 2000
							});
						}
					}
				})
			},
			setPassword(){
				let that = this
				wx.request({
					url: this.url+'/users/change_password?user_name='+this.userInfo.username+'&&user_password='+md5(this.originalPassword)+'&&user_password_new='+md5(this.newPassword),
					header: {
						'Content-Type': 'application/json'
					},				
					success: function(res) {
						if(res.data.code===0){
							uni.showToast({
								title: '修改成功',
								icon:'none',
								duration: 2000
							});
							that.close()
						}else{
							uni.showToast({
								title: '修改失败',
								icon:'none',
								duration: 2000
							});
						}
					}
				})
			},
			
			changeUsername(){
				this.changeusername=true
			},
			changeSexual(){
				this.changesexual=true
			},
			changeBirthday(){
				this.changebirthday=true
			},	
			changePassword(){
				this.changepassword=true
			},	
			close(){
				this.changebirthday=false
				this.changesexual=false
				this.changeusername=false
				this.changepassword=false
			},
			exit(){
				this.$store.commit('userInfo', {
						username:"点击登录",
						avatar:"../../../static/icon/未登录.svg",
						birthday:"2000-1-1",
						sexual:"男",
						score:"0",
						accounts:[],
					})
				this.$store.commit('login')
				wx.navigateBack({ changed: true })
			}
		}
	}
</script>

<style>
	body{
		background-color: #c4e0ec;
	}
	.avatar{
		background-color: #eef9ff;
		margin-left: 5vw;
		width: 90vw;
		height: 10vh;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2vh;
		border-radius: 20px;
	}
	image{
		width: 8vh;
		height: 8vh;
		border-radius:4vh; 
		margin-right: 5vw;
	}
	.font_left{
		margin-left:2vh;
		font-size: 2.5vh; 
		color: #082f40;
	}
	.font_right{
		margin-right:1vh;
		font-size: 2.2vh;
		color: #6e7f87  ;
	}
	.accInfo{
		margin-left: 5vw;
		border-radius: 20px;
		width: 90vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #eef9ff;
		margin-bottom: 2vh;
	}
	.Info{
		width: 90vw;
		height: 7vh;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.btn{
		display: flex;
		align-items: center;
	}
	.divLine{
	 background: #b0ccda;
	 width: 90%;
	 height: 1px;
	}
	.id{
		display: flex;
		justify-content:space-between ;
		align-items: center;
		height: 7vh;
		width: 90vw;
	}
	.mask1{
		width: 100vw;
		height: 100vh;
		position: fixed;
		z-index: 1;
		background-color: rgba(0,0,0,0.5);
	}
	.changeUsername{
		position: fixed;
		z-index: 2;
		top: 35vh;
		left: 10vw;
		height: 15vh;
		width: 80vw;
		background-color: #FFFFFF;
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.changeSexual{
		position: fixed;
		z-index: 2;
		bottom: 0;
		width: 100vw;
		height: 30vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #FFFFFF;
		border-radius: 20px 20px 0px 0px;
	}
	.changeBirthday{
		position: fixed;
		z-index: 2;
		bottom: 0;
		width: 100vw;
		height: 40vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #FFFFFF;
		border-radius: 20px 20px 0px 0px;
	}
	.top{
		height: 7vh;
		width: 100vw;
		font-size: 2vh;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.input_username{
		height: 10vw;
		width: 75vw;
		font-size: 2.3vh;
	}
	.sexualPicker{
		height: 20vh;
		width: 100vw;
	}
	.birthdayPicker{
		height: 30vh;
		width: 100vw;
	}
	picker-view-column{
		line-height: 3vh; 
		text-align: center;
	}
	.exit{
		position: absolute;
		display: flex;
		width: 100vw;
		justify-content: center;
		align-items: center;
		bottom: calc(env(safe-area-inset-bottom));
	}
	

</style>
