<template>
	<view>
		<view class="habits">
			<view class="habit" v-for="habit in habits">
				<view class="title">{{habit.name}}</view>
				<view class="horizontalLine"></view>
				<view class="step" v-for="step in habit.steps">
					<view class="content" style="text-align:right;">Day{{step.begin}}-{{step.end}}</view>
					<view class="verticalLine"></view>
					<view class="content" style="text-align:left;">{{step.content}}</view>
				</view>
				<view class="content left">打卡天数</view>
				<view class="progress">
					<view class="progressBar" :style="{ 'width':daysWidth + 'px'}"></view>
					<view class="finishedBar" :style="{'width':daysWidth * habit.days / 100 + 'px'}"></view>
					<view class="days" >{{habit.days}}/100</view>
				</view>
				<view class="date" :style="{ 'width':daysWidth + 'px'}">
					<view>{{habit.beginDate}}</view>
					<view>{{habit.finishDate}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				habits:[
					{name:"英语微习惯",
					steps:[
						{"begin":1,"end":50,"content":"背6个单词"},
						{"begin":51,"end":70,"content":"背9个单词"},
						{"begin":71,"end":100,"content":"背15个单词"},
					],
					beginDate:"2022/01/01",
					finishDate:"2022/01/31",
					days:52},
				],
				daysWidth:0,
			}
		},
		computed: {
		    ...mapState(['url','userInfo']),
		},
		created(){
			var that = this
			
			wx.request({
				url: that.url+'/habits/select/trained?user_name='+that.userInfo.name,
				header: {
					'Content-Type': 'application/json'
				},				
				success: function(res) {
					if(res.data.code===0){
						for(let i=0;i<res.data.habits.length;i++){
							let habit = {}
							habit.id = res.data.habits[i].id
							habit.name = res.data.habits[i].name
							habit.steps = []
							habit.beginDate = res.data.habits[i].start_date
							habit.days = res.data.habits[i].check_days
							wx.request({
								url: this.url+'/state/select?habit_id='+habit.id,
								header: {
									'Content-Type': 'application/json'
								},				
								success: function(res) {
									if(res.data.code===0){
										for(let j=0;j<res.data.states.length;j++){
											let state = {}
											state.begin = res.data.states[j].start_day
											state.end = res.data.states[j].end_day
											state.id = res.data.states[j].id
											state.content = res.data.states[j].content
											habit.steps.push(state)
										}
									}
								}
							})
							that.habits.push(habit)
						}
					}
				}
			})
			var obj=wx.createSelectorQuery();
			obj.selectAll('.days').boundingClientRect();
			obj.exec(function (rect) {
				that.daysWidth = wx.getSystemInfoSync().windowWidth*0.78-rect[0][0].width
			}) ;
		},
		methods: {
		}
	}
</script>

<style>
	body{
		background-color: #91bfd7;
	}
	.habits{
		width: 100vw;
		height: 80vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: fixed;
		top: 20vh;
		-webkit-overflow-scrolling: touch;
		overflow-x: scroll;
		justify-content: flex-start;
	}
	.habit{
		width: 90vw;
		border-radius: 20px;
		background-color: #d2f3fc;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 3vh;
	}
	.title{
		align-self: flex-start;
		margin-left: 5vw;
		margin-top: 1vh;
		height: 4vh;
		font-size: 2.5vh;
		color: #1b405b;
	}
	.horizontalLine{
		height: 2px;
		background-color: #6ea7c4;
		width: 80vw;
		margin-bottom: 1vh;
	}
	.verticalLine{
		background-color: #84b4ca;
		margin-left: 3vw;
		margin-right: 3vw;
		width: 2px;
		height: 3vh;
	}
	.step{
		display: flex;
		justify-content: center;
		height: 3vh;
	}
	.content{
		width: 30vw; 
		font-size: 1.8vh;
		color: #678496;
	}
	.left{
		 align-self: flex-start; 
		 text-align:left; 
		 margin-left: 5vw;
		 margin-top: 1.5vh;
	}
	.progress{
		height: 2vh;
		width: 80vw;
	}
	.progressBar{
		position: absolute;
		height: 1vh;
		border-radius: 0.5vh;
		background-color: #fbfa9d;
		margin-top: 1vh;
	}
	.finishedBar{
		position: absolute;
		height: 1vh;
		border-radius: 0.5vh;
		background-color: #649ab6;
		margin-top: 1vh;
	}
	.days{
		position: absolute;
		right: 10vw;
		font-size: 2.5vh;
		transform: translate(0,-0.9vh);
	}
	.date{
		display: flex;
		justify-content: space-between;
		align-self: flex-start;
		text-align:left; 
		margin-left: 5vw;
		margin-top: 0.5vh;
		font-size: 1.4vh;
		color:#527185 ;
		margin-bottom: 1vh;
	}
</style>
