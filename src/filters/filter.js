import Vue from 'vue'
export default{
    substr:function (){
        Vue.filter('substr',function(val){
           return val.toString().substring(0,10)
        })
        return  Vue.filter('substr');
    }
}