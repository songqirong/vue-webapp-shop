<template>
    <van-tabbar v-model="active" route>
        <van-tabbar-item icon="home-o" to='/home'>首页</van-tabbar-item>
        <van-tabbar-item icon="search" to='/find'>分类</van-tabbar-item>
        <van-tabbar-item icon="friends-o" to='/shoplist'>购物车</van-tabbar-item>
        <van-tabbar-item icon="setting-o" to='/user' v-show="show">个人中心</van-tabbar-item>
        <van-tabbar-item icon="setting-o" to='/user' v-show="!show">未登录</van-tabbar-item>
    </van-tabbar>
</template>
<script>
import {Tabbar,TabbarItem} from 'vant';
// console.log(Tabbar)
export default {
    data:function(){
        return{
            active:0,
            show:false
        }
    },
    mounted(){
        let token = localStorage.getItem('token');
        if(token){
            this.show=true
        }else{
            this.show=false
        }
    },
    components:{
        [Tabbar.name]:Tabbar,
        [TabbarItem.name]:TabbarItem
    }
}
</script>
<style scoped>

</style>