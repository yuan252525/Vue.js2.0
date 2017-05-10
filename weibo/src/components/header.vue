<template>
<div id="header">
	<i v-if="indexConf.isBack" class="fa fa-angle-left pull-left" @click="goBack"></i>
	<span @click="cancel" v-if="indexConf.addPost" class="pull-left">取消</span>
	<span>{{indexConf.title}}</span>
	<router-link v-if="indexConf.showLogin" to="/mypage/login" >
		<span class="pull-right primaryColor">登录</span>
	</router-link>
	<router-link to='/mypage/login/regist' v-if="indexConf.showRegiest">
		<span class="pull-right primaryColor">注册</span>
	</router-link>
	<el-button @click.stop="addHandler" :disabled="indexConf.disabled" class="pull-right" type="primary" v-if="indexConf.addPost" size="small">发送</el-button>
</div>
</template>

<script>
	export default{
		data(){
			return{
				 username:'',
				 disabled:true
			}
		},
		created(){
			this.indexConf = this.$store.state.comm.indexConf
			let indexConf =  this.$store.state.comm.indexConf
			this.showLogin = indexConf.isLogin
			this.isBack=indexConf.isBack
			this.showRegiest = indexConf.showRegiest
			this.title = indexConf.title

		},
		methods: {
		    goBack:function(){
		    	this.$router.go(-1);
		    },
		    addHandler:function(){
		    	this.eventBus.$emit('addPostHandler');
		    },
		    cancel:function(){
		    	this.$router.push('/home')
		    }
		 }
	}
</script>

<style lang="scss" scoped>
	#header{
		padding: 10px;
	    box-shadow: 0 0 2px #000;
	    background: #fff;
        text-align:center;
        position: fixed;
	    width: calc(100% - 20px);
	    top: 0;
	    z-index: 99;
        .fa.fa-angle-left{
        	font-size: 26px;
    		margin-top: -3px;
        }
        el-button{
        	margin-top: -4px;
        }
	}
	.el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
    color: #fff;
    cursor: not-allowed;
    background-color: #eef1f6!important;
    border-color: #eef1f6!important;
	}
</style>