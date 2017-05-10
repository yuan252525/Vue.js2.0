<template>
	<div class="container">
		<img class="bg" src="../../static/images/bg.jpg">
		<el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="最新" name="first">
		    	<el-card class="box-card">
				  <div v-for="o in postList" :key="o" class="text item">
				  	<div class="card-header clearfix">
				  		<img class="icon" :src="baseUrl+o.avatar">
				  		<div class="msg">
				  			<span>{{o.nickname}}</span>
				            <time class="time">{{o.create_time | substr}}</time>
				  		</div>
				  	</div>
				    <p v-html="o.content"></p>
				    <div v-if="o.feature_image" class="img-list" >
				    	<img :src="baseUrl+img" v-for="img in o.feature_image.split(';')">
				    </div>
					<div class="comment-group">
					  	<span class="fa fa-thumbs-o-up" @click="bindCommentHandler(o.id,1,$event)">{{o.like == 0 ? '' : o.like}}</span>
			  			<span  @click="bindCommentHandler(o.id,2,$event)"><i class="fa fa-commenting-o"></i>{{o.comment_count == 0 ? '' : o.comment_count}}</span>
			  			<span class="fa fa-heart"  @click="bindCommentHandler(o.id,3,$event)">{{o.keep == 0 ? '' : o.keep}}</span>
					</div>
				  </div>
				  
				</el-card>
		    </el-tab-pane>
		    <el-tab-pane label="最热" name="second">最热</el-tab-pane>
	  </el-tabs>
  </div>
</template>

<script>
	import api  from '../store/api'
	import router from '../router'
	import axios from 'axios'
	export default {
    data() {
      return {
      	activeName:'first',
      	postList:[],
      	baseUrl:api.baseUrl
      };
    },
   created(){
			this.$store.dispatch('change_index_config', {
				title:this.$store.state.nickname,
				addPost:false,
				showLogin:false,
				isBack:false,
		     });
		     this.getPostList();
		},
        filters:{
            substr:function(value){
                return value.toString().substring(0,10)
            }
        },
        mounted(){
            window.addEventListener('scroll', this.handleScroll);
        },
    methods: {
        handleScroll:function(){
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if(document.getElementsByClassName('el-tabs__header').length != 0){
                var tab = document.getElementsByClassName('el-tabs__header')[0];
                if(scrollTop >=　150){
                    tab.style.position = 'fixed';
                    tab.style.top = 0;
                    tab.style.zIndex = 99;
                    tab.style.width = '100%';

                }else{
                    tab.style.position = 'static';
                }
            }

        },
    	getPostList:function(){
    		let self = this;
		            axios.get(api.getPostListApi)
					  .then(function (response) {
					  		console.log(response);
					  		self.postList = response.data;
					  })
					  .catch(function (error) {
					    console.log(error);
					  });
    	},
      	handleClick(tab, event) {
        console.log(tab, event);
      },
      bindCommentHandler(id,option,obj){
      var className = obj.target.className
      console.log(obj)
      		switch (option){
      			case 1:
      				var postJson = {
      					id:id
      				}
      				if(className == "fa fa-thumbs-o-up"){
      					postJson.like = "+1"
      					obj.target.className = 'fa fa-thumbs-o-up active'
      					obj.target.innerText =  Number(obj.target.innerText) + 1
      				}else{
      					postJson.like = "-1"
      					obj.target.className = 'fa fa-thumbs-o-up'
      					obj.target.innerText = (Number(obj.target.innerText) - 1) == 0 ? '' : (Number(obj.target.innerText) - 1)
      				}
      				this.updatePost(postJson);
      				break;
      			case 2:
      				this.$router.push('/home/comment/'+id);
      				break;
      			case 3:
      				var postJson = {
      					id:id
      				}
      				if(className == "fa fa-heart"){
      					postJson.keep = "+1"
      					obj.target.className = 'fa fa-heart active'
      					obj.target.innerText =  Number(obj.target.innerText) + 1
      				}else{
      					postJson.keep = "-1"
      					obj.target.className = 'fa fa-heart'
      					obj.target.innerText =  (Number(obj.target.innerText) - 1) == 0 ? '' : (Number(obj.target.innerText) - 1)
      				}
      				this.updatePost(postJson);
      				break;

      		}
      },
      updatePost(data){
      let self = this;
      	var qs = require('qs');
        axios.post(api.updatePostApi,qs.stringify(data), {
			  headers: {
			    'Content-Type': 'application/x-www-form-urlencoded',
			  },
			})
		  .then(function (response) {
		  	if(response.data.success){
		  		console.log(response.data.msg)
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
	.container{
		overflow:hidden!important;
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
		width: calc((100vw - 72px) / 3);
		height: calc((100vw - 72px) / 3);
		margin: 5px;
	}
	}
	}
	.comment-group{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		height: 30px;
		align-items: center;
		margin-top: 10px;
	}
	.fa-heart:before,.fa-thumbs-o-up:before,.fa-commenting-o:before{
		margin-right: 5px;
	}

</style>