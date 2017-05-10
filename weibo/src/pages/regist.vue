<template>
	<el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="昵称" prop="nickname" class="label">
    <el-input v-model="ruleForm.nickname"></el-input>
  </el-form-item>
  <el-form-item label="用户名" prop="username" class="label">
    <el-input v-model="ruleForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password" class="label">
    <el-input type="password" v-model="ruleForm.password"></el-input>
  </el-form-item>
  <el-form-item label="手机" prop="mobile" class="label">
    <el-input v-model="ruleForm.mobile"></el-input>
  </el-form-item>
  <el-form-item label="性别" prop="sex" class="label">
    <el-radio-group v-model="ruleForm.sex" >
      <el-radio label="男"></el-radio>
      <el-radio label="女"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
				ruleForm:{
					username:'',
					password:'',
					nickname:'',
					mobile:'',
					sex:''
				},
				rules:{
					username:[
						{required:true,message:'请输入用户名',trigger: 'blur'}
					],
					password:[{
						required:true,message:'请输入密码',tirgger:'blur'
					}],
					nickname:[{
						required:true,message:'请输入昵称',tirgger:'blur'
					}],
					mobile:[{
						required:true,message:'请输入正确的手机号',pattern:/^1(3|4|5|7|8)\d{9}$/,tirgger:'blur'
					}],
					sex:[{
						required:true,message:'请选择性别',tirgger:'change'
					}]

				}
			}
		},
		created(){
			this.$store.dispatch('change_index_config', {
				title:'用户注册',
		        isBack: true,
		        showLogin:false,
		        showRegiest:false
		     });
			this.object_name = this.$store.state.object_name
		},
		methods:{
		 submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		        let self = this;
		          if (valid) {
		          	var qs = require('qs');
		            axios.post(api.registApi,  qs.stringify({
					    username: this.ruleForm.username,
					    password: this.ruleForm.password,
					    nickname:this.ruleForm.nickname,
					    mobile:this.ruleForm.mobile,
					    sex:this.ruleForm.sex == "男" ? 1 : 2,
					  }), {
						  headers: {
						    'Content-Type': 'application/x-www-form-urlencoded',
						  },
						})
					  .then(function (response) {
					  	if(response.data.success){
					  	 self.$alert('注册成功！赶快去登录吧!', {
				          confirmButtonText: '确定',
				          callback: action => {
				            self.$router.go(-1);
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
		          } else {
		            return false;
		          }
		        });
		      },
			
		    }
	}
	
</script>

<style lang="scss" scoped>
	.el-form{
		padding: 20px 30px 0;
		height:calc(100% - 20px);
		background:#fff;
		.label{
			text-align:left;
			font-weight: bold;
		}
	}
</style>