<template>
	<view>
		<!-- 顶部栏 -->
		<view class="topBar" :style="{top:menuButton_top,height:menuButton_height}">
			<image class="catalogueBtn" src="../static/icon/catalogue.png" @tap="showCata()"></image>
			<image class="plusBtn" src="../static/icon/plus.png" @tap="createHabit"></image>			
		</view>
		<!-- 侧边栏菜单 -->
		<view v-if="showCatalogue" @tap="closeCata" class="mask">
		</view>			
		<view class="catalogue" v-if="showCatalogue">
			<view style="width: 100%; height:15%;"></view>
			<view>目录</view>
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
				<input class="input_habit"  v-model="habitName"  :disabled='disableInput' />
			</view>
			<!-- 习惯每阶段的内容 -->
			<view v-for="(step,index) in steps">
				<view class="steps">
					<view class="stepNumber">
						<view style="font-size: 3vh;height: 3.5vh;">{{numbers[index]}}</view>
						<view style="color: #bfbfbf; font-size: 1.5vh;">阶段</view>
					</view>
					<view class="contentAndTime">
							<input class="input_stepContent" placeholder="完成内容" v-model="steps[index].content" :disabled='disableInput' />
							<view class="divLine2"></view>
							<view class="stepTime" @tap="chooseStepTime(index)">
								<view>阶段天数</view>
								<text decode style="margin-left: 5vw; border-bottom: 1px solid #bfbfbf;">第&emsp;{{step.begin}}&emsp;~&emsp;{{step.end}}&emsp;天</text>
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
					<picker-view class="timePicker" @change="chooseTime">
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
			<!-- 添加阶段按钮 -->
			<image src="../static/icon/plus1.png" class="addStep" @tap="addStep" v-if="(steps.length<5)&&steps[steps.length-1].end!=100"></image>
			</view>
		</view>

		
	</view>
</template>

<script>
	export default {
		name:"TopBar",
		data() {
			return {
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
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.menuButton_top = menuButtonInfo.top+"px"
			this.menuButton_height = menuButtonInfo.height+"px"
			console.log(this.menuButton_height)
		},
		methods:{
			showCata(){
				this.showCatalogue=true
			},
			closeCata(){
				this.showCatalogue=false
			},
			createHabit(){
				this.creatingHabit=true
				this.steps=[{"content":"","begin":1,"end":5,"show":false}]
			},
			closeCreate(){
				this.creatingHabit=false
				console.log(1)
			},
			addStep(){
				this.steps.push({"content":"","begin":0,"end":0,"show":false})
				this.steps[this.steps.length-1].begin=this.steps[this.steps.length-2].end+1
				this.steps[this.steps.length-1].end=this.steps[this.steps.length-1].begin
			},
			closePicker(index){
				this.steps[index].show=false	
				this.disableInput=false
			},
			chooseStepTime(index){
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
				if(this.steps[this.steps.length-1].end!=100){
					uni.showToast({
						title: '请将最后一个阶段的结束天数设置为100',
						icon:'none',
						duration: 2000
					});
				}else{
					this.closeCreate()
					console.log(this.steps)
				}
			}
		}
	}
</script>

<style>
	.habitName{
		font-size: 2.2vh; 
		height: 50px;
		display: flex; 
		flex-direction: column;
		align-items: center; 
		flex: 1
	}
	.input_habit{
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
		width: 61.8vw;
		background-color: #fdfcf9;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.mask{
		position: fixed;
		z-index: 11;
		height: 100vh;
		width: 100vw;
		background-color: rgba(0,0,0,0.5);
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
		margin: 2vh 0 4vh calc(50vw - 2.5vh);
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

</style>