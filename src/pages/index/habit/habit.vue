<template>
	<view>
		<TopBar></TopBar>
		<BottomNavigation></BottomNavigation>
		<view id="habit">
			<view class="main">
				<view v-for="(habit,index) in habits" class="habits" :style="{background:(habit.showTick===true)?'#b8b6b4':((index%2)===0)?'#ddeff8':'#fcf5c9'}">
					<view class="habitContent"  @tap="toHabitInfo(index)">
						<view>
						<view style="width: 65vw;text-align:left;font-size:2.5vh;">{{habit.name}}</view>
						<view style="width: 65vw;text-align:left;font-size:2vh;">{{habit.content}}</view>
						</view>
					</view>
					<view class="tick" @tap="finishHabit(index)">
						<image class="tick" src="../../../static/icon/dui.png" v-if="habit.showTick"></image>
					</view>
				</view>
				<view v-if="habits.length===0" style="width: 100vw;text-align: center;">暂无习惯</view>
			</view>
		</view>	
	</view>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
	import BottomNavigation from '../../../components/BottomNavigation.vue';
	import TopBar from '../../../components/TopBar.vue';
	export default {
		data() {
			return {
				habits:[
				],
				disabled:false
			}
		},
		onLoad(){
			let that = this
			wx.request({
				url: 'http://49.232.25.86:1926/habits/select/training?user_name='+this.userInfo.username,
				header: {
					'Content-Type': 'application/json'
				},				
				success: function(res) {
					if(res.data.code===0){
						let habits = []
						console.log(res)
						for(let i=0;i<res.data.habits.length;i++){
							let habit = {}
							habit.id = res.data.habits[i].id
							habit.name = res.data.habits[i].name
							habit.content = res.data.habits[i].content
							habit.showTick = false
							habits.push(habit)
						}
						that.habits = habits
					}
				}
			})
		},
		computed: {
		    ...mapState(['userInfo']),
		},
		methods: {
			finishHabit(index){
				//完成习惯不显示
				// if(this.disabled!=true){
				// 	let that=this
				// 	this.habits[index].showTick=true
				// 	this.disabled=true
				// 	setTimeout(function(){
				// 		that.habits.splice(index, 1);
				// 		that.disabled=false
				// 	},1000)	
				// }
				if(this.habits[index].showTick!=true && this.disabled!=true){
					let that=this
					wx.request({
						url: 'http://49.232.25.86:1926/habits/check?habit_id='+this.habits[index].id,
						header: {
							'Content-Type': 'application/json'
						},				
						success: function(res) {
							console.log(res)
							if(res.data.code===0){
								//完成放最后
								this.habits[index].showTick=true
								// let that=this
								this.disabled=true
								setTimeout(function(){
									let temp = that.habits[index]
									that.habits.splice(index, 1);
									that.habits.push(temp)
									that.disabled=false
								},500)
							}else if(res.data.code===1){
								uni.showToast({
									title: '打卡失败',
									icon:'none',
									duration: 2000
								});
							}
							else if(res.data.code===2){
								uni.showToast({
									title: '不在可打卡的时间',
									icon:'none',
									duration: 2000
								});
							}
						}
					})
				}
			},
			toHabitInfo(index){
				uni.navigateTo({url:'/pages/index/habitInfo/habitInfo'})
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
		height: 61vh;
		background-color: #fdfcf9;
		border-radius: 20px 20px 0px 0px;
		padding-top: 3vh;
		padding-bottom:11vh;
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