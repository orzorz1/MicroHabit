<template>
	<view>
		<TopBar></TopBar>
		<BottomNavigation></BottomNavigation>
		<view id="habit">
			<view class="main">
				<view v-for="(habit,index) in habits" class="habits" :style="{background:((index%2)===0)?'#ddeff8':'#fcf5c9'}">
					<view class="habitContent">
						<view>
						<view style="width: 60vw;text-align:left;font-size:2.5vh;">{{habit.name}}</view>
						<view style="width: 60vw;text-align:left;font-size:2vh;">{{habit.content}}</view>
						</view>
					</view>
					<view class="tick" @tap="finishHabit(index)">
						<image class="tick" src="../../../static/icon/dui.png" v-if="habit.showTick"></image>
					</view>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
	import BottomNavigation from '../../../components/BottomNavigation.vue';
	import TopBar from '../../../components/TopBar.vue';
	export default {
		data() {
			return {
				habits:[
					{"id":"0000010001","name":"英语","content":"背10个单词","showTick":false},
					{"id":"0000010002","name":"健身","content":"做10个卷腹","showTick":false},
					{"id":"0000010003","name":"阅读","content":"看1000本书","showTick":false},
					{"id":"0000010004","name":"写作","content":"写100000字","showTick":false},
				],
			}
		},
		methods: {
			finishHabit(index){
				let that=this
				this.habits[index].showTick=true
				setTimeout(function(){
					that.habits.splice(index, 1);
				},1000)

			}
		},
		components:{
			BottomNavigation,
			TopBar,
		},
	}
</script>

<style>
	#habit{
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: 0;
		background-image: url('https://s2.loli.net/2022/01/27/2cwG1ty5OTkspBJ.png');
		background-size:100vw 87vh ;
		background-repeat: no-repeat;
	}
	.main{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 72vh;
		background-color: #fdfcf9;
		border-radius: 20px 20px 0px 0px;
		padding-top: 3vh;
		-webkit-overflow-scrolling: touch;
		overflow-x: scroll;
		

	}
	.habits{
		height: 10vh;
		width: 90vw;
		border-radius: 20px;
		margin: 0 auto; 
		margin-bottom: 2vh;
		text-align:center;
		display: flex;
		justify-content: space-between;
		align-items:center ;
	}
	.habitContent{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		margin-left: 6vw;
	}
	.tick{
		margin-right: 6vw;
		height: 5vh;
		width: 5vh;
		border-radius: 2.5vh;
		background-color: #FFFFFF;
	}

</style>