<template>
	<view>
		<view style="position: absolute;">
			<view class="switchList">
				<!-- 年、月、总榜单选项 -->
				<view class="lists" style="margin-left: 5vw;" @tap="displayMonthLi">
					<view class="listsFont" :style="{color:Display_monthLi?'#242424':''}">月榜</view>
					<view class="bottomLine" v-if="Display_monthLi"></view>
				</view>
				<view class="verticalLine"></view>
				<view class="lists"  @tap="displayYearLi">
					<view class="listsFont" :style="{color:Display_yearLi?'#242424':''}">年榜</view>
					<view class="bottomLine" v-if="Display_yearLi"></view>
					
				</view>
				<view class="verticalLine"></view>
				<view class="lists"  style="margin-right: 5vw;" @tap="displayTotalLi">
					<view class="listsFont" :style="{color:Display_totalLi?'#242424':''}">总榜</view>
					<view class="bottomLine" v-if="Display_totalLi"></view>
				</view>
			</view>
			<!-- 榜单内容 -->
			<view v-for="(item,index) in list" class="listInfo">	
				<view style="display: flex;align-items: center;">
					<image src="../../../../static/icon/crown.png" style="width: 4vh;height: 4vh;margin-left: 5vw;"v-if="(index<=2)"></image>
					<view class="rank" :style="{color: (index<=2)?'#FFFFFF':'',margin: (index<=2)?'0.5vh 0 0 7.5vw':''}">{{index+1}}</view>
					<view class="list_username">{{item.username}}</view>
					<view class="list_finished">{{item.finishedHabit}}个习惯</view>
					<view class="list_clocked">{{item.clockedTimes}}次打卡</view>
					
				</view>
				<view class="divLine1" v-if="(index!=0)"></view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Display_monthLi:false,
				Display_yearLi:true,
				Display_totalLi:false,
				list:[
				{"username":"别人家的孩子","finishedHabit":999,"clockedTimes":99999},
				{"username":"隔壁老王","finishedHabit":5,"clockedTimes":400},
				{"username":"张三","finishedHabit":5,"clockedTimes":400},
				{"username":"嘉然","finishedHabit":5,"clockedTimes":400},
				{"username":"向晚","finishedHabit":5,"clockedTimes":400},
				{"username":"乃琳","finishedHabit":5,"clockedTimes":400},
				{"username":"贝拉","finishedHabit":5,"clockedTimes":400},
				{"username":"珈乐","finishedHabit":5,"clockedTimes":400},
				{"username":"别人家的孩子","finishedHabit":5,"clockedTimes":400},
				{"username":"别人家的孩子","finishedHabit":5,"clockedTimes":400},
				],
				
			}
		},
		methods: {
			displayMonthLi(){
				this.Display_monthLi=true
				this.Display_yearLi=false
				this.Display_totalLi=false
			},
			displayYearLi(){
				this.Display_monthLi=false
				this.Display_yearLi=true
				this.Display_totalLi=false
			},
			displayTotalLi(){
				this.Display_monthLi=false
				this.Display_yearLi=false
				this.Display_totalLi=true
			}	
		}
	}
</script>

<style>
	body{
		background-color: #c4e0ec;
	}
	.switchList{
		height:6vh;
		width: 100vw;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #eef9ff;
		margin-bottom: 3vw;
	}
	.lists{
		height: 6vh;
		color: #6c6f70;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
	}
	.listsFont{
		margin-top: 1.5vh;
		font-size: 2.2vh;
		font-weight: 600;
		color: #6c6f70;
	}
	.verticalLine{
		height: 3vh;
		width: 1px;
		background-color: #bfbfbf;
	}
	.bottomLine{
		background-color: #383b3c;
		height: 3px;
		width: 8vw;
	}
	.listInfo{
		width: 100vw;
		height: 7vh;
		background-color: #eef9ff;
		display: flex;
	}
	.divLine1{
	 background: #bfbfbf;
	 margin-left: 5vw;
	 width: 90vw;
	 height: 1px;
	 position: absolute;
	 z-index: 5;
	}
	.rank{
		position: absolute;
		z-index: 3;
		font-size: 2.5vh;
		margin-left: 7.2vw;
		font-weight: 500;
	}
	.list_username{
		position: absolute;
		z-index: 3;
		font-size: 2.5vh;
		left: 18vw;
		font-weight: 500;
	}
	.list_finished{
		position: absolute;
		z-index: 3;
		font-size: 2vh;
		left: 55vw;
		color: #6c6f70;
	}
	.list_clocked{
		position: absolute;
		z-index: 3;
		font-size: 2vh;
		left: 75vw;
		color: #6c6f70;
	}

</style>
