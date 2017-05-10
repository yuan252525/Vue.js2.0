<template>
  <div id="footer">
    <router-link to="/home">
      <span>首页</span><br>
      <i class="fa fa-home" aria-hidden="true"></i>
    </router-link>
    <router-link to="/add" v-if="isLogin">
      <i class="fa fa-plus-square"></i>
    </router-link>
    <router-link to="/mypage">
      <span>个人中心</span><br>
      <i class="fa fa-user"></i>
    </router-link>
  </div>

</template>

<script>
export default {
  data () {
    return {
      isLogin:''
    }
  },
  created(){
      this.isLogin=this.$store.state.comm.isLogin
  },
  methods: {
  }
}
</script>

<style lang="scss">
  #footer{
    position: fixed;
    width: 100%;
    bottom: 0;
    padding: 5px 0;
    background: #fff;
    box-shadow: 0 0 2px #000;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    a{
      color:#333;
      font-size: 14px;
      text-align: center;
      i{
        font-size: 20px;
      }
    }
  }
  .fa.fa-plus-square{
     font-size: 30px!important;
     line-height: 42px;
  }
</style>