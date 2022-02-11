<template>
	<view>
		<TopBar></TopBar>
		<BottomNavigation></BottomNavigation>
		<habbit></habbit>
	</view>
</template>

<script>
	import BottomNavigation from '../../../components/BottomNavigation.vue'
	import TopBar from '../../../components/TopBar.vue';
	import habbit from '../habit/habit.vue'
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
			habbit
		}
	}
</script>

<style>


</style>
