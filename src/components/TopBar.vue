<template>
	<view>
		<!-- 顶部栏 -->
		<view class="topBar" :style="{top:menuButton_top,height:menuButton_height}">
<!-- 			<image class="catalogueBtn" src="../static/icon/catalogue.png" @tap="showCata()"></image>   暂时关闭了侧边菜单功能
 -->			<image class="plusBtn" src="../static/icon/plus.png" @tap="createHabit"></image>			
		</view>
		<!-- 侧边栏菜单 -->
		<view v-if="showCatalogue" @tap="closeCata" class="mask">
		</view>			
		<view class="catalogue" v-if="showCatalogue">
			<view class="accountInfo">
				<image class="avatar" :src="userInfo.avatar"></image>
				<view class="username">
					<view>{{userInfo.username}}</view>
					<view style="font-size: 1.5vh;">{{userInfo.score}}</view>
				</view>
			</view>
			<view class="cata">
				<view class="item" v-for="(item,index) in catalogue">
					<image class="icon" :src="item.icon"></image>
					<view style="font-size: 2.2vh; color: #36556a;">{{item.name}}</view>
				</view>
			</view>
		</view>
		<!-- 创建习惯弹窗 -->
		<view v-if="creatingHabit" class="mask">
		</view>
		<view v-if="creatingHabit" class="createHabit">
			<view class="createHabitTitle">
				<view style="font-size: 2.3vh;margin-left: 5vw;">添加新习惯</view>
				<view>
					<image src="../static/icon/no.svg" style="width: 4vh;height: 4vh;margin-right: 5vw;margin-top:0.5vh" @tap="closeCreate"></image>
					<image src="../static/icon/yes.svg" style="width: 4vh;height: 4vh;margin-right: 5vw;margin-top:0.5vh" @tap="addHabit"></image>
				</view>
			</view>
			
			<view class="stepsBox">
			<!-- 习惯名称输入框 -->
			<view class="steps">
				<view class="habitName">
					<view style="width: 10vw; margin-top:2.5vh ;">习惯</view>
					<view style="width: 10vw;">名称</view>
				</view>
				<input class="input_habit"  v-model="habitName" maxlength="10" :disabled='disableInput' />
			</view>
			<!-- 习惯每阶段的内容 -->
			<view v-for="(step,index) in steps">
				<view class="steps">
					<view class="stepNumber">
						<view style="font-size: 3vh;height: 3.5vh;">{{numbers[index]}}</view>
						<view style="color: #bfbfbf; font-size: 1.5vh;">阶段</view>
					</view>
					<view class="contentAndTime">
							<input class="input_stepContent" placeholder="完成内容" maxlength="14" v-model="steps[index].content" :disabled='disableInput' />
							<view class="divLine2"></view>
							<view class="stepTime">
								<view>阶段天数</view>
								<text decode style="margin-left: 5vw; border-bottom: 1px solid #bfbfbf;" @tap="chooseStepTime(index)">第&emsp;{{step.begin}}&emsp;~&emsp;{{step.end}}&emsp;天</text>
							</view>
					</view>
				</view>
				<!-- 选择每阶段的时间 -->
				<view class="pickTime" v-if="steps[index].show">
					<view class="createHabitTitle" style="width:70vw;height:5vh">
						<view style="font-size: 2.2vh;margin-left: 5vw;">调整阶段天数</view>
						<view>
							<image src="../static/icon/no.svg" style="width: 3vh;height: 3vh;margin-right: 3vw; margin-top:1vh" @tap="closePicker(index)"></image>
							<image src="../static/icon/yes.svg" style="width: 3vh;height: 3vh;margin-right: 3vw; margin-top:1vh" @tap="setTime(index)"></image>
						</view>
					</view>
					<picker-view class="timePicker" immediate-change=true @change="chooseTime">
						<picker-view-column style="left: 12vw; font-size: 2vh;">
							<view >第{{begin}}天</view>
						</picker-view-column>
						<picker-view-column style="left: 10vw;font-size: 2vh;">
							<view>~</view>
						</picker-view-column>
						<picker-view-column style="font-size: 2vh;">
							<view v-for="ends in beginToEnd">第{{ends}}天</view>
						</picker-view-column>
					</picker-view>
				</view>
			</view>
			<!-- 添加、删除阶段按钮 -->
			<view class="button">
				<image src="../static/icon/add.svg" class="addStep" @tap="addStep" v-if="(steps.length<5)&&steps[steps.length-1].end!=100"></image>
				<image src="../static/icon/del.svg" class="addStep" @tap="deleteStep" v-if="steps.length!=1"></image>
			</view>
			</view>
		</view>

		
	</view>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
	export default {
		name:"TopBar",
		data() {
			return {
				catalogue:[
					{name:"未完成习惯",icon:"../static/icon/finished.svg"},
					{name:"已完成习惯",icon:"../static/icon/finished.svg"},
					{name:"我的习惯",icon:"../static/icon/myHabits.svg"},
				],
				menuButton_top:"4vh",
				menuButton_height:"30px",
				showCatalogue:false,
				creatingHabit:false,
				disableInput:false,
				habitName:"",
				numbers:["Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ"],
				steps:[
					{"content":"","begin":1,"end":5,"show":false},
				],
				begin:0,
				beginToEnd:[],
				end:2,
			};
		},
		created() {
			//获取小程序胶囊按钮的位置和大小，并把菜单和添加习惯按钮设置成与之同高度、同大小
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.menuButton_top = menuButtonInfo.top+"px"
			this.menuButton_height = menuButtonInfo.height+"px"
		},
		computed: {
		    ...mapState(['userInfo','hasLogin','url']),
		},
		methods:{
			showCata(){
				this.showCatalogue=true
			},
			closeCata(){
				this.showCatalogue=false
			},
			createHabit(){
				if(this.hasLogin===false){
					uni.showToast({
						title: '请先登录',
						icon:'none',
						duration: 2000
					});
				}else{
				this.creatingHabit=true
				this.steps=[{"content":"","begin":1,"end":5,"show":false}]
				this.habitName=''
				}
			},
			closeCreate(){
				this.creatingHabit=false
			},
			addStep(){
				this.steps.push({"content":"","begin":0,"end":0,"show":false})
				this.steps[this.steps.length-1].begin=this.steps[this.steps.length-2].end+1
				this.steps[this.steps.length-1].end=this.steps[this.steps.length-1].begin
			},
			deleteStep(){
				this.steps.pop()
			},
			closePicker(index){
				this.steps[index].show=false	
				this.disableInput=false
			},
			chooseStepTime(index){
				if(this.disableInput===false){
					this.disableInput=true
					this.steps[index].show=true
					this.end=this.steps[index].begin
					if(index===0){
						this.steps[index].begin=1
					}
					else{
						this.steps[index].begin=this.steps[index-1].end+1
					}
					this.begin=this.steps[index].begin
					this.beginToEnd=[]
					for(let i=this.steps[index].begin;i<=100;i++){
						this.beginToEnd.push(i)
					}
				}
			},
			chooseTime(e){
				let val = e.detail.value
				this.end=val[2]+this.begin
				
			},
			setTime(index){
				this.steps[index].end=this.end
				this.closePicker(index)
				for(let i=index;i<=5;i++){
					if(this.steps[i+1]){
						this.steps[i+1].begin=this.steps[i].end+1
						if(this.steps[i+1].begin>=this.steps[i+1].end){
							this.steps[i+1].end=this.steps[i+1].begin
						}
					}
				}
				for(let j=0;j<=this.steps.length;j++){
					for(let i=0;i<this.steps.length;i++){
						if((this.steps[i].end!=this.steps[i].begin)&&(this.steps[i].end===100)){
							if(this.steps[i+1]){
								this.steps.pop()
							}
						}
						else if(this.steps[i].end>100){
							this.steps.pop()
						}
					}
				}				
			},
			addHabit(){
				if(this.habitName===""){
					uni.showToast({
						title: '习惯名不能为空',
						icon:'none',
						duration: 2000
					});
					return
				}
				let that = this
				let states = []
				for(let i=0;i<this.steps.length;i++){
					let dic = {}
					dic.content = this.steps[i].content
					dic.start_day = this.steps[i].begin
					dic.end_day = this.steps[i].end
					states.push(dic)
				}
				if(this.steps[this.steps.length-1].end!=100){
					uni.showToast({
						title: '请将最后一个阶段的结束天数设置为100',
						icon:'none',
						duration: 2000
					});
				}else{
					//创建习惯
					wx.request({
						url: this.url+'/habits/create?user_name='+this.userInfo.username+'&&habit_name='+this.habitName+'&&start_date=0000-00-00',
						header: {
							'Content-Type': 'application/json'
						},
						success: function(res) {
							if(res.data.code===0){
								let id = res.data.habit_id
								//创建阶段
								wx.request({ 
									url: that.url+"/state/create", 
									header: { 
										"Content-Type": "application/json;charset=UTF-8",
										
									}, 
									method: "POST", 
									data:JSON.stringify({
									      "habit_id": id,
									      "states": states,
									      }),
									complete: function( res ) { 
										console.log(res)
										if(res.data.code===0){
											uni.showToast({
												title: '创建成功',
												icon:'none',
												duration: 2000
											});
											that.closeCreate()
											uni.redirectTo({
												url: '/pages/index/habit/habit',
											});
											
										}else{ 
											// 如果创建阶段失败删除该习惯
											wx.request({
												url: that.url+'/habits/delete?habit_id='+id,
												header: {
													'Content-Type': 'application/json'
												},				
												success: function(res) {
												}
											})
											uni.showToast({
												title: '创建失败，请稍后再试',
												icon:'none',
												duration: 2000
											});
										} 
									} 
								}) 
							}else{
								uni.showToast({
									title: '创建失败，请稍后再试',
									icon:'none',
									duration: 2000
								});
							}
						}
					})
				}
			},
		}
	}
