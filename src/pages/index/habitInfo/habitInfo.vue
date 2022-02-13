<template>
	<view>
		<BottomNavigation></BottomNavigation>
		<editHabit ref="edit"></editHabit>
		<view class="steps">
			<view class="step" v-for="(step,index) in currentHabit.steps">
				<view style="display: flex;">
					<view class="order">{{numbers[index]}}</view>
					<view class="stepContent">
						<view class="contents">{{step.content}}</view>
						<view class="status">{{
								currentHabit.days>=step.begin && currentHabit.days<=step.end
								? "进行中"
								: currentHabit.days>=step.end
								? "已完成"
								: "未完成"
						}}</view>
					</view>
				</view>
				<view style="display: flex; align-items: center;">
					<view class="verticalLine"></view>
					<view class="day">Day{{step.begin}}-{{step.end}}</view>
				</view>
			</view>
			
			<view class="rate">
				<view class="content left">完成进度</view>
				<view class="progress">
					<view class="progressBar" :style="{ 'width':daysWidth + 'px'}"></view>
					<view class="finishedBar" :style="{'width':daysWidth * currentHabit.days / 100 + 'px'}"></view>
					<view class="days" >{{currentHabit.days}}/100</view>
				</view>
				<view class="date" :style="{ 'width':daysWidth + 'px'}">
					<view>{{currentHabit.beginDate}}</view>
					<view>{{currentHabit.finishDate}}</view>
				</view>
			</view>
			
			<view class="bottomIcon">
				<view class="icons">
					<image class="image" src="../../../static/icon/edit.svg" @tap="editHabit"></image>
					<image class="image"  style="margin-left: 5vw;" src="../../../static/icon/calendar.svg"></image>
					
				</view>
				<view>
					<image class="image" style="margin-right: 5vw;" src="../../../static/icon/reset.svg"></image>
					<image class="image" src="../../../static/icon/delete.svg"></image>
				</view>
			</view>
			
		</view>
		
		
		
	</view>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
	import BottomNavigation from '../../../components/BottomNavigation.vue';
	import editHabit from '../../../components/editHabit.vue';
	export default {
		data() {
			return {
				numbers:["Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ"],
				daysWidth:0,
				
			}
		},
		onLoad(){
			wx.setNavigationBarTitle({title: this.currentHabit.name})
		},
		computed: {
		    ...mapState(['currentHabit','editingHabit']),
		},
		created(){
			var that = this
			var obj=wx.createSelectorQuery();
			obj.selectAll('.days').boundingClientRect();
			obj.exec(function (rect) {
				that.daysWidth = wx.getSystemInfoSync().windowWidth*0.78-rect[0][0].width
			}) ;
			
		},
		methods: {
			editHabit(){
				this.$store.commit('editing')
				this.$children[1].refresh()
			},
		},
		components:{
			editHabit,
			BottomNavigation
		}
	}
</script>

<style>
	body{
		background-color: #91bfd7;
	}
	.steps{
		position: fixed;
		left: 5vw;
		top: 3vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.step{
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 20px;
		margin-bottom: 3vh;
		height: 10vh;
		width: 90vw;
		background-color: #d2f3fc;
	}
	.order{
		font-size: 3.5vh;
		margin-top: 0.5vh;
		margin-left: 5vw;
		margin-right: 5vw;
		color: #1a3f5c;
	}
	.stepContent{
		display: flex;
		flex-direction: column;
	}
	.contents{
		height: 3vh;
		font-size: 2.4vh;
		color: #1a3f5c;
	}
	.status{
		font-size: 2vh;
		color: #84b4ca;
	}
	.verticalLine{
		width: 2px;
		height: 6vh;
		background-color: #84b4ca;
	}
	.day{
		font-size: 2.2vh;
		margin-left: 5vw;
		margin-right: 5vw;
		width: 12vh;
		color: #1a3f5a;
	}
	
	
	.rate{
		padding: 1vh 0 2vh 0;
		width: 90vw;
		border-radius: 20px;
		background-color: #d2f3fc;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 3vh;
	}
	.content{
		width: 30vw; 
		font-size: 2.2vh;
		color: #649cb7;
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
		right: 5vw;
		font-size: 2.5vh;
		transform: translate(0,-0.9vh);
		color: #2a4e68;
	}
	.date{
		display: flex;
		justify-content: space-between;
		align-self: flex-start;
		text-align:left; 
		margin-left: 5vw;
		margin-top: 0.5vh;
		font-size: 1.4vh;
		color:#649cb7 ;
		margin-bottom: 1vh;
	}
	.bottomIcon{
		display: flex;
		justify-content: space-between;
		width: 90vw;
	}
	.icons{
		display: flex;
	}
	.image{
		height: 6vh;
		width: 6vh;
	}

</style>
