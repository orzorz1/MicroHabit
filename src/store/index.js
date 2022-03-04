import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		url:'https://www.orzorz.top',
		// url:'http://49.232.25.86:1926',
		hasLogin:false,
		userInfo:{
			username:"点击登录",
			avatar:"../../../static/icon/WeiDengLu.svg",
			birthday:"2000-1-1",
			sexual:"男",
			score:"0",
			accounts:[
						// {'id_type':'邮箱账号','id':'ZhangSan@gmail.com'},
						// {'id_type':'微博账号','id':'ZhangSan'},
					],
		},
		currentHabit:{
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
		},
		id(state,obj){
			this.state.currentHabit.id = obj
		}
	},
    actions: {

	}
})
export default store