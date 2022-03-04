<template>
	<view>
		<!-- <TopBar></TopBar> -->
		<BottomNavigation></BottomNavigation>
		<image src="https://images-cn.ssl-images-amazon.com/images/G/28/BOOK-Catalog/content/ACERW_B01LWXU304_0001_20160930.jpg" style="width: 100vw; height:400vw ;margin-top: 5vh;"></image>
		<view style="margin-bottom:15vh;margin-left: 25vw;">bug反馈：248823307(qq)</view>
	</view>
</template>

<script>
	import BottomNavigation from '../../../components/BottomNavigation.vue'
	import TopBar from '../../../components/TopBar.vue';
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		components:{
			TopBar,
			BottomNavigation,
		}
	}
</script>

<style>


</style>