</script>

<style>
	input{
		height: 2.8vh;
	}
	.habitName{
		font-size: 2.2vh; 
		height: 50px;
		display: flex; 
		flex-direction: column;
		align-items: center; 
		flex: 1
	}
	.input_habit{
		font-size: 2.5vh;
		width: 100vw; 
		border-bottom: 1px solid #bfbfbf;
		margin-right:5vw ;
		flex: 4;
	}
	.topBar{
		z-index: 10;
		position: fixed;
		width: 100%;
		display: flex;
		align-items: center;
	}
	.catalogue{
		transition: 10s;
		font-size: x-large;
		z-index: 12;
		position: fixed;
		left: 0px;
		height: 100vh;
		width: 45vw;
		background-color: #b6dff1;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 0px 20px 20px 0px;
	}
	.accountInfo{
		height: 16.5vh;
		width: 100%;
		border-radius: 0px 20px 0px 20px;
		background-image: linear-gradient(to right,#a4cdeb,#628ebb);
		
	}
	.avatar{
		margin-top:6vh ;
		margin-left: 5vw;
		width: 6vh;
		height: 6vh;
		border-radius:3vh;
		position:absolute
	}
	.username{
		position: absolute;
		display: flex;
		flex-direction: column;
		margin-top:6.5vh ;
		margin-left: calc(6vh + 7vw);
		font-size: 2.2vh;
		color: #36556a;
	}
	.mask{
		position: fixed;
		z-index: 11;
		height: 100vh;
		width: 100vw;
		background-color: rgba(0,0,0,0.5);
	}
	.cata{
		position: fixed;
		left: 0;
		top: 17vh;
		display: flex;
		flex-direction: column;
	}
	.item{
		margin-left: 4vw;
		margin-top: 2vh;
		display: flex;
		align-items: center;
	}
	.icon{
		height: 3vh;
		width: 3vh;
		margin-right: 2vw;
	}
	.catalogueBtn{
		height: 30px;
		width: 30px;
		margin-left:15px;
	}
	.plusBtn{
		height: 30px;
		width: 30px;
		margin-left: 15px;
	}
	.createHabit{
		position: fixed;
		z-index: 12;
		bottom: 0px;
		width: 100vw;
		height: 75vh;
		background-color: #d2f3fc;
		border-radius: 20px 20px 0px 0px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.createHabitTitle{
		color:#FFFFFF;
		border-radius: 20px 20px 0px 0px;
		height: 7vh;
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #416f91;
	}	
	.stepsBox{
		 -webkit-overflow-scrolling: touch; 
		 overflow-x: scroll; 
		 flex: 5; 
		 padding-bottom: 3vh;
	}
	.steps{
		height: 10vh;
		width: 100vw;
		display: flex;
		align-items: center;
	}
	.stepNumber{
		flex: 1;
		margin-top: 2vh;
		text-align: end;
		margin-right: 5vw;
	}
	.contentAndTime{
		flex:6 ;
		display: flex;
		flex-direction: column;
		
	}
	.input_stepContent{
		margin-top: 2vh;
		font-size: 2.2vh;
	}
	.divLine2{
		border-bottom: 1px solid #bfbfbf;
		margin-right: 5vw;
	}
	.stepTime{
		display: flex;
		align-items: center;
		font-size: 2.2vh;
		margin-top: 1vh;
	}

	.addStep{
		width: 5vh;
		height: 5vh;
		text-align: center;
		margin-right: 3vw;
	}

	.top{
		height: 7vh;
		width: 70vw;
		font-size: 2vh;
		z-index: 15;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color:#FFFFFF;
		background-color: #416f91;
		border-radius: 20px 20px 0px 0px;
		
	}
	.pickTime{
		position: fixed;
		z-index: 12;
		bottom: 30vh;
		left:15vw;
		width: 70vw;
		height:25vh;
		background-color:#FFFFFF;
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.timePicker{
		margin-top: 1vh;
		height: 15vh;
		width: 70vw;
		
	}
	.button{
		display: flex;
		flex-direction: row-reverse;
		padding-right: 2vw;
	}
</style>