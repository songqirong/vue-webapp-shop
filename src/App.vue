<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <home></home> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import home from './components/views/home'
import{Lazyload} from 'vant';
import Vue from 'vue';
Vue.filter('rmb',function(value){
  if(value){
    return '￥' + Number(value).toFixed(2)
  }else{
    return
  }
})
Vue.use(Lazyload);
export default {
  name: 'App',
  components: {
    // HelloWorld
    // home
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
html,body{
    height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height:100%
}
.card-row{
  padding: 0!important;
}

.van-checkbox__icon--round{
    margin:0 auto!important;
}
/* img{
  border: 0!important;
} */
/* .van-image{
    margin:0 auto!important;
} */

</style>
