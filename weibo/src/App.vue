<template>
  <div id="app">
    <com-header></com-header>
      <div id="content">
        <transition :name="transitionName">
        <router-view></router-view>
        </transition>
      </div>
    <com-footer></com-footer>
  </div>
</template>

<script>
import Header from './components/header'
import Footer from './components/footer'

export default {
  data:function(){
    return {
        transitionName: 'slide-left',
        toLeft:'slideInLeft'
    }
  },
  created(){
    this.$router.push('/home')
    if(localStorage.getItem('userData') != null){
    this.$store.dispatch('login',JSON.parse(localStorage.getItem('userData')))
    }
  },
  watch:{
    '$route'(to,from){
      const toPath = to.path.split('/').length
      const fromPath = from.path.split('/').length
      this.transitionName = toPath < fromPath ? 'slide-right' : 'silde-left'
    }
  },
  components:{
    comHeader:Header,
    comFooter:Footer
  }
}
</script>

<style lang="scss">
@import '../static/css/base/base.scss';
</style>
