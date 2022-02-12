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
	},
    mutations: {},
    actions: {}
})
export default store