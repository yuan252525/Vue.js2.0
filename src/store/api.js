
const apiUrl = 'http://127.0.0.1:7575/';

const api = {
	baseUrl:apiUrl + 'uploads/',
	loginApi:apiUrl+'user/login',
	registApi:apiUrl+'user/add',
	uploadApi:apiUrl+'user/upload',
	userEditApi:apiUrl+'user/edit',
	userUpatePassApi:apiUrl+'user/updatePass',
	userPostAddApi:apiUrl+'user/post/add',
	getPostListApi:apiUrl+'user/post/getList',
	updatePostApi:apiUrl+'user/post/edit',
	addCommentApi:apiUrl+'user/comment/add',
}

export default api