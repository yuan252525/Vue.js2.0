<template>
	<el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="旧密码" prop="oldpass" class="label">
    <el-input v-model="ruleForm.oldpass"></el-input>
  </el-form-item>
  <el-form-item label="新密码" prop="newpass" class="label">
    <el-input type="password" v-model="ruleForm.newpass"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="newpass2" class="label">
    <el-input type="password" v-model="ruleForm.newpass2"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
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
			var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.newpass !== '') {
            this.$refs.ruleForm.validateField('newpass2');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newpass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
			return{
				ruleForm:{
					newpass:'',
					oldpass:'',
					newpass2:''
				},
				rules:{
					oldpass:[
						{required:true,message:'请输入密码',trigger: 'blur'}
					],
					newpass:[{
						validator: validatePass,tirgger:'blur'
					}],
					newpass2:[{
						validator: validatePass2,tirgger:'blur'
					}]

				}
			}
		},
		created(){
			this.$store.dispatch('change_index_config', {
				title:'修改密码',
		        isBack: true,
		        showLogin:false,
		        showRegiest:false
		     });
		},
		methods:{
		 submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		        let self = this;
		          if (valid) {
		          	var qs = require('qs');
		            axios.post(api.userUpatePassApi,qs.stringify({
					    id: this.$store.state.comm.userData.id,
					    newpass: this.ruleForm.newpass,
					    oldpass: this.ruleForm.oldpass,
					  }), {
						  headers: {
						    'Content-Type': 'application/x-www-form-urlencoded',
						  },
						})
					  .then(function (response) {
					  	if(response.data.success){
					  		 self.$confirm('修改成功，需要重新登录?', '信息', {
					          confirmButtonText: '确定',
					          showCancelButton:false,
					          type: 'success'
					        }).then(() => {
					          self.$store.dispatch('login_out',function(){
					          		self.$router.push('/mypage/login')
					          	})       
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