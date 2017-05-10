import * as types from './mutation-types'

export default {
	login({commit},data){
		commit(types.LOGIN_IN,data)
	},
	login_out({commit},cb){
		commit(types.LOGIN_OUT,cb)
	},
	change_index_config({commit},data){
		commit(types.CHANGE_INDEX_CONFIG,data)
	},
	change_user_data({commit},data){
		commit(types.CHANGE_USER_DATA,data)
	},

}