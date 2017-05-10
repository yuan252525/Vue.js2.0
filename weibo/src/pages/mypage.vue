<template>
	<div class="mypage">
		<div v-if="!isLogin"  class="no-login-tips">
			<span>你还没登录,赶快登录吧</span>
		</div>
		<div  v-else>
			<div class="u-info clearfix">
				<el-upload
				  class="avatar-uploader"
				  :action="action"
				  name="avatar"
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload">
				  <img v-if="avatar" :src="avatarUrl" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<div class="u-detail">
					<span class="u-name">{{nickname}} <i class="fa fa-pencil" @click="edit('nickname')"></i></span>
					<span class="u-motto">简介:{{motto}}<i class="fa fa-pencil pull-right" @click="edit('motto')"></i></span>
				</div>
			</div>
			<ul class="u-list">
				<li><router-link to="/mypage/updatePass"><i class="fa fa-cog"></i> 密码修改</router-link></li>
				<li @click="loginOut"><i class="fa fa-power-off"></i> 退出</li>
			</ul>
		</div>
	</div>


</template>

<script>
	import router from '../router'
	import axios from 'axios'
	import Vue from 'vue'
	import api  from '../store/api'
	export default{
		data(){
			return{
				nickname:'',
				motto:'',
				userId:'',
				avatarUrl:'',
				action:api.uploadApi,
				avatar:''

			}
		},
		created(){
			this.isLogin = this.$store.state.comm.isLogin
			if(this.isLogin){
				let userData = this.$store.state.comm.userData
				this.nickname = userData.nickname
				this.motto = (userData.motto == "" ? '暂无':userData.motto)
				this.userId = userData.id;
				if(userData.avatar != null){
					this.avatarUrl = api.baseUrl + userData.avatar
					this.avatar = userData.avatar;
				}
				
			}
			this.$store.dispatch('change_index_config', {
		        title:'主页',
		        isBack: false,
		        showLogin:!this.isLogin,
		        showRegiest:false,
		        addPost:false,
		    });
			
			
			
		},
		methods:{
			 handleAvatarSuccess(res, file) {
			 let self = this;
		let avatar = res.substring(0,res.indexOf('<'));
        this.avatarUrl = api.baseUrl + avatar
        this.avatar = avatar
         var qs = require('qs');
         axios.post(api.userEditApi,qs.stringify({
					    avatar: avatar,
					    id:this.$store.state.comm.userData.id
					  }), {
						  headers: {
						    'Content-Type': 'application/x-www-form-urlencoded',
						  },
						})
					  .then(function (response) {
					  	if(response.data.success){
					  		console.log('编辑成功')
					  		self.$store.dispatch('change_user_data',{
					  			avatar:self.avatar
					  		})
					  		self.motto = self.$store.state.comm.userData.motto
					  	}else{
					  		console.log('编辑失败');
					  	}
					  })
					  .catch(function (error) {
					    console.log(error);
					  });
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    },
		 	loginOut: function(){
		 		 let self = this;
		 		 this.$confirm('确认退出?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.$store.dispatch('login_out',function(){
		          	self.$message({
			            type: 'success',
			            message: '退出成功！',
			            onClose:function(){
			            	window.location.reload();
			            }
			        });

		          })
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消'
		          });          
		        });
			},
			edit:function(name){
			 let self = this;
			 var tips = '',errorTips = '',pettern = '';
			 if(name == "nickname"){
			 	tips = '请输入昵称'
			 	errorTips = '最多输入十五个字符'
			 	pettern = /^\S{0,15}$/
			 }else{
			 	tips = '请输入简介'
			 	errorTips = '最多输入十个字符'
			 	pettern = /^\S{0,10}$/
			 }
				this.$prompt(tips, '编辑', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: pettern,
          inputErrorMessage: errorTips
        }).then(({ value }) => {
          var qs = require('qs');
          var postData = {id:this.$store.state.comm.userData.id}
          if(name == "nickname"){
          	postData.nickname = value
          }else{
          	postData.motto = value
          }
          axios.post(api.userEditApi,qs.stringify(postData), {
						  headers: {
						    'Content-Type': 'application/x-www-form-urlencoded',
						  },
						})
					  .then(function (response) {
					  	console.log(response);
					  	if(response.data.success){
					  		console.log('编辑成功')
					  		var info = {};
					  		if(name == "nickname"){
								info.nickname = value
								self.nickname = value
					  		}else{
					  			info.motto = value
					  			self.motto = value
					  		}
					  		self.$store.dispatch('change_user_data',info)
					  		
					  	}else{
					  		console.log('编辑失败');
					  	}
					  })
					  .catch(function (error) {
					    console.log(error);
					  });
        }).catch(() => {
          console.log('取消成功')       
        });
			}
			
		}
	}
	
</script>

<style lang="scss" scoped>
	body{
		background: #eee;
	}
	.u-info{
		padding: 20px 10px;
		background:#fff;
		.avatar-uploader,img{
			width: 60px;
		    height: 60px;
		    border-radius: 50%;
		    float:left;
		}
		.u-detail{
			margin-left:70px;
			display: flex;
		    flex-direction: column;
		    justify-content: space-around;
		    height: 60px;
		}
		.u-motto i,.u-name i{
			margin-top:4px;
		}
	}
	
	.u-list{
		border-top:1px solid #eee;
		background:#fff;
		margin-top:10px;
		li{
			line-height: 35px;
		    border-bottom: 1px solid #eee;
		    padding: 0 10px;
		    a{
		    	color:#333;
		    }
		}
	}

	.el-message-box{
		width:80%!important;
	}
	.el-message-box__header{
		padding: 10px 20px 0!important;
	}
	.el-message-box__content{
		    padding: 20px!important;
	}
	.el-message-box__btns{
		padding: 0 20px 10px!important;
	}
	.no-login-tips{
		text-align:center;
		margin-top:20px;
	}
</style>