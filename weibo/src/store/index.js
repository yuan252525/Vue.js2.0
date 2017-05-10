import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);



const state = {
	object_name:'微博',
	username:'游客',
	nickname:'游客',
	reply:{
		isComment:'',
		postId:'',
		userId:'',
		component:{},
		componentId:''
	},
	comm:{
		isLogin:false,
		loading:false,
		userData:'',
		indexConf:{
			title:'你好，游客',
			isBack:false,
			showLogin:false,
			showRegiest:false,
			addPost:false,
			disabled:true,
		}
	}
}

const store = new Vuex.Store({
	state,
	mutations,
	actions
})

export default store