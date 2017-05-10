import * as types from './mutation-types'

export default{
	[types.LOGIN_IN](state,data){
		localStorage.setItem('userData',JSON.stringify(data))
		state.comm.userData = data
		state.comm.isLogin = true
		state.username = data.username
		state.nickname = data.nickname
	},
	[types.LOGIN_OUT](state,cb){
		localStorage.removeItem('userData')
		state.comm.userData = ''
		state.comm.isLogin = false
		state.username = "游客"
		cb();
	},
	[types.CHANGE_INDEX_CONFIG](state,data){
		Object.assign(state.comm.indexConf,data);
	},
	[types.CHANGE_USER_DATA](state,data){
		Object.assign(state.comm.userData,data);
		localStorage.setItem('userData',JSON.stringify(state.comm.userData))
	}
	
}