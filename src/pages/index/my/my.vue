<template>
	<view>
		<BottomNavigation></BottomNavigation>
		<view class="home">
			<view class="user">
				<image class="avatar" :src="userInfo.avatar"></image>
				<view class="username">{{userInfo.username}}</view>
				<view class="score">{{userInfo.score}}</view>
			</view>
			<view class="myCatalogue" v-for="item in items" @tap="goto(item.id)">
				<view class="textBox">
					<image class="icon1" :src="item.icon"></image>
					<view class="item" >{{item.text}}</view>
				</view>
				<image class="icon2" src="../../../static/icon/arrow.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
	import BottomNavigation from '../../../components/BottomNavigation.vue'
	import TopBar from '../../../components/TopBar.vue';
	export default {
		data() {
			return {
				items:[
				{"id":0,"icon":"../../../static/icon/target.png","text":"已培养习惯"},
				{"id":1,"icon":"../../../static/icon/step1.png","text":"习惯排行榜"},
				{"id":2,"icon":"../../../static/icon/books.png","text":"使用说明"},
				{"id":3,"icon":"../../../static/icon/set.png","text":"账号设置"},
				]
				
			}
		},
		computed: {
		    ...mapState(['userInfo']),
		},
		methods: {
			goto(to){
				if(to===0){
					uni.navigateTo({url:'/pages/index/catalogue/finishedHabit/finishedHabit'})
				}
				else if(to===1){
					uni.navigateTo({url:'/pages/index/catalogue/list/list'})
					
				}
				else if(to===2){
					
				}
				else if(to===3){
					uni.navigateTo({url:'/pages/index/catalogue/accountSet/accountSet'})
				}
			}
			
		},
		components:{
			TopBar,
			BottomNavigation
		}
	}
</script>


<style>
	.home{
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100vw;
		height: 100vh;
		background:url('https://s2.loli.net/2022/01/27/qEUWbVug7GiRoYS.png');
		background-size:100vw 100vh;
		background-repeat: no-repeat;
	}
	.user{
		display: flex;
		align-items:center ;
		flex-direction: column;
		margin-top:11vh ;
		width: 90vw;
		height: 20vh;
		background-color: rgba(217, 236, 255, 0.7);
		border-radius: 20px;
		margin-bottom: 1vh;
	}
	.avatar{
		margin-top:2vh ;
		margin-bottom: 2vh;
		width: 10vh;
		height: 10vh;
		border-radius:5vh
	}
	.myCatalogue{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 1vh;
		width: 90vw;
		border-radius: 20px;
		height: 8vh;
		background-color: rgba(217, 236, 255, 0.7);
	}
	.textBox{
		display: flex;
		align-items: center;
	}
	.icon1{
		margin-left:5vw ;
		height: 3vh;
		width: 3vh;
	}
	.item{
		font-size: 2.5vh;
		font-weight: 550;
		margin-bottom:0.2vh;
		margin-left: 3vw;
		
	}
	.icon2{
		margin-right: 5vw;
		height: 3vh;
		width: 3vh;
	}
	
</style>
