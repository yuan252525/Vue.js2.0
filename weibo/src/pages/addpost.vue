<template>
	<form id="postForm" >
		<textarea @keydown="editText" name="content" placeholder="请输入内容" v-model="textarea"></textarea>
		<el-upload class="uploadCard"
		  name="avatar"
		  :action="action"
		  list-type="picture-card"
		  :on-remove="handleRemove"
		  :on-success="handleSuccess">
		  <i class="el-icon-plus"></i>
		</el-upload>
	</form>
</template>

<script>
	import api  from '../store/api'
	import router from '../router'
	import axios from 'axios'
	export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        fileArr:[],
        action:api.uploadApi,
        textarea:'',
      };
    },
   created(){
			this.$store.dispatch('change_index_config', {
				title:this.$store.state.nickname,
				addPost:true,
				showLogin:false,
		     });

		},
		mounted:function(){
			let self = this;
			this.eventBus.$on('addPostHandler',function(){
		     	self.addPost();
		    })
		},
    methods: {
      handleRemove(file, fileList) {
        let response = file.response;
        let name = response.substring(0,response.indexOf('<'))
        let index = this.fileArr.indexOf(name)
      	this.fileArr.splice(index,1);
      },
      handleSuccess(response, file, fileList){
      	let name = response.substring(0,response.indexOf('<'))
      	this.fileArr.push(name);
      },
      editText:function(){
      	if(this.textarea != ""){
      		this.$store.dispatch('change_index_config', {
				disabled:false
		     });
      	}else{
      		this.$store.dispatch('change_index_config', {
				disabled:true
		     });
      	}
      },
      addPost:function(){
      this.$store.dispatch('change_index_config',{disabled:true})
      let self = this;
      	var qs = require('qs');
		            axios.post(api.userPostAddApi,  qs.stringify({
		            	author:this.$store.state.comm.userData.id,
					    content: this.textarea,
					    feature_image:this.fileArr.join(';')
					  }), {
						  headers: {
						    'Content-Type': 'application/x-www-form-urlencoded',
						  },
						})
					  .then(function (response) {
					  	if(response.data.success){
					  	 self.$message({
					  	 message:response.data.msg,
					  	 type:'success',
					  	 onClose:function(){
					  	 	self.$router.push('/home')
					  	 	return false;
					  	 }
					  	 });
					  	 
					  	}else{
					  		self.$message.error(response.data.msg);
					  	}
					  })
					  .catch(function (error) {
					    console.log(error);
					    this.$store.dispatch('change_index_config',{disabled:false})
					  });
      }
    }
  }
</script>

<style lang="scss" scoped>
	#postForm{
		width:calc(100% - 20px);
		height:100%;
		padding:10px;
		textarea{
			width:100%;
			height:150px;
			border:0;
			margin-bottom:10px;
			font-size: 14px;
    		color: #333;
		}
		
	}
	
</style>