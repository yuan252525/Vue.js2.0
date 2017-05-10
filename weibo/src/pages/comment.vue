<template>
	<div class="container">
    	<div class="box-card">
		  	<div class="card-header clearfix">
		  		<img class="icon" :src="baseUrl+post.user.avatar">
		  		<div class="msg">
		  			<span>{{post.user.nickname}}</span>
		            <time class="time">{{(post.create_time).substring(0,10)}}</time>
		  		</div>
		  	</div>
		    <div v-html="post.content"></div>
		    <div v-if="post.feature_image" class="img-list" >
		    	<img :src="baseUrl+img" v-for="img in post.feature_image.split(';')">
		    </div>
		    <p class="comment"><i class="fa fa-commenting-o"></i> {{post.comment_count == 0 ? '' : post.comment_count}}</p>
			<div class="comments" v-if="post.comment_count != 0">
			  	<div class="comments-list" v-for="o in post.comments" >
			  		<img :src="baseUrl+o.avatar" class="icon">
			  		<div class="desc">
			  			<p class="active name">{{o.nickname}}</p>
			  			<div v-html="o.comment"></div>
			  		</div>
			  	</div>
			</div>
			<div v-else>暂时还没评论</div>
			<el-button class="commentBtn" type="primary"  @click="openLayer(post.id,post.author)">评论</el-button>
		</div>
		</div>
</template>

<script>
	import api  from '../store/api'
	import router from '../router'
	import axios from 'axios'
	export default {
    data() {
      return {
      	post:'',
      	baseUrl:api.baseUrl,
      	dialogVisible:false,
      	comment:'',
      	isLogin:this.$store.state.comm.isLogin
      };
    },
   created(){
			this.$store.dispatch('change_index_config', {
				title:this.$store.state.nickname,
				addPost:false,
				showLogin:false,
				isBack:true
		     });
		     this.getPostById();

		},
    methods: {
    	getPostById:function(){
    		let self = this;
    		var id = this.$route.params.id
		            axios.get(api.getPostListApi+'/'+id)
					  .then(function (response) {
					  		self.post = response.data;
					  })
					  .catch(function (error) {
					    console.log(error);
					  });
    	},
    	openLayer:function(postId,authorId){
    		if(!this.isLogin){
    			this.$confirm('你还没有登录不能评论', '提示', {
	          confirmButtonText: '确定',
	          showCancelButton:true,
	          type: 'warning'
	        });
    			return ;
    		}
    		this.$prompt('请输入评论', '添加评论', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '请输入评论'
        }).then(({ value }) => {
          this.postComment(postId,authorId,value)
        })

    	},
    	postComment(postId,authorId,comment){
    		var postData = {
    			post_id:postId,
    			author_id:authorId,
    			from_user_id:this.$store.state.comm.userData.id,
    			comment:comment
    		}
    		this.updatePost(postData)
    	},
      updatePost(data){
      let self = this;
      	var qs = require('qs');
        axios.post(api.addCommentApi,qs.stringify(data), {
			  headers: {
			    'Content-Type': 'application/x-www-form-urlencoded',
			  },
			})
		  .then(function (response) {

		  	if(response.data.success){
		  		self.$message({
					          message: '发表成功',
					          type: 'success'
					        });
					        self.getPostById();
		  	}else{
		  		console.log(response.data.msg)
		  	}
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
      },
    }
  }
</script>

<style lang="scss" scoped>
		.box-card{
			padding: 10px 10px 0;
		}
		.bg{
			width: 100%;
    		height: 150px;
		}
		.card-header{
			margin-bottom: 10px;
			.icon{
				width: 60px;
			    height: 60px;
			    border-radius: 50%;
			    float: left;
			}
			
			.msg{
				margin-left: 10px;
    			float: left;
    			span{
    				display:block;
    				margin-bottom:10px;
    			}
    			.time{
					font-size: 13px;
		    		color: #999;
				}
			}
		}
		.img-list{
			margin-top: 10px;
			img{
				width: 80px;
			    height: 80px;
			    margin: 5px;
			}
		}
		.comment{
			    margin: 20px 0 10px;
		}
	.comments-list{
		padding: 10px;
		.icon{
			width: 30px;
		    height: 30px;
		    border-radius: 50%;
		    float: left;
		    margin-right: 10px;
		}
		.name{
			 margin-bottom: 5px;
		}
		.desc{
			width: calc(100% - 40px);
    		margin-left: 40px;
		}
	}
	.comments-list:not(:first-child)
	{
    	border-top: 1px dashed #ddd;
	}
	.commentBtn{
		position: fixed;
	    bottom: 60px;
	    right: 10px;
	}
	
	
</style>