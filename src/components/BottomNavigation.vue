<template>
	<view>
		<view class="bottomNavigation">
			<view class="icon" @click="goHome" :style="{'pointer-events':ban_home}">
				<image class="icon_home" :src="icon_home"></image>
				<view :style="{'color':fontColor_home}" class="font">主页</view>
			</view>
			<view class="icon" @tap="goHabit" :style="{'pointer-events':ban_habit}">
				<image class="icon_habit" :src="icon_habit"></image>
				<view :style="{'color':fontColor_habit}" class="font">习惯</view>
			</view>
			<view class="icon" @tap="goMy" :style="{'pointer-events':ban_my}">
				<image class="icon_my" :src="icon_my"></image>
				<view :style="{'color':fontColor_my}"  class="font">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"BottomNavigation",
		data() {
			return {
				icon_home:"../static/icon/ylab-home1.png",
				icon_habit:"../static/icon/ylab-habit2.png",
				icon_my:"../static/icon/ylab-my1.png",
				fontColor_home:"#FFFFFF",
				fontColor_habit:"#fff6ab",
				fontColor_my:"#FFFFFF",
				ban_home:"",
				ban_habit:"",
				ban_my:"",
			}
		},
		created() {
			this.changecolor()
		},
		methods: {
			changecolor(){
				var list=getCurrentPages()
				var route=list[list.length - 1].route
				if(route==="pages/index/home/home"){
					this.fontColor_home="#fff6ab"
					this.fontColor_habit="#FFFFFF"
					this.fontColor_my="#FFFFFF"
					this.icon_home="../static/icon/ylab-home2.png"
					this.icon_habit="../static/icon/ylab-habit1.png"
					this.icon_my="../static/icon/ylab-my1.png"
					this.ban_home="none"
					this.ban_habit=""
					this.ban_my=""
				};
				if(route==="pages/index/habit/habit"){
					this.fontColor_home="#FFFFFF"
					this.fontColor_habit="#fff6ab"
					this.fontColor_my="#FFFFFF"
					this.icon_home="../static/icon/ylab-home1.png"
					this.icon_habit="../static/icon/ylab-habit2.png"
					this.icon_my="../static/icon/ylab-my1.png"
					this.ban_home=""
					this.ban_habit="none"
					this.ban_my=""
				};
				if(route==="pages/index/my/my"){
					this.fontColor_home="#FFFFFF"
					this.fontColor_habit="#FFFFFF"
					this.fontColor_my="#fff6ab"
					this.icon_home="../static/icon/ylab-home1.png"
					this.icon_habit="../static/icon/ylab-habit1.png"
					this.icon_my="../static/icon/ylab-my2.png"
					this.ban_home=""
					this.ban_habit=""
					this.ban_my="none"
				};
			},
			goHome(){
				uni.redirectTo({
					url: '/pages/index/home/home',
				});
			},
			goHabit(){
				uni.redirectTo({
					url: '/pages/index/habit/habit',
				});
			},
			goMy(){
				uni.redirectTo({
					url: '/pages/index/my/my',
				});
			},
			
		}
	}
</script>

<style>
	.bottomNavigation{
		position: fixed;
		z-index: 10;
		display: flex;
		justify-content: space-around;
		align-items: center;
		bottom: 0px;
		height: calc(8vh+env(safe-area-inset-bottom));
		width: 100%;
		background-color: #416f92;
		/* border-radius: 20px 20px 0px 0px; */
	}
	.icon{
		width: 25%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.icon_habit{
		margin-top: 1vh;
		margin-left: 2px;
		width: 3.5vh;
		height: 3.5vh;
	}
	.icon_home{
		width: 3.5vh;
		height: 3.5vh;
		margin-top: 1vh;		
	}
	.icon_my{
		width: 3.5vh;
		height: 3.5vh;
		margin-top: 1vh;
	}
	.font{
		font-size: 2vh;
		font-weight: 600;
		padding-bottom: env(safe-area-inset-bottom);
	}

</style>
