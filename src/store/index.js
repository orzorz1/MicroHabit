import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		hasLogin:false,
		userInfo:{
			username:"点击登录",
			avatar:"../../../static/icon/未登录.svg",
			birthday:"2000-1-1",
			sexual:"男",
			score:"0",
			accounts:[
						// {'id_type':'邮箱账号','id':'ZhangSan@gmail.com'},
						// {'id_type':'微博账号','id':'ZhangSan'},
					],
		},
		currentHabit:{
			name:"英语微习惯",
			steps:[
				{"begin":1,"end":50,"content":"背3个单词"},
				{"begin":51,"end":70,"content":"背5个单词"},
				{"begin":71,"end":100,"content":"背7个单词"},
			],
			beginDate:"2022/01/01",
			finishDate:"2022/01/31",
			days:64,
		},
		editingHabit:false,
	},
    mutations: {
		editing(){
			this.state.editingHabit = !this.state.editingHabit
		},
		edit(state,obj){
			this.state.currentHabit = obj
		},
		username(state,obj){
			this.state.userInfo.username = obj
		},
		score(state,obj){
			this.state.userInfo.score = obj
		},
		login(){
			this.state.hasLogin = !this.state.hasLogin
		},
		avatar(state,obj){
			this.state.userInfo.avatar = obj
		},
		userInfo(state,obj){
			this.state.userInfo = obj
		},
		sexual(state,obj){
			this.state.userInfo.sexual = obj
		},
		birthday(state,obj){
			this.state.userInfo.birthday = obj
		}
	},
    actions: {

	}
})
export default store