<template>
	<view>
		<TopBar></TopBar>
		<BottomNavigation></BottomNavigation>
		<view style="margin-top: 40vh;margin-left: 40vw;">暂无内容</view>
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
