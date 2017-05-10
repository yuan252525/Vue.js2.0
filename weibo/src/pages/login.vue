<template>
	<el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
	<h4>{{object_name}}登录</h4>
  <el-form-item label="用户名" prop="username" class="label">
    <el-input v-model="ruleForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password" class="label">
    <el-input type="password" v-model="ruleForm.password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
  </el-form-item>
</el-form>

</template>

<script>
	import router from '../router'
	import axios from 'axios'
	import Vue from 'vue'
	import api  from '../store/api'
	export default{
		data(){
			return{
				object_name:'',
				ruleForm:{
					username:'',
					password:''
				},
				rules:{
					username:[
						{required:true,message:'请输入用户名',trigger: 'blur'}
					],
					password:[{
						required:true,message:'请输入密码',tirgger:'blur'
					}]

				}
			}
		},
		created(){
			this.$store.dispatch('change_index_config', {
				title:'用户登录',
		        isBack: true,
		        showLogin:false,
		        showRegiest:true
		     });
			this.object_name = this.$store.state.object_name
		},
		methods:{
		 submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		        let self = this;
		          if (valid) {
		          	var qs = require('qs');
		            axios.post(api.loginApi,qs.stringify({
					    username: this.ruleForm.username,
					    password: this.ruleForm.password
					  }), {
						  headers: {
						    'Content-Type': 'application/x-www-form-urlencoded',
						  },
						})
					  .then(function (response) {
					  	if(response.data.success){
					  		self.$message({
					          message: '登录成功',
					          type: 'success',
					          onClose:function(){
					          	self.$router.push('/mypage')
					          	self.$store.dispatch('login',response.data.userData)
					          }
					        });
					  		
					  	}else{
					  		self.$message.error(response.data.msg);
		                    return false;
					  	}
					  })
					  .catch(function (error) {
					    console.log(error);
					  });
		          }
		        });
		      },
			
		    }
	}
	
</script>

<style lang="scss" scoped>
	.el-form{
		height: calc(100% - 120px);
		padding: 60px 30px;
		background:#fff;
		.label{
			text-align:left;
			font-weight: bold;
		}
		h4{
			margin-bottom: 20px;
		}
	}
</style>