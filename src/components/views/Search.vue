<template>
    <div class="search">
        <!-- 头部搜索 -->
        <div class="header">
            <div class="header-icon" @click="back"><van-icon name="arrow-left" size="13"/><span>返回</span> </div>
            <van-search
                v-model.trim="value"
                :placeholder="text"
                shape="round"
                autofocus
                @search="onSearch"
                background="#fff"
                @input="onInput"
                >
            </van-search>
            <div class="header-btn" @click="onSearch">搜索</div>
        </div>
        <!-- 热门搜索 -->
        <div class="hotSearch" v-show="hehe">
            <div class="title">
                <span>热门搜索</span><b v-text='msg' @click="change"></b>
            </div>
            <ul class="content" v-show="show">
                <li v-for="(item,index) in searchList" :key="item.id" :class="{on:index<3}" v-text='item' @click="toSearch(item)"></li>    
            </ul>
            <div class="content2" v-show="!show">
                已隐藏搜索发现
            </div>
        </div>
        <ul class="list" v-show="!hehe">
            <li v-for="item in list" :key="item.id" v-html="item[0]"></li>
        </ul>
    </div>
</template>
<script>
var myTimer=null;
import {mapGetters,mapState} from 'vuex'
import { 
    Toast,
    NavBar,
    Icon,
    Search
}from 'vant';
export default {
    name:'search',
    data:function(){
        return {
            value:'',
            msg:'隐藏',
            show:true,
            hehe:true,
            list:[]
        }
    },
    computed:{
        ...mapState('good',['searchList']),
        ...mapGetters('good',['text'])
        
    },
    mounted(){
        window.fn=(res)=>{
            // console.log(res.result)
            this.list=res.result
            if(this.list.length>0){
                this.hehe=false
            }else{
                this.hehe=true
            }
            // console.log(this.list)
        }
    },
    components:{
        [Toast.name]:Toast,
        [NavBar.name]:NavBar,
        [Icon.name]:Icon,
        [Search.name]: Search,
    },
    methods:{
        back(){
            this.$router.back()
        },
        onSearch(){
            // console.log()
        },
        toSearch(val){
            this.value =val
            this.onInput()
        },
        oninput(){

        },
        onInput(){    
            //1、清除上一次启动的定时器
            if(myTimer!=null){
                window.clearTimeout(myTimer);
                myTimer = null;
            }
            // 2、再次启动定时器
            myTimer = setTimeout(()=>{
                // jsonp发送请求
                let scriptDom = document.createElement("script");
                // 以下地址中的 键 q 就是传递给淘宝的关键字
                scriptDom.src = 'https://suggest.taobao.com/sug?code=utf-8&q=' + this.value + '&_ksTS=1515120676355_323&callback=fn&area=c2c&bucketid=15';
                document.body.appendChild(scriptDom);
                scriptDom.remove();
        
            },300);
        },

        change(){
            if(this.show){
                this.msg="显示";
            }else{
                this.msg="隐藏"
            }
            
            this.show=!this.show
        }
    }
}
</script>
<style lang="scss" scoped>
.search{
    background-color: #e4e3e3;
    height: 17.78rem;
    .header{
       background-color: #fff;
        overflow: hidden;
        .van-search{
            width: 7rem;
        }
        .header-icon{
            padding-top: 0.38rem;
            color: #999;
            font-size: 0.4rem;
        }
        .header-btn{
            padding: 0.133333rem 0.1rem;
            font-size: 0.4rem;
            background-color: red;
            border-radius: 0.133333rem;
            color: #fff;
            margin-top: 0.3rem;
        }
        &>div{
            float: left;
        }
    }
    .hotSearch{
        background-color: #fff;
        box-sizing: border-box;
        padding: 0.133333rem 0.4rem;
        font-size: 0.4rem;
        .title{
            overflow: hidden;
            &>span{
                display: block;
                float: left;
            }
            &>b{
                // text-decoration: none;
                color: #999;
                font-weight: normal;
                display: block;
                float: right;
            }
        }
        .content{
            margin-top: 0.4rem;
            overflow: hidden;
            li{
                float: left;
                color: #666;
                padding: 0.1rem 0.25rem;
                font-size: 0.3rem;
                background-color: #e4e3e9;
                border-radius: 1.2rem;
                margin: 0.2rem 0.2rem 0.2rem 0;
            }
            .on{
                color: red;
            }
        }
        .content2{
            height: 3.42rem;
            line-height: 3.42rem;
            text-align: center;
            color: #666;
        }
    }
    .list{
        background-color: #fff;
        li{
            font-size: 0.6rem;
            padding: 0.266667rem 0.4rem;
            border-bottom: 1px solid #f8f8f8;
        }
    }
}
   
</style>