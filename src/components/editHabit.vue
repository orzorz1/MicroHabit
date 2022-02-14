<template>
	<view>
		<!-- 编辑习惯弹窗 -->
		<view v-if="editingHabit" class="mask">
		</view>
		<view v-if="editingHabit" class="createHabit">
			<view class="createHabitTitle">
				<view style="font-size: 2.3vh;margin-left: 5vw;">编辑习惯</view>
				<view>
					<image src="../static/icon/no.svg" style="width: 4vh;height: 4vh;margin-right: 5vw;margin-top:0.5vh" @tap="closeEdit"></image>
					<image src="../static/icon/yes.svg" style="width: 4vh;height: 4vh;margin-right: 5vw;margin-top:0.5vh" @tap="saveEdit"></image>
				</view>
			</view>
			
			<view class="stepsBox">
				<!-- 习惯名称输入框 -->
				<view class="steps1">
					<view class="habitName">
						<view style="width: 10vw; margin-top:2.5vh ;">习惯</view>
						<view style="width: 10vw;">名称</view>
					</view>
					<input class="input_habit"  v-model="Info.name"  :disabled='disableInput' />
				</view>
				<!-- 习惯每阶段的内容 -->
				<view v-for="(step,index) in Info.steps">
					<view class="steps1">
						<view class="stepNumber">
							<view style="font-size: 3vh;height: 3.5vh;">{{numbers[index]}}</view>
							<view style="color: #bfbfbf; font-size: 1.5vh;">阶段</view>
						</view>
						<view class="contentAndTime">
								<input class="input_stepContent" placeholder="完成内容" v-model="Info.steps[index].content" :disabled='disableInput' />
								<view class="divLine2"></view>
								<view class="stepTime">
									<view>阶段天数</view>
									<text decode style="margin-left: 5vw; border-bottom: 1px solid #bfbfbf;" @tap="chooseStepTime(index)">第&emsp;{{step.begin}}&emsp;~&emsp;{{step.end}}&emsp;天</text>
								</view>
						</view>
					</view>
					<!-- 选择每阶段的时间 -->
					<view class="pickTime" v-if="Info.steps[index].show">
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
				<!-- 添加、删除阶段按钮 -->
				<view class="button">
					<image src="../static/icon/删除.svg" class="addStep" @tap="deleteStep" v-if="Info.steps.length!=1"></image>
					<image src="../static/icon/添加.svg" class="addStep" @tap="addStep" v-if="(Info.steps.length<5)&&Info.steps[Info.steps.length-1].end!=100"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
	export default {
		name:"editHabit",
		computed: {
		    ...mapState(['currentHabit','editingHabit']),
		},
		data() {
			return {
				Info:{},
				numbers:["Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ"],
				disableInput:false,
				begin:0,
				beginToEnd:[],
				end:2,
			};
		},
		created() {
			this.refresh()
		},
		methods:{
			refresh(){
				this.Info = JSON.parse(JSON.stringify(this.currentHabit))  //深度克隆
				for(let i=0;i<this.Info.steps.length;i++){
					this.Info.steps[i].show = false
				}
			},
			closeEdit(){
				this.$store.commit('editing')
			},
			saveEdit(){
				if(this.Info.steps[this.Info.steps.length-1].end!=100){
					uni.showToast({
						title: '请将最后一个阶段的结束天数设置为100',
						icon:'none',
						duration: 2000
					});
				}else{
					this.closeEdit()
					this.$store.commit('edit',this.Info)
				}
			},
			addStep(){
				this.Info.steps.push({"content":"","begin":0,"end":0,"show":false})
				this.Info.steps[this.Info.steps.length-1].begin=this.Info.steps[this.Info.steps.length-2].end+1
				this.Info.steps[this.Info.steps.length-1].end=this.Info.steps[this.Info.steps.length-1].begin
			},
			deleteStep(){
				this.Info.steps.pop()
			},
			closePicker(index){
				this.Info.steps[index].show=false	
				this.disableInput=false
			},
			chooseStepTime(index){
				if(this.disableInput===false){
					this.disableInput=true
					this.Info.steps[index].show=true
					this.end=this.Info.steps[index].begin
					if(index===0){
						this.Info.steps[index].begin=1
					}
					else{
						this.Info.steps[index].begin=this.Info.steps[index-1].end+1
					}
					this.begin=this.Info.steps[index].begin
					this.beginToEnd=[]
					for(let i=this.Info.steps[index].begin;i<=100;i++){
						this.beginToEnd.push(i)
					}
				}
			},
			chooseTime(e){
				let val = e.detail.value
				this.end=val[2]+this.begin
			},
			setTime(index){
				this.Info.steps[index].end=this.end
				this.closePicker(index)
				for(let i=index;i<=5;i++){
					if(this.Info.steps[i+1]){
						this.Info.steps[i+1].begin=this.Info.steps[i].end+1
						if(this.Info.steps[i+1].begin>=this.Info.steps[i+1].end){
							this.Info.steps[i+1].end=this.Info.steps[i+1].begin
						}
					}
				}
				for(let j=0;j<=this.Info.steps.length;j++){
					for(let i=0;i<this.Info.steps.length;i++){
						if((this.Info.steps[i].end!=this.Info.steps[i].begin)&&(this.Info.steps[i].end===100)){
							if(this.Info.steps[i+1]){
								this.Info.steps.pop()
							}
						}
						else if(this.Info.steps[i].end>100){
							this.Info.steps.pop()
						}
					}
				}				
			},

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
	.mask{
		position: fixed;
		z-index: 11;
		height: 100vh;
		width: 100vw;
		background-color: rgba(0,0,0,0.5);
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
		 top: 20vh;
		 padding-bottom: 3vh;
	}
	.steps1{
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
