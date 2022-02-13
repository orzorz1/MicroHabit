import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		hasLogin:false,
		userInfo:{
			username:"张三",
			avatar:"https://s2.loli.net/2022/02/12/F3KIfEVMzBaGti1.jpg",
			birthday:"2000-1-1",
			sexual:"男",
			score:"LV2 100/200",
			accounts:[{'id_type':'邮箱账号','id':'ZhangSan@gmail.com'},
					  {'id_type':'微博账号','id':'ZhangSan'}],
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
		}
	},
    actions: {

	}
})
export default store