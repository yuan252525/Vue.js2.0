import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import Hello from '@/components/Hello'
import Login from '../pages/login'
import Regist from '../pages/regist'
import Mypage from '../pages/mypage'
import UpdatePass from '../pages/updatePass'
import AddPost from '../pages/addpost'
import Home from '../pages/home'
import Comment from '../pages/comment'

Vue.use(Router)

const routes = [
	{
		path:'/home/comment/:id',
		name:'comment',
		component:Comment
	},
	{
		path:'/add',
		name:'addPost',
		component:AddPost
	},
	{
		path:'/home',
		name:'home',
		component:Home
	},
	{
		path:'/mypage/updatePass',
		name:'updatePass',
		component:UpdatePass
	},
	{
		path:'/mypage/login',
		name:'login',
		component:Login
	},
	{
		path:'/mypage/login/regist',
		name:'regist',
		component:Regist
	},
	{
		path:'/mypage',
		name:'mypage',
		component:Mypage
	},
		
]

const router = new Router({
	routes:routes,
	linkActiveClass:'active-link',
	history:true
})

/*router.beforeEach(function(to,from,next){
	var userData = localStorage.getItem('userData');
	if(to.path == '/add'){
		if(!userData){
			next({
				path:'/home'
			})
		}
		next()
	}
})*/

export default router
